//Node.js 7.1 Persistant Data

// var express = require('express'); //require express module
// var app = express(); //intialize express application
// var server = require('http').createServer(app); //create an http server, that dispatches requests to express
// var io = require('socket.io')(server); // require socket.io module and allow it to use server to listen for http requests

var messages = []; //store messages in an array
var storeMessage = function(name, data) {
    messages.push({ name: name, data: data }); //add message to end of array
    if (messages.length > 10) { //if there are more than 10 messages,
        messages.shift(); //remove the first one
    }
}
io.on('connection', function(client) { //listen for connection events
    console.log('Client connected...');
    client.on('join', function(name) { //When the client joins the server
        messages.forEach(function(message) { //iterate through message array an 
            client.emit("messages", message.name + ":" + message.data); //emit a message on the connecting client for each one
        });
        client.set('nickname', name); //set the nickname associated with the client
        client.broadcast.emit("chat", name + "joined the chat");
    });

    client.on('messages', function(data) { //listen for messages coming in
        client.get("nickname", function(error, name) {
            client.broadcast.emit("messages", name + ":" + messages); //broadcast name with message
            client.emit("messages", name + ":" + messages); //send the same message back to your client
        });
    });
});

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html'); //serve index.htm using sendFile
// });
// server.listen(8080);

// Persisting Stores include:
// MongoDB, CouchDB, PostgreSQL, Memcached, Riak, Redis - key-value store
// All are non-blocking

// Redis data structures
//LPUSH list commands
// node_redis library
$npm install redis--save

var redis = require('redis');
var client = redis.createClient(); //create a redis client

client.set("message1", "hello, yemess this is dog");
client.set("message2", "hello, no this is spider");
//message# = key, value

client.get("message1", function(err, reply) { //get from database
    console.log(reply);
});

//Redis lists: pushing
//Adding a string to the "messages" list
var message = "Hello, this is dog";
client.lpush("messages", message, function(err, reply) { //pushes message to list, callback function optional
    console.log(reply) //gives list length
});
//Add another string to "messages"
var message = "Hello, no this is spider";
client.lpush("messages", message, function(err, reply) {
    console.log(reply); //now gives length of 2
});

var message = "Hello, this is dog";
client.lpush("messages", message, function(err, reply) { //pushes message to list, callback function optional
    client.ltrim("messages", 0, 1); //trim keeps the first two strings [0, 1] and removes the rest
});

//retrieving messages from a list
client.lrange("messages", 0, -1, function(err, messages) { //lrange with 0, -1 returns all values in a list
    console.log(messages); //replies with all strings in list
});


//Rewrite storeMessages() to use Redis
var messages = []; //store messages in an array
var redisClient = redis.createClient(); //need to create a redis client

var storeMessage = function(name, data) {
    var message = JSON.stringify({ name: name, data: data }); //need to turn the object into a string to store in Redis
    redisClient.lpush("messages", message, function(err, response) { //push messages into list
        redisClient.ltrim("messages", 0, 9); //keeps newest 10 items
    });
    // messages.push({ name: name, data: data }); //add message to end of array
    // if (messages.length > 10) { //if there are more than 10 messages,
    //     messages.shift(); //remove the first one
    // }
}

//Change client join to use Redis
client.on('join', function(name) { //When the client joins the server
    client.broadcast.emit("add chatter", name); //notify other clients a chatter has join the chatroom
    redisClient.sadd("chatters", name); //add name to chatters set
    redisClient.lrange("messages", 0, -1, function(err, messages) {
        messages = messages.reverse(); //reverse so they are emitted in correct order

        messages.forEach(function(message) { //iterate through message array an 
            message = JSON.parse(message); //parse into JSON object            client.emit("messages", message.name + ":" + message.data); //emit a message on the connecting client for each one
            client.emit("messages", message.name + ":" + message.data); //emit a message on the connecting client for each one
        });
    });
});

//Sets are lists of unique data:
//Add members of names set
client.sadd("names", "Dog");
client.sadd("names", "Spider");
client.sadd("names", "Gregg");
//Remove members of names set
client.srem("names", "Spider");
//Reply with all members of set
client.smembers("names", function(err, names) {
    console.log(names); //print list to console
});
//Adding Chatters:
client.on('join', function(name) { //When the client joins the server
    client.broadcast.emit("add chatter", name); //notify other clients a chatter has join the chatroom
    redisClient.smembers('names', function(err, names) {
        names.forEach(function(name) {
            client.emit('add chatter', name); //emit all the currently logged in clients to the newly connected client
        });
    });
    redisClient.sadd("chatters", name); //add name to chatters set
});
//In index.html
<script>
socket.on('add chatter', function(name){
    var chatter = $('<li>' + name + '<li>').data('name', name);
    $('#chatters').append(chatter);
});
</script>

//Remove chatter when they disconnect from server
client.on('disconnect', function(name) {
    client.get('nickname', function(err, name) {
        client.broadcast.emit("remove chatter", name);

        redisClient.srem("chatters", name);
    });
});
//In index.html
<script>
server.on('remove chatter', function(name){
   $('#chatters li[data-name=' + name + ']').remove();
});
}
</script>

// 7.2 Simple Redis Commands 130 PTS
// Let's start practicing using the redis key-value store from our node application.

var redis = require('redis'); // Require the redis module and assign it to a variable called redis.
var client = redis.createClient(); // Create a redis client and assign it to a variable called client.
client.set("name", "Lauren"); // On the client, set the name property to your name.

// 7.3 Get A Key 240 PTS
// We have already stored a value in the question key. Use the redis client to issue a get command to redis to retrieve and then log the value.

client.get('question', function(err, data) { // Use the redis client to issue a get command using the 'question' key to retrieve a value. Remember, the get function takes a callback which expects two arguments, error and data.
    console.log(data); // Log the value retrieved with console.log.
});

// 7.4 Working With Lists 1 240 PTS
// As we saw in the video, redis can do more than just simple key-value pairs. We are going to be using redis' LISTS later to add persistence to our live-moderation app, so let's practice using them now.

client.lpush('questions', question1, function(err, value) { // Using the redis client's lpush command, insert question1 into the questions list. Then, console.log the result you receive. Remember, the lpush function takes a callback as its last argument, which expects an error and value to be passed as arguments.
    console.log(value);
});

client.lpush('questions', question2, function(err, value) { // Using the redis client's lpush command, insert question2 into the questions list. Then console.log the result you receive.
    console.log(value);
});

// 7.5 Working With Lists 2 230 PTS
// Now that we have seeded the questions list, use the lrange() command to return all of the items and log them.
client.lrange('questions', 0, -1, function(err, value) { // Use the lrange() command to return all of the items from the questions key.
    console.log(value); // Now that we have called lrange(), use console.log to log the result from redis.
});

// 7.6 Persisting Questions 240 PTS
// Let's go back to our live-moderation app and add some persistence, first to the questions people ask.

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
    client.on('answer', function(question, answer) {
        client.broadcast.emit('answer', question, answer);
    });

    client.on('question', function(question) {
        if (!client.question_asked) {
            client.question_asked = true;
            client.broadcast.emit('question', question);
            // add the question to the list here
            redisClient.lpush('questions', question); // Use the lpush command to add new questions to the list named questions. Do this inside the listener for the 'question' event.
        }
    });
});


// 7.7 Emitting Stored Questions 230 PTS
// Now that we have questions stored in redis, let's emit them whenever a new client connects to the server through socket.io.
var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
    redisClient.lrange('questions', 0, -1, function(err, questions) { // Use the lrange command to retrieve a list of questions that represent the questions list within redis.
        questions.forEach(function(question) {
            client.emit('question', question); // Inside of the lrange callback, use a forEach loop to iterate through the questions and emit() each question to the client. Remember, don't use broadcast.emit because we only want to send the questions to the client that is connecting to the server.
        });
    });
    client.on('answer', function(question, answer) {
        client.broadcast.emit('answer', question, answer);
    });

    client.on('question', function(question) {
        if (!client.question_asked) {
            client.question_asked = true;
            client.broadcast.emit('question', question);
            redisClient.lpush("questions", question);
        }
    });
});


// 7.8 Limiting Questions Stored 240 PTS
// Great work! One last thing though, since every time a new question comes in we store it in the questions list, we might run into a problem where there are just too many questions stored in that list.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
    redisClient.lrange("questions", 0, -1, function(err, questions) {
        questions.forEach(function(question) {
            client.emit("question", question);
        });
    });

    client.on('answer', function(question, answer) {
        client.broadcast.emit('answer', question, answer);
    });

    client.on('question', function(question) {
        if (!client.question_asked) {
            client.question_asked = true;
            client.broadcast.emit('question', question);
            redisClient.lpush("questions", question, function() { // Add a callback to lpush that will be used to limit the size of the list down to a max of 20.
                redisClient.ltrim("questions", 0, 19); // Use the ltrim command to limit the size of the list stored within redis to a maximum size of 20.
            });
        }
    });

});
