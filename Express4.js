//Express.js 4.1 POST Requests
//add a new form & create a post route

//Create new blocks by sending post request to the server. 
//client > POST to /blocks > server
//client < 201 Created < server
//Add a form in html with submit button

//client.js
$(function() {
    $.get('/blocks', appendToList);
    ...
    $('form').on('submit', function(event) { //add event listener
        event.preventDefault(); //prevent immediate submission
        var form = $(this);
        var blockData = form.serialize(); //transforms to URL-encoded notation

        $.ajax({
            type: 'POST',
            url: '/blocks',
            data: blockData //transforms to URL-encoded notation
        }).done(function(blockName) { //recently created block
            appendToList([blockName]); //array with the new block as its single argument
            form.trigger('reset');
        });

        function appendToList(blocks) {
            var list = [];
            var content, block;
            for (var i in blocks) {
                block = block[i];
                content = '<a href="/blocks/' + block + '</a>'; //link to each Block's description
                list.push($('<li>', { html: content }));
            }
            $('.block-list').append(list)
        }
    });
});

//app.js
//Parsing depends on a middleware not shipped with Express
$ npm install body - parser
//Routes can take multiple handlers as arguments and will call them sequentially
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = { ... }

app.post('/blocks', parseUrlencoded, function(request, response) { //parseUrlencoded runs first, function runs second
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name); //201 Created status code, responds with new block name
});
//Using multiple route handlers is useful for re-using middleware that load resources, preform validation, authentication


// 4.2 Parser Setup 120 PTS
// Assume the body-parser middleware is installed. Now, let's use it in our Express application.

var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Require the body-parser npm module and assign it to a variable called bodyParser.
var parseUrlencoded = bodyParser.urlencoded({ extended: false }); // The body-parser middleware offers different parsing options. On the bodyParser object, call a function that returns a parser for URL encoded data and store it in a variable called parseUrlencoded. Remember to pass in an option which forces the use of the native querystring Node library.

app.post('/cities', parseUrlencoded, function(request, response) { // Mount the parser only in the post route.
    var city = createCity(request.body.name, request.body.description); // Read the name and description parameters from the payload of the POST request, and pass them as arguments to the createCity function (we've created this one for you). Store the return value on the city variable.
    response.status(201).json(city); // Finally, respond back to the client with a 201 HTTP status code and the value stored in city in JSON format using json.
});

app.post('/cities', function(request, response) {
    var city;
});

app.listen(3000);

var createCity = function(name, description) {
    cities[name] = description;
    return name;
};

// 4.3 Validation 150 PTS
// The way that it is now, we are allowing new cities to be created with a blank description. Let's add some validation so that in order for a city to be created, its description must have a string length greater than 4.

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.post('/cities', parseUrlencoded, function(request, response) {
    if (request.body.description.length > 4) { // Add an if block that checks for a description.length greater than 4, and move our city creation logic into that block. Use json() to send the results from createCity back to the client.
        var city = createCity(request.body.name, request.body.description);
        response.status(201).json(city);
    }
    else { // If description does not match its minimum length requirements, then set a 400 status code (Bad Request) to the response, and set the response body to Invalid City using json().
        response.status(400).json('Invalid City');
    }

});

app.listen(3000);

//4.4 Delete Existing Blocks
//Add delete links
//Create a delete route
//Delete request to end point, 200 success code
//Add <a href> to each attribute with image
//listen for click events on that link 
//add confirmation

var target = $(event.currentTarget); //link element that was clicked

$ajax({
    type: 'DELETE',
    url: '/blocks/' + target.data('block')
}).done(function() {
    target.parents('li').remove(); //remove parent li for clicked link
});
//call delete function to create a delete route
//fetch name from blockName property (set by app.param)

var blocks = { ... }
app.delete('/blocks/name', function(request, response) {
    delete blocks[request.blockName]; //removes entry from blocks object, connects to app.param('name'...)
    response.sendStatus(200); //automatically sets a response body to OK
});

// 4.6 Delete Route 240 PTS
// Create a Dynamic Route for deleting cities and handle for cities that are not in our list.

app.delete('/cities/:name', function(request, response) { // Create a DELETE route that takes the city name as its first argument, followed by a callback that takes a request and response objects as arguments.
    if (cities[request.cityName]) { // Add an if block that checks whether the cityName provided from app.param() has a valid entry before attempting to delete it from the cities object. 
        delete cities[request.cityName]; // Use the built-in JavaScript operator delete (see MDN docs) to remove the property for the city passed as an argument. Don't forget to use the attribute set in app.param() to look the city up.
        response.sendStatus(200); // Use sendStatus() to respond back with a status code of 200.
    }
    else {
        response.sendStatus(404); //If a valid city is not found, then respond with a 404 HTTP status code using the sendStatus() function.
    }
});
app.listen(3000);
