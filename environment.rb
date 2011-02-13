require 'rubygems'
require 'active_record'
require 'active_support'
require 'compass'
require 'haml'
require 'ostruct'
require 'sass/plugin/rack'
require 'ruby-debug'
require 'sinatra' unless defined?(Sinatra)

dbconfig = YAML.load(File.read('config/database.yml'))
ActiveRecord::Base.establish_connection dbconfig[ENV['RACK_ENV'] || 'development']
ActiveRecord::Base.include_root_in_json = false

configure do
  SiteConfig = OpenStruct.new(
                 :title => 'Todo app JavascriptMVC demo',
                 :author => '',
                 :url_base => 'http://localhost:4567/'
               )

  # load models
  $LOAD_PATH.unshift("#{File.dirname(__FILE__)}/lib")
  Dir.glob("#{File.dirname(__FILE__)}/lib/*.rb") { |lib| require File.basename(lib, '.*') }

  mime_type :get, 'application/json'
  mime_type :ejs, 'text/html'
end

configure :development do
  Sass::Plugin.add_template_location('public/css/sass', 'public/css')
  Sass::Plugin.options[:load_paths] = ['public/css/sass']
  use Sass::Plugin::Rack
end
