/**
 * Twilio Client configuration for the browser-calls-rails
 * example application.
 */

// Store some selectors for elements we'll reuse
var callStatus = $("#call-status");
var answerButton = $(".answer-button");
var callSupportButton = $(".call-support-button");
var hangUpButton = $(".hangup-button");
var callCustomerButton = $(".call-customer-button");

/* Helper function to update the call status bar */
function updateCallStatus(status) {
  callStatus.text(status);
}

/* Get a Twilio Client token with an AJAX request */
$(document).ready(function () {
  $.post("/token/generate", { page: window.location.pathname }, function (data) {
    console.log("TOKEN: ", data.token)
    // Set up the Twilio Client Device with the token
    // userGesture(data.token);
    Twilio.Device.setup(data.token), {
      // disableAudioContextSounds: true
    };
  });
});

// function userGesture(token) {
//   document.querySelector('button').addEventListener('click', function () {
//     debugger;
//     var audioContext1 = new AudioContext()
//     audioContext1.resume()
//       .then(() => {
//         console.log('audioContext1: ', audioContext1);
//         console.log('Playback resumed successfully');
//       });
//   });

//   Twilio.Device.setup(token)
// };

/* Callback to let us know Twilio Client is ready */
Twilio.Device.ready(function (device) {
  console.log("Twilio.Device.ready =====>")
  updateCallStatus("Ready");
});

/* Report any errors to the call status display */
Twilio.Device.error(function (error) {
  console.log("Twilio.Device.error =====>")
  updateCallStatus("ERROR: " + error.message);
});

/* Callback for when Twilio Client initiates a new connection */
Twilio.Device.connect(function (connection) {
  console.log("Twilio.Device.connect =====> connection: ", connection)
  // Enable the hang up button and disable the call buttons
  hangUpButton.prop("disabled", false);
  callCustomerButton.prop("disabled", true);
  callSupportButton.prop("disabled", true);
  answerButton.prop("disabled", true);

  // If phoneNumber is part of the connection, this is a call from a
  // support agent to a customer's phone
  if ("phoneNumber" in connection.message) {
    updateCallStatus("In call with " + connection.message.phoneNumber);
  } else {
    // This is a call from a website user to a support agent
    updateCallStatus("In call with support");
  }
});

/* Callback for when a call ends */
Twilio.Device.disconnect(function (connection) {
  console.log("Twilio.Device.disconnect =====>")
  // Disable the hangup button and enable the call buttons
  hangUpButton.prop("disabled", true);
  callCustomerButton.prop("disabled", false);
  callSupportButton.prop("disabled", false);

  updateCallStatus("Ready");
});

/* Callback for when Twilio Client receives a new incoming call */
Twilio.Device.incoming(function (connection) {
  console.log("Twilio.Device.incoming =====>")
  updateCallStatus("Incoming support call");

  // Set a callback to be executed when the connection is accepted
  connection.accept(function () {
    updateCallStatus("In call with customer");
  });

  // Set a callback on the answer button and enable it
  answerButton.click(function () {
    connection.accept();
  });
  answerButton.prop("disabled", false);
});

/* Call a customer from a support ticket */
function callCustomer(phoneNumber) {
  updateCallStatus("Calling " + phoneNumber + "...");

  var params = {
    "phoneNumber": phoneNumber,
    "record": "record-from-answer"
  };
  console.log('callCustomerParams: ', params)
  Twilio.Device.connect(params);
}

/* Call the support_agent from the home page */
function callSupport() {
  updateCallStatus("Calling support...");

  // Our backend will assume that no params means a call to support_agent
  Twilio.Device.connect();
}

/* End a call */
function hangUp() {
  Twilio.Device.disconnectAll();
}
