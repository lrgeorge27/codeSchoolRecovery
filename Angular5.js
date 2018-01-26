// 5.2 Refactoring into a Module 130 PTS
// After that we will need a way to encapsulate our directives in order to give our app access to them. We can use a module to do this! It is time for Module inception! There is a new js file provided for you — products.js; extract all store directives(descriptions, specs, reviews, title, gallery, and tabs) and paste them inside this new file. Then create a new module that we will make our original gemStore module require as a dependency.

//In app.js:
 var app = angular.module('gemStore', ['store-directives']); // Give gemStore Module access to the directives by adding a dependency to gemStore's definition.

//In products.js:
// Move the Directive definitions from app.js into products.js.
(function() {
  var app = angular.module('store-directives', []); // Create a new Module named store-directives to encapsulate our store Directives.
   app.directive("productDescription", function() {
    return {
      restrict: 'E',
      templateUrl: "product-description.html"
    };
  });

  app.directive("productReviews", function() {
    return {
      restrict: 'E',
      templateUrl: "product-reviews.html"
    };
  });

  app.directive("productSpecs", function() {
    return {
      restrict:"A",
      templateUrl: "product-specs.html"
    };
  });

  app.directive("productTabs", function() {
    return {
      restrict: "E",
      templateUrl: "product-tabs.html",
      controller: function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };
      },
      controllerAs: "tab"
    };
  });

  app.directive("productGallery", function() {
    return {
      restrict: "E",
      templateUrl: "product-gallery.html",
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber){
          this.current = imageNumber || 0;
        };
      },
      controllerAs: "gallery"
    };
  });

})();

//In index.html:
// Link in the new products.js file.
<script type="text/javascript" src="products.js"></script>

// 5.3 Services
// Built-in Services:
// $http - fetches JSON data from a web service
// $log - logs messages to the JS console
// $filter - filter an array

// 5.4 Built-in AngularJS Services 120 PTS
// We can use the built-in $http Service to make requests to a server (or in our case a json file). Give our StoreController access to the products using a service.

 app.controller('StoreController',['$http', function($http){  // Inject the $http service into our StoreController.
    var store = this;
    store.products = [];
    // get the store-products.json using the $http Service.
    $http.get('/store-products.json').success(function(data){ // Attach a success to our get call. Name the first parameter of the success function data.
      store.products = data; // Give our StoreController access to the products by setting products equal to the data given to us with the http service's success promise.
      });
  }]);