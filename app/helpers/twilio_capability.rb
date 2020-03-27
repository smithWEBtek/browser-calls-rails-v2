class TwilioCapability
  def self.generate(role)

    # account_sid     = ENV['TWILIO_ACCOUNT_SID']
    account_sid = Rails.application.secrets.twilio[:account_sid]
    
    # auth_token      = ENV['TWILIO_AUTH_TOKEN']
    auth_token = Rails.application.secrets.twilio[:auth_token]

    # application_sid = ENV['TWIML_APPLICATION_SID']
    # application_sid = Rails.application.secrets.twilio[:sid]
    application_sid = Rails.application.secrets.twilio[:twiml_app_sid]
  
    capability = Twilio::JWT::ClientCapability.new(account_sid, auth_token)
    outgoing_scope = Twilio::JWT::ClientCapability::OutgoingClientScope.new(application_sid, role)
    capability.add_scope outgoing_scope

    incoming_scope = Twilio::JWT::ClientCapability::IncomingClientScope.new(role)
    capability.add_scope incoming_scope

    capability.to_s
  end
end
