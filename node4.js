//Node.js 4.1 Modules
//http library
//fs - file system library

//creating modules:
var hello = function() {
    console.log("hello!");
}
module.exports = hello; //makes public
//this ^ creates a single module
//exports defines what require returns.
exports.goodbye = function() {
    console.log("bye!");
}
//this ^ method allows for multiple modules

//inside app file:
var hello = require('./custom_hello');
var gb = require('./custom_goodbye');
hello();
gb.goodbye();

//my_module.js
var foo = function() { ... };
var bar = function() { ... };
var baz = function() { ... }; //only accessable inside module

exports.foo = foo
exports.bar = bar

//app.js
var myMod = require('./my_module');
myMod.foo;
myMod.bar;

var http = require('http');
//var message = "Here's looking at you, kid.";
var makeRequest = function(message) { //encapsulate functionality
    var options = {
        host: 'localhost',
        port: 8080,
        path: '/',
        method: 'POST'
    }
    var request = http.request(options, function(response) {
        response.on('data', function(data) {
            console.log(data);
        });
    });
    request.write(message); //begins request
    request.end(); //finishes request
}
makeRequest("Here's looking at you kid!");

//shrink previous code, create a module
var http = require('http');
var makeRequest = function(message) {
    ...
}
module.exports = makeRequest;

//inside app
var makeRequest = require('./make_request');

makeRequest("Here's looking at you, kid!");
makeRequest("Hello, this is dog");

//Where does require look for modules?
var make_request = require('./make_request') //look in same directory
var make_request = require('../make_request') //look in parent directory
var make_request = require('/users/lauren/nodes/make_request') //look in specific directory
    /
    home / lauren / my_app / app.js //search in node_modules directory
var make_request = require('make_request') //looks systematically through each level of directory:
// /home/lauren/my_app/node_modules/make_request.js
// /home/lauren/node_modules/make_request.js
// /home/node_modules/make_request.js
// /node_modules/make_request.js

// NPM: Package manager for node
// comes with node, module repositiory, dependency management
// easily publish modules, http://npmjs.org

//Installing NPM Modules in /home/my_app
$ npm install request
//installs into file path: home/my_app/node_modules/request
var request = require('request'); //inside /home/my_app/app.js, loads from local node_modules directory

//local vs global
//global install:
$npm install coffee - script - g
//global npm modules can't be required
var coffee = required('coffee-script'); //won't work; needs to be installed locally to be required
$ npm install coffee - script //local installation
var coffee = required('coffee-script') //now it works

//best practice: create a package.json file, specify dependencies
//dependencies are the modules our app needs to run
my_app / package.json {
    "name": "My App",
    "version": "1"
    "dependencies": {
        "connect": "1.8.7" //version number
    }
}
//run $ npm install
//my_app/node_modules/connect

//Semantic Versioning
"connect": "1.8.7"
// 1 - major version, changes the api
// 8 - minor version, probably doesn't change the api
// 7 - patch version, doesn't change the api
"connect": "~1" //fetches ranges >= 1.0.0 <2.0.0, can be dangerous
"connect": "~1.8" //fetches ranges >= 1.8.0 <1.9.0, api could change
"connect": "~1.8.7" //fetches ranges >= 1.8.7 <1.9.0, can be dangerous
http: //semver.org/
