// Load env variables from file
require('dotenv').load();

// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  request = require('request'),
  twitter = require('twitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamHandler = require('./utils/streamHandler');

// Create an express instance and set a port variable
var app = express();
var port = 8080;

// Setup livereload
app.use(require('connect-livereload')({ port: 35729 }));
request('http://localhost:35729/changed?files=js/bundle.js');

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.disable('etag');

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Start our server
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Create a new twitter instance
var twit = new twitter(config.twitter);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter', { track: 'javascript'}, function(stream) {
  streamHandler(stream, io);
});
