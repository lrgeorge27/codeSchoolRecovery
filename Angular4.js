// AngularJS 4.1 Directives

// Writing Custom Directives
// Template-expanding Directive are the simplest: 
//     -define a custom tag or attribute that is expanded or replaced
//     -can include Controller logic, if needed
// Directives can also be used for:
//     -Expressing complex UI
//     -Calling events and registering event handlers
//     -Resuing common components

// 4.2 Refactoring Description Tab 140 PTS
// Notice that we have created an empty html file called product-description.html. Separate out the Description Tab's content into the new html file. Include the product-description.html in our index where it belongs.

// In product-description.html:
<h4>Description</h4>    // Separate out our description tab into product-description.html.
    <blockquote>{{product.description}}</blockquote>
//In index.html
<div ng-show="tab.isSet(1)" ng-include="'product-description.html'"> // Include product-description.html inside the description tab.
</div>                                  //need 'around index name' to be passed as a string

// 4.3 Creating an Element Directive 240 PTS
// Instead of using ng-include, lets create a custom directive called productDescription.

app.directive("productDescription", function(){ // Create an Element Directive for our Description div that includes the product-description.html.
    return {
      restrict: 'E', //E for element
      templateUrl: "product-description.html"
    };
  });


 <div > // Include the file on the page using a custom directive tag instead of ng-include.
    <product-description ng-show="tab.isSet(1)"></product-description>
 </div>
 
// 4.4 Creating an Attribute Directive 240 PTS
// As you probably have noticed, we have built out more information on the specs tab. Let's refactor the contents of our specs div into an attribute directive.

//In product-specs.html:
<h4>Specs</h4>
<ul class="list-unstyled">
              <li>
                <strong>Shine</strong>
                : {{product.shine}}</li>
              <li>
                <strong>Faces</strong>
                : {{product.faces}}</li>
              <li>
                <strong>Rarity</strong>
                : {{product.rarity}}</li>
              <li>
                <strong>Color</strong>
                : {{product.color}}</li>
            </ul> 
//In app.js:
app.directive("productSpecs", function(){ // Create a new attribute directive for our specs tag called productSpecs. Have it use our new product-specs.html template.
    return {
      restrict: "A", //A for attribute
      templateUrl: "product-specs.html"
    };
  });
  
//In index.html:
 <div product-specs ng-show="tab.isSet(2)"> // In index.html, use your new attribute directive to show the product specs.
 </div>
 
// 4.6 Refactoring Product Tabs 220 PTS
// We feel like the Product Tabs section could be better managed if it were a directive.
//In app.js
 app.directive('productTabs', function(){ // Create an element directive called productTabs.
    return{
      restrict: 'E',
      templateUrl: 'product-tabs.html', // Tell your new directive to use the product-tabs.html template with the templateUrl attribute.
      controller: function(){  // Give our productTabs directive all the tab functionality that is currently inside our TabController. Make sure that you do not delete the TabController yet. We don't want to break the site.
        this.tab = 1;
        
        this.isSet = function(checkTab){
          return this.tab === checkTab;
        };
        this.setTab = function(activeTab){
          this.tab = activeTab;
        };
      },
      controllerAs: 'tab'  // Add the controllerAs attribute to your directive setting it to tab so the directive knows what all the references to tab in product-tabs.html are.
    };
  });

//In product-tabs.html
// Put the tabs section inside of the provided product-tabs.html. Remove the ng-controller from the section inside the file once moved.
<section>
          <ul class="nav nav-pills">
            <li ng-class="{ active:tab.isSet(1) }">
              <a href ng-click="tab.setTab(1)">Description</a>
            </li>
            <li ng-class="{ active:tab.isSet(2) }">
              <a href ng-click="tab.setTab(2)">Specs</a>
            </li>
            <li ng-class="{ active:tab.isSet(3) }">
              <a href ng-click="tab.setTab(3)">Reviews</a>
            </li>
          </ul>

          <!--  Description Tab's Content  -->
          <div ng-show="tab.isSet(1)" ng-include="'product-description.html'">
          </div>

          <!--  Spec Tab's Content  -->
          <div product-specs ng-show="tab.isSet(2)"></div>

          <!--  Review Tab's Content  -->
          <product-reviews ng-show="tab.isSet(3)"></product-reviews>

        </section> 

//In index.html
// Now remove the product tabs section from index.html and the TabController from app.js.
// Use our new productTabs directive where the tabs section used to be in our index.html.
  <!-- Product Tabs  -->
        <product-tabs></product-tabs>

// 4.7 Refactoring Product Gallery 240 PTS
// Now that we've separated the Product Tabs, why not separate the Gallery too?

//In app.js
app.directive('productGallery', function(){  // Create an element directive called productGallery.
  return{
    restrict: 'E',
    templateUrl: 'product-gallery.html', // Tell your new directive to use the product-gallery.html template with the templateUrl attribute.
    controller: function(){  // Give our productGallery directive all the gallery functionality that is currently inside our GalleryController. Make sure that you do not delete the GalleryController yet. We don't want to break the site.
      this.current = 0;
      this.setCurrent = function(imageNumber){
          this.current = imageNumber || 0;
      };
    },
    controllerAs: 'gallery'  // Add the controllerAs attribute to your directive setting it to gallery so the directive knows what all the references to gallery in product-gallery.html are.
  };
});

//In product-gallery.html:
// Put the gallery div inside of the provided product-gallery.html. Remove the ng-controller from the div inside the file once moved.
<div ng-show="product.images.length">
   <div class="img-wrap">
      <img ng-src="{{product.images[gallery.current]}}" />
   </div>
      <ul class="img-thumbnails clearfix">
       <li class="small-image pull-left thumbnail" ng-repeat="image in product.images">
       <img ng-src="{{image}}" />
       </li>
      </ul>
</div> 

//In index.html:
// Now remove the image gallery div from index.html and the GalleryController from app.js.
// Use our new productGallery directive where the gallery div used to be in our index.html.
<product-gallery></product-gallery>



