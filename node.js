var http = require('http'); //How we require modules

http.createServer(function(request, response) { //callback function 
    response.writeHead(200); //status code in header 
    response.write('Hello, this is dog.'); //response body
    response.end(); //Close the connection
}).listen(8080); //listen for connections on this port
console.log('Listening on port 8080...');

//$ curl http://localhost:8080
//curl: (7) Failed to connect to localhost port 8080: Connection refused

//Node goes through the code to register events (request, connection, close)
//Registers a Request event
//Starts an event loop
//When a request comes in it triggers the function, returns the response, checks for another request.
//The event loop triggers events into an event queue
//Events are processed one at a time

var http = require('http');

http.createServer(function(request, response) { //request event
    response.writeHead(200);
    response.write('Dog is running.');
    setTimeout(function() { //timeout event; represent long running process
        response.write('Dog is done.');
        response.end();
    }, 5000); //5000ms = 5 seconds
}).listen(8080);
