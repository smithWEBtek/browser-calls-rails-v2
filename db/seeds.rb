require 'csv'

def import_users
  csv_text = File.read(Rails.root.join('lib', 'import', 'users.csv'))
  csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
  csv.each do |row|
    t = Ticket.new
    t.name = row[0]
    t.phone_number = "+1" + row[1]
    t.description = row[2]
    t.save
    puts "#{t.id}: #{t.name} user created ..."
  end
end

import_users
