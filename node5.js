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
<h1>Tweets for @<%= name %></h1> <
ul >
    << % tweets.forEach(function(tweet) { % >
            <li><%= tweet.text %><li>
<% }); %>
</ul>
//<%= if we want the value returned from the expression to get printed out to the display %>
// <% is used to run code, iterate through an array%>
