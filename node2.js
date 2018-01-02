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
//http.createServer([requestListener]) --> returns a new web server object. The requestListener is a function with is automatically added to the 'request' event.
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
