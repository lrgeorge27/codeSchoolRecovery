//Express.js 1.1 

// Web application framework or Node
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
