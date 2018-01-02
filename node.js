//Node.js 1.1
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

//1.2 Hello You
var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Hello, this is Lauren");
    response.end();
}).listen(8080);

//1.3 Convert Blocking
//blocking function readFileSync. 
var fs = require('fs');
var contents = fs.readFileSync('index.html');
console.log(contents);

//Convert the code to be non-blocking using the readFile function instead.
fs.readFile('index.html', function(error, contents) {
    console.log(contents);
}); //removed Sync from readFile, added a callback function with error and contents parameters, moved console.log() inside function.

//1.4 Running code

// 1.5 Read File in Server 140 PTS
// Now that you know how to create an HTTP server and how to read a file off the filesystem in a non-blocking way, let's try to combine the two.
// Instead of just writing a string to the HTTP response, write the contents of index.html to the response instead.
var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200);
    fs.readFile('index.html', function(error, contents) { //After response.writeHead(200), add a call to fs.readFile() that reads index.html asynchronously. Remember to pass a callback function, that accepts an error parameter, and a contents parameter.
        response.write(contents); //Now that you have the file contents, write it to the response.
        response.end(); //move end inside the callback function
    });

}).listen(8080);

// 1.6 Issuing a Request 150 PTS
// Let's see our new server in action. We've already run node app.js, so in the terminal below use curl to issue a request to http://localhost:8080 and we'll see our server respond with the contents of index.html.
// //In the console:
// <html><p>Hello, this is Dog</p></html>
// Congratulations, you're correct!

// 1.7 Writing Response Headers 150 PTS
// Up until now all we've been sending into the response.writeHead() function is the status code. However, it can take additional parameters.
http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html' //code I added based on node documentation https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
    });

    fs.readFile('index.html', function(err, contents) {
        response.write(contents);
        response.end();
    });

}).listen(8080);

// 1.8 Response End 250 PTS
// Our original Hello server can be shortened since the response.end() function optionally takes data as a parameter. 
var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200);
    // response.write(); //Remove the response.write line altogether, and send the hello string as a parameter on the response.end function.
    response.end("Hello, this is dog"); //This will send the data, and once finished add the end to the response.
}).listen(8080);
