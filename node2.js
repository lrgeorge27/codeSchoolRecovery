//Node.js 2.1 
//Many objects in Node emit events. 
//net.Server inherits from EventEmitter returns request event.
//fs.readStream inherits from EventEmitter and returns a data event.
//Event Emitter constructor:
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();
logger.on('error', function(message) { //listen for error event, on error event
    console.log('ERR:' + message); //run this call back.
});
logger.emit('error', 'Spilled Milk'); //message events emitted
logger.emit('error', 'Eggs Cracked');

http.createServer(function(request, response) { ... });
//http.createServer([requestListener]) --> returns a new web server object. The requestListener is a function which is automatically added to the 'request' event.
Class: http.server
//This is an EventEmitter with the following events:
Event: 'request'

function(request, response) {} //Emitted each time there is a request, passes two parameters to the callback function.

http.createServer(function(request, response) { ... });
//previous line is the same as the next two lines; two different ways to emit and event.
var server = http.createServer();
server.on('request', function(request, response) { ... });
//This is how we add even listeners
Event: 'close'

function //emitted when the server closes
server.on('close', function() { ... });

// 2.2 Chat Emitter 240 PTS
// We're going to create a custom chat EventEmitter.
// Create a new EventEmitter object and assign it to a variable called 'chat'.
var events = require('events');
var EventEmitter = events.EventEmitter;
var chat = new EventEmitter();
//Next, let's listen for the 'message' event on our new chat object. Remember to add a callback that accepts the message parameter.
var events = require('events');
var EventEmitter = events.EventEmitter;
var chat = new EventEmitter();
chat.on('message', function(message) {
    console.log(message);
});

// 2.3 Emitting Events 240 PTS
// Read the existing code below and modify it to emit events.
// On the chat object, emit the 'join' event and pass in a custom message as a string.
var events = require('events');
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();
var users = [],
    chatlog = [];

chat.on('message', function(message) {
    chatlog.push(message);
});

chat.on('join', function(nickname) {
    users.push(nickname);
});

// Emit events here
chat.emit('join', "Welcome to the chat.");

//Now emit the 'message' event on the chat object. Just like before, remember to pass in a custom message as a string.
// Emit events here
chat.emit('join', "Welcome to the chat.");
chat.emit('message', function(message) {
    console.log('message' + message);
});
chat.emit('message', "Hello");

// 2.4 Request Event 240 PTS
// Just like you saw in the video, refactor the HTTP server code to explicitly bind a callback
// to the 'request' event using the on function.
// Add an event listener on the server variable that listens to the request event. 
// The event listener should take a callback function with two arguments, request and response.
var http = require('http');

var server = http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Hello, this is dog");
    response.end();
});

server.listen(8080);

var server = http.createServer();
server.on('request', function(request, response) {
    response.writeHead(200);
    response.write("Hello, this is dog");
    response.end();
});

server.listen(8080);

// 2.5 Listening Twice 240 PTS
// Who said you can only listen for an event once?
// Add a second 'request' handler to the HTTP server.
// From inside of the new handler, log the message "New request coming in..." using console.log().
var http = require('http');

var server = http.createServer();
server.on('request', function(request, response) {
    response.writeHead(200);
    response.write("Hello, this is dog");
    response.end();
});
server.on('request', function(request, response) {
    console.log("New request coming in...");
});

server.listen(8080);

// 2.6 Listening for Close 250 PTS
// Like our parents always used to say, listening is more important than talking! 
// Modify the server so that we know when it's closed down.
//Listen for the 'close' event on the server. The event listener should take a callback function that accepts no arguments.
//Inside the 'close' callback, log the message "Closing down the server...".
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
    response.writeHead(200);
    response.write("Hello, this is dog");
    response.end();
});

server.on('request', function(request, response) {
    console.log("New request coming in...");
});

server.on('close', function() {
    console.log("Closing down the server...");
});

server.listen(8080);
