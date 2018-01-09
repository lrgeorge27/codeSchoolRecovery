//Express.js 1.1 

// Web application framework for Node
// minimal, flexible, great for building APIs, foundation for Kranken and Sails

// $ npm install express
//$ npm install express@4.9 installs specific version

//Calling the express function gives us an application instance
var express = require('express');
var app = express(); //application instance, storred in app

app.get('/', function(request, response) { //creates a route that accepts a GET request, using / as the root
    response.send('Hello World'); //sends back the server response
});

app.listen(3000, function() { //takes an optional callback, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000');
}); //binds app to tcp port 3000

//built-in functions named after HTTP verbs
// app.post()
// app.put()
// app.patch()
// app.delete()

// Running Express app
// start the server with node command
// $ node app.js
// Listening on port 3000

// requests with curl
// $ curl http://localhost:3000

//changes to code requires a server restart
//Ctrl + C stops server, interupts current process

//Express extends Node HTTP objects
//view inheritance image
//Call Node http functions from Express apps
//We can respond from Express using Node's write and end functions, useful when writing "extensions" from Express
var express = require('express');
var app = express(); //application instance, storred in app

app.get('/', function(request, response) { //creates a route that accepts a GET request, using / as the root
    response.write('Hello World'); //sends back the server response
    response.end(); //these two lines are the same as response.send() using Express API
});

app.listen(3000, function() { //takes an optional callback, which is called once the app is ready to start taking requests
    console.log('Listening on port 3000');
}); //binds app to tcp port 3000

//The .send() converts objects and arrays to JSON

app.get('/blocks', function(request, response) { //root name blocks
    var blocks = ['Fixed', 'Movable', 'Rotating']; //create an array with 3 elements
    response.send(blocks); //send converts the array to a JSON object
});
//call
// $ curl - i http: //localhost:3000/blocks
//     //response
// HTTP / 1.1 200 OK
// X - Powered - By: Express
// Content - Type: application / json;
// charset = utf - 8["Fixed", "Movable", "Rotating"]

//response.json function
app.get('/blocks', function(request, response) { //root name blocks
    var blocks = ['Fixed', 'Movable', 'Rotating']; //create an array with 3 elements
    response.json(blocks); //converts the array to a JSON object, reads better when only using JSON
});

//send converts strings to HTML
app.get('/blocks', function(request, response) { //root name blocks
    var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>'; //create an array with 3 elements
    response.send(blocks); //send converts strings to HTML
});
//call
// $ curl - i http: //localhost:3000/blocks
//     //response
// HTTP / 1.1 200 OK
// X - Powered - By: Express
// Content - Type: text / html;
// charset = utf - 8 //type is text/html
// <ul> <li>Fixed</li> < li > Movable < /li></ul > //returns HTML
//Use EJS or Jade for server-side templates

//Redirecting paths
app.get('/blocks', function(request, response) {
    response.redirect('/parts'); //redirect uses new path name as the argument, setting proper response headers and redirecting to new path
});
//call 
// $ curl - i http: //localhost:3000/blocks
//     //response
// HTTP / 1.1 302 Moved Temporarily
// X - Powered - By: Express
// Location: /parts
// Content - Type: text / plain;
// charset = utf - 8
// Moved Temporarily. Redirecting to / parts

//Custom code status
app.get('/blocks', function(request, response) {
    response.redirect(301, '/parts'); //redirect uses status code as the first argument, and new path as the second argument
});
//call
// $ curl - i http: //localhost:3000/blocks
//     //response
// HTTP / 1.1 301 Moved Permanently
// X - Powered - By: Express
// Location: /parts
// Content - Type: text / plain;
// charset = utf - 8
// Moved Permanently. Redirecting to / parts

//1.3
var express = require('express');
var app = express();

app.get('/locations', function(request, response) {
    var cities = ['Caspiana', 'Indigo', 'Paradise'];
    response.send(cities);
});
app.listen(3001, function() {
    console.log("Running Express");
});
