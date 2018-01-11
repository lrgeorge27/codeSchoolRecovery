// 5.2 Route Instance 240 PTS
// Let's rewrite our cities routes using a Route Instance.


citiesRoute = app.route('/cities') // Create a new Route Instance for the '/cities' URL path and assign it to the citiesRoute variable.
citiesRoute.get(function(request, response) { // Move the code from our previous app.get() route to a new GET route on the citiesRoute object.
    if (request.query.search) {
        response.json(citySearch(request.query.search));
    }
    else {
        response.json(cities);
    }
});

// POST route for /cities
citiesRoute.post(parseUrlencoded, function(request, response) { // Move app.post() to citiesRoute.
    if (request.body.description.length > 4) {
        var city = createCity(request.body.name, request.body.description);
        response.status(201).json(city);
    }
    else {
        response.status(400).json('Invalid City');
    }
});

//refactoring further:
// Now, let's get rid of the citiesRoute temporary variable and use chaining function calls.
app.route('/cities') //remove the variable and the ; to create chaining commands 
    // GET route for /cities
    .get(function(request, response) {
        if (request.query.search) {
            response.json(citySearch(request.query.search));
        }
        else {
            response.json(cities);
        }
    }) //remove ;

    // POST route for /cities
    .post(parseUrlencoded, function(request, response) {
        if (request.body.description.length > 4) {
            var city = createCity(request.body.name, request.body.description);
            response.status(201).json(city);
        }
        else {
            response.status(400).json('Invalid City');
        }
    });

// Finally, let's move the old routes for the '/cities/:name' URL path to use the new Route Instance API.
app.route('/cities/:name') //remove ; to chain
    // GET route for /cities/:name
    .get(function(request, response) {
        var cityInfo = cities[request.cityName];
        if (cityInfo) {
            response.json(cityInfo);
        }
        else {
            response.status(404).json('City not found');
        }
    }) //remove ; to chain

    // DELETE route for /cities/:name
    .delete(function(request, response) {
        if (cities[request.cityName]) {
            delete cities[request.cityName];
            response.sendStatus(200);
        }
        else {
            response.sendStatus(404);
        }
    });

//5.3 Route Files
//extract routes to modules, move routes to a new file
//router is mounted in a particular root url
//dedicated folder just for routes
var express = require('express');
var router = express.Router(); //router instance, mounted as middleware
...
module.exports = router;

router.route('/') //root path is relative to where the path is mounted
router.route('/:name')
    .all(function(request, response, next) {}) //alternate for app.param

// 5.4 Using a Router Instance 240 PTS
// Let 's refactor app.js to use a Router object.

var router = express.Router(); // Create a new router object and assign it to the router variable.

router.route('/') // When we are done, our router will be mounted on the /cities path. With this in mind, change app.route('/cities') to use router and map requests to the root path.
    .get(function(request, response) {
        if (request.query.search) {
            response.json(citySearch(request.query.search));
        }
        else {
            response.json(cities);
        }
    })

    .post(parseUrlencoded, function(request, response) {
        if (request.body.description.length > 4) {
            var city = createCity(request.body.name, request.body.description);
            response.status(201).json(city);
        }
        else {
            response.status(400).json('Invalid City');
        }
    });

router.route('/:name') // Likewise, let's move our '/cities/:name' route to our router. Remember to update the path.
    .get(function(request, response) {
        var cityInfo = cities[request.cityName];
        if (cityInfo) {
            response.json(cityInfo);
        }
        else {
            response.status(404).json("City not found");
        }
    })

    .delete(function(request, response) {
        if (cities[request.cityName]) {
            delete cities[request.cityName];
            response.sendStatus(200);
        }
        else {
            response.sendStatus(404);
        }
    });

app.use('/cities', router); // Our router is now ready to be used by app. Mount our new router under the /cities path.

// 5.5 All HTTP Verbs 250 PTS
// What function would you call to match all HTTP verbs?
app.all()

    // 5.6 Using All 240 PTS
    // Let's use the app.all() method to handle the name parameter instead of app.param().

    .all(function(request, response, next) { // Add a call to all() for our router's '/:name' route. Pass a callback function that accepts request, response, and next.
        request.cityName = parseCityName(request.params.name); // Now let's take our logic from the callback function passed to app.param() and move it to our all() callback.
    })
// Now remove the original call to app.param().

// 5.7 Creating a Router Module 230 PTS
// Our single application file is growing too long. It's time we extract our routes to a separate Node module under the routes folder.

//routes/cities.js
var express = require('express');
// Move our router and its supporting code from app.js to routes/cities.js.
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var cities = {
    'Lotopia': 'Rough and mountainous',
    'Caspiana': 'Sky-top island',
    'Indigo': 'Vibrant and thriving',
    'Paradise': 'Lush, green plantation',
    'Flotilla': 'Bustling urban oasis'
};

var router = express.Router();

router.route('/')
    .get(function(request, response) {
        if (request.query.search) {
            response.json(citySearch(request.query.search));
        }
        else {
            response.json(cities);
        }
    })

    .post(parseUrlencoded, function(request, response) {
        if (request.body.description.length > 4) {
            var city = createCity(request.body.name, request.body.description);
            response.status(201).json(city);
        }
        else {
            response.status(400).json('Invalid City');
        }
    });

router.route('/:name')
    .all(function(request, response, next) {
        request.cityName = parseCityName(request.params.name);
    })

    .get(function(request, response) {
        var cityInfo = cities[request.cityName];
        if (cityInfo) {
            response.json(cityInfo);
        }
        else {
            response.status(404).json("City not found");
        }
    })

    .delete(function(request, response) {
        if (cities[request.cityName]) {
            delete cities[request.cityName];
            response.sendStatus(200);
        }
        else {
            response.sendStatus(404);
        }
    });

// Searches for keyword in description
// and returns the city
function citySearch(keyword) {
    var regexp = RegExp(keyword, 'i');
    var result = cities.filter(function(city) {
        return city.match(regexp);
    });

    return result;
}
// Adds a new city to the
// in memory store
function createCity(name, description) {
    cities[name] = description;
    return name;
}

// Uppercase the city name.
function parseCityName(name) {
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
}

module.exports = router; // export our router object so other files can have access to it. Remember, Node - therefore Express - uses the CommonJS module specification.


//app.js
var express = require('express');
var app = express();

var router = require('routes/cities.js'); // Our cities routes module is now ready to be used from app.js. Require the new routes/cities module from app.js and assign it to a variable called router;

// In memory store for the
// cities in our application



app.use('/cities', router);
app.listen(3000);
