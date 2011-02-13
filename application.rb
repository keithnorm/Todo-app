require 'rubygems'
require 'sinatra'
require_relative 'environment'


configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

error do
  e = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

helpers do
  # add your helpers here
end

get '/' do
  haml :index
end

get '/todos' do
  @todos = Todo.all
  haml 'todos/index'.to_sym
end

get '/todos.json' do
  @todos = Todo.all
  content_type :json
  @todos.to_json
end

post '/todos' do
  content_type :json
  @todo = Todo.new(params)
  @todo.save
  @todo.to_json
end

put '/todos/:id' do
  content_type :json
  @todo = Todo.find(params[:id])
  @todo.update_attributes(params)
  @todo.to_json
end

delete '/todos/:id' do
  content_type :json
  @todo = Todo.find(params[:id])
  @todo.destroy.to_json
end

