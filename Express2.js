// 2.2 Mounting Middleware 250 PTS
// Given an application instance is set to the app variable, which of the following function calls would you use to mount a middleware called logger ?
app.use(logger)

// 2.3 Default Middleware 250 PTS
// What is the only middleware that's shipped with Express 4?
express - static

// 2.4 Express Static 230 PTS
// Change the code in app.js to use the express-static middleware instead of the response.sendFile() function.

var express = require('express');
var app = express();

// Remove our app.get() containing the root '/' route.
// app.get('/', function (request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static('public')); // Mount the static middleware and serve files under the public directory.

app.get('/cities', function(req, res) {
    var cities = ['Lotopia', 'Caspiana', 'Indigo'];
    res.send(cities);
});

app.listen(3001);

// 2.5 Script Tags 140 PTS
// Now we can add some client - side JavaScript by including the jquery.js and client.js files.

<< < << << << < << < << << << << << < << < << < !DOCTYPE html >
    <html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cities</title>
</head>
<body>
  <h1>Cities</h1>

  <ul class='city-list'></ul>
    <script src=jquery.js></script> // Within index.html, include jquery.js using a < script > tag.
    <script src=client.js></script> // Within index.html, include client.js using a < script > tag.
</body>
</html>

// client.js:
$(function() {
    // Now in the client.js file, complete the code for the $.get function so that it calls the / cities URL path, and then runs the appendToList function.
    $.get('/cities', appendToList);

    function appendToList(cities) {
        var list = [];
        for (var i in cities) {
            list.push($('<li>', { text: cities[i] }));
        }
        $('.city-list').append(list);
    }
});

// 2.6 Writing Our Own Middleware
//complete logger.js code
module.exports = function(request, response, next) { //Node module system follow Common JS specification
    //called for each request and any round
    var start = +new Date(); //date object used to track start time in Unix, + converts to milliseconds
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;

    response.on('finish', function() {
        var duration = +new Date() - start;
        var message = method + 'to' + url + '\ntook' + duration + 'ms \n\n';
        stream.write(message); //prints the log message
    });
    next(); //moves call to the next middleware in the stack
}

//app.js
var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger) //require and use above module

app.use(express.static('public));

            app.get('/blocks', function(request, response) {
                var blocks = ['Fixed', 'Movable', 'Rotating'];
                response.json(blocks);
            });

            app.listen(3000, function() {
                console.log('Listening on 3000 \n');
            });

            // 2.7 Logging Middleware 220 PTS
            // Help finish the following middleware code in the logger.js file:

            module.exports = function(request, response, next) {
                var startTime = +new Date();
                var stream = process.stdout;
                var duration = null;

                response.on('finish', function() { // On the response object, listen to the event that's emitted when the response has been handed off from Express to the underlying Operating System.
                    duration = +new Date() - startTime; // Inside of the finish callback, calculate the duration of the request by subtracting the startTime from a new Date object. Store the duration in the duration variable, which has already been declared for you.
                    stream.write("This request took " + duration + " ms"); // Using the stream object, which holds a reference to standard out, write the following message: "This request took ____ ms", where ____ is the duration for the request.
                });
                next(); // If we run the code as is, the request will be stuck in our middleware. Call the function that moves processing to the next middleware in the stack.


            };

            // 2.8 Add Logging Middleware 250 PTS
            // In the following code in app.js, we require our new middleware and assign it to a variable called logger.
            // What function should we call in order to mount the middleware and add it to the stack?

            app.route(logger)

            // 2.9 Only GET 130 PTS
            // Let's build a middleware that ensures only GET requests are allowed to go through.

            module.exports = function(request, response, next) { // First, in the only_get.js file, create an anonymous function that uses the middleware signature and assign it to module.exports. Remember, the Express middleware function signature takes three arguments.
                if (request.method === 'GET') { // Use the request object to check if the HTTP method used is 'GET' and if it is, then call the function that moves processing to the next middleware in the stack.
                    next();
                }
                else {
                    response.send('Method is not allowed'); // If the HTTP method is not 'GET', then complete the request by sending back a message that says 'Method is not allowed'.
                }
            };

            2.10 Buildings
            var express = require('express');
            var app = express();

            app.use(function(request, response, next) {
                if (request.path === "/cities") {
                    next();
                }
                else {
                    response.status(404).json("Path requested does not exist");
                }
            });

            app.get('/cities', function(request, response) {
                var cities = ['Caspiana', 'Indigo', 'Paradise'];
                response.json(cities);
            });

            app.listen(3000);

            // When we run our previous code and issue a GET request to the /buildings endpoint, what will the response be?
            404 response with "Path requested does not exist"
