class CallController < ApplicationController
  skip_before_action :verify_authenticity_token

  def connect
    render xml: twilio_reponse
  end

  private

  def twilio_reponse
    twilio_number = ENV['TWILIO_PHONE_NUMBER']
    res = Twilio::TwiML::VoiceResponse.new do |response|
      dial = Twilio::TwiML::Dial.new(caller_id: twilio_number)
      caller_id = Rails.application.secrets.twilio[:twilio_number]
binding.pry

      if params.include?(:phoneNumber)
        dial.number(params[:phoneNumber], caller_id: caller_id)
      else
        dial.client(identity: 'support_agent')
      end
      response.append(dial)
    end
    return res.to_s
  end
end
