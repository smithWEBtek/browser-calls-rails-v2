class CallController < ApplicationController
  skip_before_action :verify_authenticity_token

  def connect
    render xml: twilio_response
  end

  private

  def twilio_response
    # twilio_number = Rails.application.secrets.twilio[:phone_number]
    # twilio_number = ENV[TWILIO_PHONE_NUMBER]
    twilio_number = "+16173973501"

    res = Twilio::TwiML::VoiceResponse.new do |response|
      dial = Twilio::TwiML::Dial.new(
        caller_id: twilio_number, 
        record: 'record-from-answer'
      )

      if params.include?(:phoneNumber)
        dial.number(params[:phoneNumber])
      else
        dial.client(identity: 'support_agent')
      end
      response.append(dial)
    end
    puts '--------------------------------------------------'
    puts "The TWILIO response: " + res.to_s
    puts '--------------------------------------------------'
    return res.to_s
  end
end
