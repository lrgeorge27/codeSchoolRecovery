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

    // 4.2 Missing Exports 150 PTS
    // Notice the two different files: high_five.js on the left side and app.js on the right. The code as it's written will not work, high_five.js isn't exporting anything.
    // Add the proper exports line to have a successful high five!
    var highfive = function() {
        console.log("smack!!");
    };
module.exports = highfive;

// 4.3 Export A Function 140 PTS
// Notice the app.js file with the myRequest function below. Let's refactor myRequest out to its own my_request.js module.
// Move the myRequest function and the http require into my_request.js

//moved to my_request.js file
var http = require('http');

var myRequest = function(message) {
    var request = http.request('http://codeschool.com', function(response) {
        response.pipe(process.stdout, { end: false });
    });

    request.write(message);
    request.end();
};
//Export the myRequest function.
module.exports = myRequest;

//Require the my_request.js module in app.js.
//app.js
var myRequest = require('my_request.js');

myRequest('Hello, this is dog.');

// 4.4 Exporting An Object 150 PTS
// The app.js code on the right side does not work. 
// Once again we forgot to export our functions.
// In the logger.js file, export the info function so we can use it in app.js by assigning it to the exports object.
// In the logger.js file, export the warn function so we can use it in app.js by assigning it to the exports object.
// In the logger.js file, export the error function so we can use it in app.js by assigning it to the exports object.
exports.warn = function(message) {
    console.log("Warning: " + message);
};

exports.info = function(message) {
    console.log("Info: " + message);
};

exports.error = function(message) {
    console.log("Error: " + message);
};

// 4.5 Installing Local Modules 150 PTS
// Practice using npm by installing the npm module underscore using the npm install command.
$ npm install underscore

// 4.6 Installing Global Modules 150 PTS
// Now install the coffee-script module, but install it globally so you can use the coffee executable that comes with coffee-script.
$ npm install coffe - script - g

// 4.7 Dependency 240 PTS
// Add two dependencies to our package.json file, connect and underscore. 
// We'll want to use version 2.1.1 of connect and version 1.3.3 of underscore.
// Add the connect dependency to package.json
// Add the underscore dependency to package.json
{
    "name": "My Awesome Node App",
    "version": "1",
    "dependencies": {
        "connect": "2.1.1",
        "underscore": "1.3.3"
    }
}

// 4.8 Semantic Versioning 250 PTS
// We want to make sure we are always up-to-date with the most recent patch-level changes to our dependencies when we run npm install.
// Update the connect version on package.json to fetch the latest patch-level changes. All we have to do is add one character to the beginning of the version number.
// Now update the underscore version on package.json to fetch the latest patch-level changes. Again, all we have to do is add one character to the beginning of the version number.
{
    "name": "My Awesome Node App",
    "version": "1",
    "dependencies": {
        "connect": "~2.2.1",
        "underscore": "~1.3.3"
    }
}
