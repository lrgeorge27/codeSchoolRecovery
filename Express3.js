//Express.js Level 3 User Params

// 3.2 City Search 150 PTS
// We want to create an endpoint that we can use to filter cities. Follow the tasks below to to create this new route.
// From inside of our route, create an if statement that checks whether a value is set to the query string parameter search.
// Inside of the if block, call the citySearch() function, passing in the user submitted parameter for search. Then return the result of the function as a JSON response.

var express = require('express');
var app = express();

var cities = ['Caspiana', 'Indigo', 'Paradise'];

app.get('/cities', function(request, response) { // Create a new route for GET requests to '/cities'. The second argument should be a callback function which takes request and response.
    if (request.query.search) { // From inside of our route, create an if statement that checks whether a value is set to the query string parameter search.
        response.json(citySearch(request.query.search)); // Inside of the if block, call the citySearch() function, passing in the user submitted parameter for search. Then return the result of the function as a JSON response.
    }
});

function citySearch(keyword) {
    var regexp = RegExp(keyword, 'i');
    var result = cities.filter(function(city) {
        return city.match(regexp);
    });

    return result;
}

app.listen(3000);

// 3.3 Dynamic Route Variables 250 PTS
// Consider the following Dynamic Route:

app.get('/cities/:name', function(request, response) {
    // ...
})
// When requests come in for this route, how can we access the city name submitted by the user?
request.params.name

// 3.4 City Information 240 PTS
// Now lets look up some information about the city.
app.get('/cities/:name', function(request, response) {
    var cityInfo = cities[request.params.name]; // Inside of our dynamic route, grab the name submitted by the user, lookup the city information on the cities object and assign it to the cityInfo variable.
    if (cityInfo) { // Check to see if cityInfo exists and if so, respond with the cityInfo in JSON format.
        response.json(cityInfo);
    }
    else {
        response.status(404).json("City not found"); // If cityInfo does not exist, respond with a 404 HTTP status code and a JSON message that says "City not found".
    }
});

//3.5 Massaging User Data
//Current implementation only matches on exact Block name, case sensitive
//Refactor code to normalize input
//The app.param function maps placeholders to callback functions.
//It's useful for running pre-conditions on dynamic routes.
//Use middleware
//Properties set on the request object can be accessed from all subsequent routes in the application. 
//We can read properties on request with were set on app.param. 
//The Object.keys function returns an Array with the object's properties.

// 3.6 Flexible Routes 240 PTS
// Our current route only works when the city name argument matches exactly the properties in the cities object.This is a problem.We need a way to make our code more flexible.

var express = require('express');
var app = express();

var cities = {
    'Lotopia': 'Rough and mountainous',
    'Caspiana': 'Sky-top island',
    'Indigo': 'Vibrant and thriving',
    'Paradise': 'Lush, green plantation',
    'Flotilla': 'Bustling urban oasis'
};

app.get('/cities/:name', function(request, response) {
    var cityName = parseCityName(request.params.name); // Inside our route, call the parseCityName() function passing in the name parameter.Assign the return value to the new variable called cityName.
    var cityInfo = cities[cityName]; // Now, using the city name returned from the parseCityName() function, lookup the corresponding description using the cities object and store it in the correct variable that will make the rest of the function work as intended.
    if (cityInfo) {
        response.json(cityInfo);
    }
    else {
        response.status(404).json('City not found');
    }
});

function parseCityName(name) {
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
}

app.listen(3000);

// 3.7 Dynamic Routes I 250 PTS
// Which Express function maps placeholders to callback functions, and is commonly used for running pre-conditions on Dynamic Routes?
app.param()

// 3.8 Dynamic Routes II 250 PTS
// Whenever we use our name parameter we want to parse it a specific way. Let's clean up our existing code so that all routes with a name parameter get the same special handling.
// Inside the app.param() callback function, call the parseCityName() function with the submitted name parameter. Set the return value to a new property in the request object called cityName.

var express = require('express');
var app = express();

var cities = {
    'Lotopia': 'Rough and mountainous',
    'Caspiana': 'Sky-top island',
    'Indigo': 'Vibrant and thriving',
    'Paradise': 'Lush, green plantation',
    'Flotilla': 'Bustling urban oasis'
};

app.param('name', function(request, response, next) { // Call app.param() to intercept requests that contain an argument called 'name'. Remember app.param() takes a callback function as its second argument, which uses the same signature as a middleware.
    request.cityName = parseCityName(request.params.name); // Inside the app.param() callback function, call the parseCityName() function with the submitted name parameter. Set the return value to a new property in the request object called cityName.
    next(); // Finally, call a function that moves processing to the next function in the stack.
});

app.get('/cities/:name', function(request, response) {
    var cityInfo = cities[request.cityName];
    if (cityInfo) {
        response.json(cityInfo);
    }
    else {
        response.status(404).json("City not found");
    }
});

function parseCityName(name) {
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
}

app.listen(3000);

// 3.9 Dynamic Routes III 250 PTS
// The following code has a Dynamic Route that takes a year as an argument and returns the city created in that year. The problem with our current implementation is that it breaks when invalid data is sent on client requests. Let's add some basic validation.

var express = require('express');
var app = express();

app.param('year', function(request, response, next) { // Call a function that intercepts Dynamic Routes with the 'year' param.
    if (isYearFormat(request.params.year)) { // Inside of that function, use the isYearFormat() function to check whether the year parameter is in a valid format. If so, then move processing to the next function in the stack.
        next();
    }
    else {
        response.status(400).json("Invalid format for Year"); // If the year parameter is not in a valid format, then respond with a 400 HTTP status code and a JSON message 'Invalid Format for Year'.
    }

});

var citiesYear = {
    5000: 'Lotopia',
    5100: 'Caspiana',
    5105: 'Indigo',
    6000: 'Paradise',
    7000: 'Flotilla'
};

function isYearFormat(value) {
    var regexp = RegExp(/^d{4}$/);
    return regexp.test(value);
}

app.get('/cities/year/:year', function(request, response) {
    var year = request.params.year;
    var city = citiesYear[year];

    if (!city) {
        response.status(404).json("No City found for given year");
    }
    else {
        response.json("In " + year + ", " + city + " is created.");
    }
});

app.listen(3000);


// 3.10 Dynamic Routes IV 250 PTS
var express = require('express');
var app = express();

app.param('year', function(request, response, next) {
    if (isYearFormat(request.params.year)) {
        next();
    }
    else {
        response.status(400).json('Invalid Format for Year');
    }
});

var citiesYear = {
    5000: 'Lotopia',
    5100: 'Caspiana',
    5100: 'Indigo',
    6000: 'Paradise',
    7000: 'Flotilla'
};

function isYearFormat(value) {
    var regexp = RegExp(/^\d{4}$/);
    return regexp.test(value);
}

app.get('/cities/year/:year', function(request, response) {
    var year = request.params.year;
    var city = citiesYear[year];

    if (!city) {
        response.status(404).json("No City found for given year");
    }
    else {
        response.json("In " + year + ", " + city + " is created.");
    }

});

app.listen(3000);
// With the proper validations in place
// for the following code, what would the output be
// for a GET request to / cities / year / 500 ?

400 "Invalid Format for Year"
