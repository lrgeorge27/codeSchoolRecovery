Angular.js Level 1.1 Ramp Up
Front - end framework, helps organize JavaScript and works well with jQuery, creates fast websites
Client - side JavaScript Framework
for adding interactiviy to HTML.

Need to know:
    HTML, CSS, JavaScript

Nice to know:
    Automated testing
BDD - Behavior Driven Development
TDD - Test Driven Development

Responsivity - when the user clicks a link, after the page has been loaded, it refreshes only the code that is needed to run that link.

Directives:
    A marker on an HTML tag that tells AngularJS to run or reference some JS code

Download AngluarJS - angularjs.org, angular.min.js
Download Twitter Bootstrap - getbootstrap.com, bootstrap.min.css
// <link rel="stylesheet" type="text/css" href = "bootstrap.min.css"/>
// <script type="text/javascript" src= "angular.min.js"></script>

Modules:
    Where we write pieces of AngularJS application, keeps code encapsulated
Makes our code more maintainable, testable, and readable
Where we define dependencies
for our app, one module can use other modules(libraries)

Start with a module line inside an app.js file:
    var app = angular.module('store', []);
//Angular library, 'app name', [dependencies]

In HTML:
    // <html ng-app="store"> ng-app directive to run the module when doc loads, treats HTML as part of angularJS
    // <script type="text/javascript" src= "app.js"></script>

    Expressions:
    Allow you to insert dynamic values into your HTML
// <p>I am {{4 + 6}}</p> evaluates to <p>I am 10</p>
// <p>{{"Hello" + "you"}}</p> evaluates to <p>Hello you</p>
http: //docs.angularjs.org/guide/expression

    1.2 Creating a Store Module 230 PTS
The Flatlanders need a store to sell their gems and more!They need it really quick, Angular will do the trick!
        They have figured out how to manipulate time and space, allowing them to create three - dimensional gems.The buying and selling of their gems has become a popular Flatlander practice and they believe the next step is taking their wonderful wares to the fourth dimension(the web).
    Can you help them reach their online peddling goals ?

    Create a Module named gemStore so we can get started on this marketing journey.
Update the app.js file to create an Angular Module named gemStore.
var app = angular.module('gemStore', []);

Attach the gemStore module to our HTML page with a Directive.
In the index.html file, add the ng - app directive to the html tag. <
    html ng - app = "gemStore" >
    In index.html, create a simple Expression to display a friendly "Hello, Angular!"
message. <
    h1 > { { "Hello, Angular!" } }
<< < << << << < << < << << << << / h1 >

1.3 Index HTML Setup
Controllers:
    Controllers are where we define our apps behavior by defining functions and values(function() { //wrap js in a closure is best practice
        var app = angular.module('store', []);
        app.controller('StoreController', function() { //controller attached to (inside) our app
            //Name of controller must be CapitalCase and include the word 'controller' 
            //annonymus function stores the code that will be executed when 'StoreController' is called
            this.product = gem; //connect var gem to controller
        });

        var gem = {
            name: 'Dodecahedron',
            price: 2.95,
            description: '...',
        }
    })();

In HTML:
    <div ng-controller="StoreController as store">
<h1>{{store.product.name}}</h1>
<h2>{{store.product.price}}</h2>
<p>{{store.product.description}}</p>
</div>
//only have access to StoreController inside div

// 1.4 Our First Controller 130 PTS
// In order to add some behavior to our application, we need a controller.Add a controller named StoreController to our gemStore application.
// Add a controller named StoreController to our gemStore application.
// Create a controller named StoreController.
(function() {
    var gem = { name: 'Azurite', price: 2.95 };
    var app = angular.module('gemStore', []);
    app.controller('StoreController', function() {});
})();

// In app.js, we 've added a gem object to represent one of the products in our gemStore. Assign it to the product property of StoreController so we can use them in the page.
(function() {
    var gem = { name: 'Azurite', price: 2.95 };
    var app = angular.module('gemStore', []);
    app.controller('StoreController', function() {
        this.product = gem;

    });
})();

<< < << << << < << < <<!DOCTYPE html >
    <html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
// Attach the StoreController to the < body > tag.Be sure to alias it as store.
  <body ng-controller="StoreController as store"> 
    <div class="product row">
      <h3> //Display the name of the product inside the <h3> tag.
        {{store.product.name}}
        //Display the price of the product inside the <em> tag.
        <em class="pull-right">{{store.product.price}}</em>
      </h3>
    </div>
  </body>
</html>


    // 1.5 Built-in Directives
    // In HTML:
    <
    body ng - controller = "StoreController as store" >
    <div ng-repeat="product in store.products"> //iterate through array store.products, inside element print properties of each product in array.
    //<div ng-hide="store.product.soldOut"> //hide element when expression value is true.
<h1>{{store.product.name}}</h1>
<h2>{{store.product.price}}</h2>
<p>{{store.product.description}}</p>
<button ng-show="store.product.canPurchase"> Add to cart</button> 
//ng-show= will only show the element if the value of the Expression is true. 
</div> <
    /body>
// In app.js:
// var gem = [
{
    name: 'Dodecahedron',
    price: 2.95,
    description: '...',
    canPurchase: false,
    soldOut: true
}, {
    name: "Pentagonal Gem",
    price: 5.95,
    description: "...",
    canPurchase: false
}
];

Directives - HTML annotations that trigger JS behaviors
Modules - Where our application components live
Controllers - Where we add application behavior
Expressions - How values get displayed within the page


1.6 Not For Sale 250 PTS
We've added two new properties to our product that we can use on the HTML side. The first of these two is canPurchase, which is a boolean indicating if the product can be purchased. The second is soldOut which, as you can imagine, is a boolean indicating if the product is sold out.

Use these two new properties in our HTML page to solve the following objectives.
