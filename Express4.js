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
