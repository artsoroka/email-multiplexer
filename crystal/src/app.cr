require "kemal"
require "./multiplexer"

get "/" do
  "Hello World!"
end

before_all "/multiplex/:email" do |env|
  headers env, {
    "Content-Type" => "application/json",
  }
end

get "/multiplex/:email" do |env| 
  email = env.params.url["email"].as(String)

  if email.size > 15 
  	return_with env, 400, {error: "email string is too big"}.to_json 
  end

  Multiplexer.new(email).combinations

end

error 404 do |env|
  env.response.content_type = "application/json"
  {code: 404, message: "Not Found"}.to_json
end

Kemal.run