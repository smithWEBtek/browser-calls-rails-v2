class TokenController < ApplicationController
  skip_before_action :verify_authenticity_token

  def generate
    token = ::TwilioCapability.generate(role)
    puts '****************** TOKEN *********************************'
    puts token
    puts '**********************************************************'
    render json: { token: token }
  end

  def role
    params[:page] == dashboard_path ? 'support_agent' : 'customer'
  end
end
