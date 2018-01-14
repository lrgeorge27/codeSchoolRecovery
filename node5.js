//Node.js 5.1 Express

//Express is a "Sinatra (simple web framework for Ruby) inspired web development framework for Node.js--insanely fast, flexible, and simple"
//Provides easy route URLs to callbacks, middleware(from Connect), environment based configuration, redirection helpers, file uploads
$npm install--save express //installs module and add to depencies file in package.json
var express = require('express');
var app = express();
app.get('/', function(request, response) { //define endpoint get request, '/' root route
    response.sendFile(__dirname + "/index.html"); //read a file from file system and send back a response
}); //__dirname is current directory
app.listen(8080);

//Endpoint to send a twitter username, call out to twitter, and send back last 10 tweets from username
var request = requre('request');
var url = require('url');

app.get('/tweets/:username', function(req, response) {
    //'/tweets/:username' route definition takes in tweets and username, :username shows a dynamic username
    var username = req.params.username; //grab username out of reques parameters
    options = { //get the last 10 tweets for screen_name
        protocol: "http:",
        host: 'api.twitter.com',
        pathname: '/1/statuses/user_timeline.json',
        query: { screen_name: username, count: 10 }
    }

    var twitterUrl = url.format(options);
    request(twitterUrl).pipe(response); //call url base on options, and pipe response back to users browser
});
//twitter api has changed since this code, doesn't work

$node app.js
$curl - s http: //localhost:8080/tweets/eallam (username)
    $npm install prettyjson - g //gloablly install pretty json executable to visually enhance array
$curl - s http: //localhost:8080/tweets/eallam | prettyjson

    //install templating library
    $npm install--save ejs //ejs = embedded javaScript
my_app / package.json "dependencies": {
    "express": "4.9.6",
    "ejs": "1.0.0"
}
//looks for templates under views directory (/home/lauren/my_app/views) by default
//app.js
app.get('/tweets/:username', function(req, response) {
    ...
    request(url, function(err, res, body) {
        var tweets = JSON.parse(body);
        response.locals = { tweets: tweets, name: username };
        response.render('tweets.ejs');
    });
});
//tweets.ejs
// <h1>Tweets for @<%= name %></h1> <
// ul >
//     << % tweets.forEach(function(tweet) { % >
//             <li><%= tweet.text %><li>
// <% }); %>
// </ul>
// //<%= if we want the value returned from the expression to get printed out to the display %>
// // <% is used to run code, iterate through an array%>

// 5.2 Express Routes 230 PTS
// Let's create an express route that accepts GET requests on '/tweets' and responds by sending back a static HTML file.
// Create a GET route for '/tweets' and give it the proper callback. The callback function should accept two arguments: the request and the response.
//Send back the file tweets.html, which lives under the project's root path. Remember to use __dirname to locate tweets.html.
// Finally, have the express app listen on port 8080.
var express = require('express');
var app = express();
app.get('/tweets', function(request, response) {
    response.sendFile(__dirname + "/tweets.html");
});
app.listen(process.env.IP);

// 5.3 Route Params 130 PTS
// Let's create a route that accepts dynamic arguments in the URL path and responds with the quote from the proper author.
// Start by creating a GET route for '/quotes' that takes a name parameter as part of the URL path.
// Now, use the name parameter from the URL to retrieve a quote from the quotes object and write it out to the response. Note: No piping here, just write the quote string to the response like you did in previous levels (and then close the response).
var express = require('express');
var app = express();

var quotes = {
    'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
    'berners-lee': 'The Web does not just connect machines, it connects people',
    'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
    'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(request, response) {
    response.end(quotes[request.params.name]);
});

app.listen(8080);

// 5.4 Rendering 130 PTS
// Instead of just writing out the quote to the response, let's try using an EJS template to render the response.
var express = require('express');
var app = express();

var quotes = {
    'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
    'berners-lee': 'The Web does not just connect machines, it connects people',
    'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
    'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(req, res) {
    var quote = quotes[req.params.name];

    res.render('quote.ejs', { // First, render the quote.ejs template to the response.
        name: req.params.name, // Next, make the name and the quote data available to the template.
        quote: quote
    });
});

app.listen(8080);

// Inside quote.ejs, add the code needed to render the data you passed to the template.
<h2>Quote by <%= name %></h2>

<
blockquote >
    <%= quote  %> <
    /blockquote>


// 5.5 URL Building 210 PTS
// Let's create a page which calls the Twitter search API and displays the last few results for Code School. 
// The first step is to construct the proper URL, which is all you need to do in this challenge.
// Complete the URL options which will be sent into the the url module's format method. 
// The URL you'll want to construct is the following: http://search.twitter.com/search.json?q=codeschool

var url = require('url');

options = {
    // add URL options here
    protocol: 'http:', // Add the protocol attribute to options.
    host: "search.twitter.com", // Add the host attribute to options.
    pathname: '/search.json', // Add the pathname attribute to options.
    query: { // Add an attribute which takes an object of query parameters, in this case we only need q to search Twitter.
        q: "codeschool"
    }
};

var searchURL = url.format(options);
console.log(searchURL);

// 5.6 Doing the Request 230 PTS
// Next, we'll use the request module to make a simple web request and log the response to the console. You can use this example in the README.

var request = require('request'); // To start, require the request module and assign the return function to a variable.
request(searchURL, function(err, response, body) { // Next, issue a request to searchURL. Remember, the callback function for the request function takes three arguments: error, response and body.
    console.log(body); // Finally, log the response body to the console using console.log().

});


// 5.7 Express Server 220 PTS
// Now, let's create an Express server which queries out for the search term and then returns the JSON.

var url = require('url');
var request = require('request');

var options = {
    protocol: "http:",
    host: "search.twitter.com",
    pathname: '/search.json',
    query: {
        q: "codeschool"
    }
};

var searchURL = url.format(options);

var app; // Create server here
var express = require('express'); // Require the express module.
var app = express(); // Create the Express server and name it app.
app.get('/', function(req, response) { // Create a route for GET requests to / (root path). Remember, the callback function takes two arguments: a request req and a response res.
    request(searchURL).pipe(response); // In our new route, issue a request to searchURL and pipe the results into the response.
});
app.listen(8080); // Finally, tell app to listen on port 8080.
