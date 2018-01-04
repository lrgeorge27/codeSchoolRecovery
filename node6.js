//Node.js 6.1 Socket.io

//Building a chat app
//Websockets allow connection with each client to the server, sending and receiving data in real time
//Socket.io - abstracts websocketd with fallbacks
$npm install--save socket.io
var express = require('express'); //require express module
var app = express(); //intialize express application
var server = require('http').createServer(app); //create an http server, that dispatches requests to express
var io = require('socket.io')(server); // require socket.io module and allow it to use server to listen for http requests

io.on('connection', function(client) { //listen for connection events
    console.log('Client connected...');
    client.on('join', function(name) { //When the client joins the server
        client.nickname = name; //set the nickname associated with the client
    });

    client.emit('messages', { hello: 'world' }); //emit messages event on client(browser), send object hello world
    client.on('messages', function(data) { //listen for messages coming in
        // client.broadcast.emit("messages", data); //broadcasts message to all other connected clients
        var nickname = client.nickname; //get the name of the client before broadcasting message
        client.broadcast.emit("message", nickname + ":" + messages); //broadcast name with message
        client.emit("message", nickname + ":" + messages); //send the same message back to your client
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html'); //serve index.htm using sendFile
});
server.listen(8080);

// In HTML: 
<script src = "/socket.io/socket.io.js"></script> //include socket.io library 
<
script >
    var server = io.connect('http://localhost:8080'); //connect to server
server.on('connect', function(data) { //When the server connects
    $('#status').html('Connected to chattr'); //print connection status
    nickname = prompt("What is your nickname?"); //prompt client to enter a nickname

    server.emit('join', nickname); //notify the server of the clients nickname
});
server.on('messages', function(data) { //listen for messages event
    insertMessage(data) //pseudocode to display message data on client's screen using jQuery
    alert(data.hello); //when event received throw alert with data object from messages
});
$('#chat_form').submit(function(event) { //when submit is clicked
    var message = $('#chat_input').val(); //grab the message
    server.emit('messages', message); //emit message to server
});
<< < << << << < /
script >


    // 6.2 Setting Up socket.io Server-Side 210 PTS
    // So far we've created an Express server. Now we want to start building a real-time Q&A moderation service and we've decided to use socket.io.


    var express = require('express');
var app = express();
var server = require('http').createServer(app); // Using the http module, create an new http server and pass the express app as the listener for that new server.
var io = require('socket.io')(server); // Using the socket.io module, listen for requests on the http server. Store the return object of this operation in a variable called io.
io.sockets.on('connection', function(client) { // Use the object stored in io to listen for client 'connection' events. Remember, the callback function takes one argument, which is the client object that has connected.
    console.log("Client connected..."); // When a new client connects, log a message using console.log().
});
server.listen(8080); // Finally, we want to tell our http server to listen to requests on port 8080.


// 6.3 Client socket.io Setup 230 PTS
// In our html file, load the socket.io.js script and connect to the socket.io server.

<script src = "/socket.io/socket.io.js"></script> // Load the socket.io.js script. The socket.io.js path you should use is '/socket.io/socket.io.js'. Express knows to serve the socket.io client js for this path.
<
script >
    // use the socket.io server to connect to localhost:8080 here
    var server = io.connect('http://localhost:8080'); // Using the global io object that's now available for us, connect to the socket.io server at http://localhost:8080.
<< <
<< /
script >

    // 6.4 Listening For Questions 240 PTS
    // In our client below, listen for 'question' events from the server and call the insertQuestion function whenever the event fires.

    <<
script src = "/insertQuestion.js" > << / script >

    <<
script >
    var server = io.connect('http://localhost:8080');

// Insert code here
server.on('question', function(question) { // First, listen for 'question' events from the server.
    insertQuestion(question); // Now, have the event callback function call the insertQuestion function. The insertQuestion function is already created for you, and it's placed in its own file. It expects exactly one argument - the question.
});

<< /
script >


    // 6.5 Broadcasting Questions 240 PTS
    // When a question is submitted to our server, we want to broadcast it out to all the connected clients so they can have a chance to answer it.

    var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    console.log("Client connected...");
    client.on('question', function(question) { // In the server, listen for 'question' events from clients.
        client.broadcast.emit('question', question); // Now, emit the 'question' event on all the other clients connected, passing them the question data.
    });

});

server.listen(8080);


// 6.6 Saving Client Data 230 PTS
// In our real-time Q&A app, we want to allow each client only one question at a time, but how do we enforce this rule? We can use socket.io's ability to save data on the client, so whenever a question is asked, we first want to check the question_asked value on the client.

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    console.log("Client connected...");

    client.on('question', function(question) {
        if (!client.question_asked) { // Finally, when a client emits a 'question' event, check to make sure question_asked is not already set to true. We only want to allow one question per user, so make sure that we only set the value of question_asked and broadcast the question to other clients when the value of question_asked is not already true.
            client.question_asked = true; // First, when a client emits a 'question' event, we want to set the value of question_asked to true.
            client.broadcast.emit('question', question); // Second, when a client emits a 'question' event, we want to broadcast that question to the other clients.
        }
    });
});

server.listen(8080);


// 6.7 Answering Questions 230 PTS
// Clients can also answer each other's questions, so let's build that feature by first listening for the 'answer' event on the client, which will send us both the question and answer, which we want to broadcast out to the rest of the connected clients.

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function(client) {
    console.log("Client connected...");

    // listen for answers here
    client.on('answer', function(question, answer) { // With the client, listen for the 'answer' event from clients. This listener will have both a question and answer to broadcast so make sure to include both as function parameters.
        client.broadcast.emit('answer', question, answer); // Now, emit the 'answer' event on all the other clients connected, passing them the question and answer data.
    });


    client.on('question', function(question) {
        if (!client.question_asked) {
            client.question_asked = true;
            client.broadcast.emit('question', question);
        }
    });
});

server.listen(8080);

// 6.8 Answering Question Client 130 PTS
// Now on the client, listen for the 'answer' event and then add the appropriate data to the DOM.

<script src="/socket.io/socket.io.js"></script>

<
script >
    var server = io.connect('http://localhost:8080');

server.on('question', function(question) {
    insertQuestion(question);
});

server.on('answer', function(question, answer) { // Listen for the 'answer' event off of the server.
    answerQuestion(question, answer); // Call the answerQuestion function, passing in both the question and the answer that was broadcast from the server.
});
//Don't worry about these methods, just assume 
//they insert the correct html into the DOM
// var insertQuestion = function(question) {
// }

// var answerQuestion = function(question, answer) {
// }
<
/script>
