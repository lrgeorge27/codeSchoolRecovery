// AngularJS 2.1 Filters and New Directives

// Directives
// ng-app - attaches the Application Module to the page
// <html ng-app="store">

// ng-controller - attaches a Controller function to page
// <body ng-controller="StoreController as store">

// ng-show / ng-hide - displays a section based on an Expression
// <h1 ng-show="name"> Hello, {{name}}!</h1>

// ng-repeat - repeat a section for each item in an Array
// <li ng-repeat="product in store.products"> {{product.name}} </li>

<body ng-controller="StoreController as store"> 
    <ul class="list-group">
    <li class="list-group-item">
      <h3> //Display the name of the product inside the <h3> tag.
        {{product.name}}
        //Display the price of the product inside the <em> tag.
        <em class="pull-right">{{product.price | currency}}</em> // | currency is a filter
      </h3>
    </li>
    </ul>
  </body>
  
Filters, use a pipe
Pipe | Take the output from the first expression and "send the output into" the filter

{{data | filter: options}}
Currency - set $ and 2 decimal places
{{price | currency}} --> $2.00

date - 
{{'138812341233' | date: 'MM/dd/yyyy @ h:mma'}} --> 12/27/2013 @ 12:50 AM

uppercase & lowercase
{{'octagon gem' | uppercase}} --> OCTAGON GEM

limitTo - set a limit on the characters displayed
{{'My Description' | limitTo: 8}} --> My Descr
<li ng-repeat = "product in store.products | limitTo:3"> --> shows first 3 items in array

orderBy - sorts products by ascending (orderBy:'price') or descending (orderBy:'-price') order
<li ng-repeat="product in store.products | orderBy:'-price'"> --> sorts by descending price

Adding an Image Array:
var gem = [
{ name: 'Dodecahedron',
            price: 2.95,
            description: '...',
            images: [  //New Array
            {   //image object
             full: 'dodecahedron-01-full.jpg',
             thumb: 'dodecahedron-01-thum.jpg'
            },
            {
             full: 'dodecahedron-02-full.jpg',
             thumb: 'dodecahedron-02-thum.jpg'
            }
            ]    
}
]
To display the first image {{product.image[0].full}}
Must use ng-src directive to print image, or browser tries to load image before Expression evaluates
<img ng-src="{{product.image[0].full}}"/>

2.2 Using filters 250 PTS
In the previous challenge we practiced displaying the prices of gems in our index.html. The first gem, Azurite, now costs $110.50 (due to supply shortages) but our current code doesn't display the price correctly.
Use an Angular filter to display the price as a currency.
 <em class="pull-right">{{product.price | currency}}</em>

2.3 Displaying the First Image 150 PTS
We've added images to all products as well – like any self respecting store should have. A product has an array of images we can use in our HTML. Let's get the first image to show on the page!
We want to display the first full-sized image for each product. Can you figure out how?
      <img ng-src="{{product.images[0]}}" />

2.4 Display All Thumbnails 140 PTS
Our 2-dimensional clients have worked hard to produce multiple images for their gems. Display all the thumbnails inside our gallery without repeating yourself by using an AngularJS directive on the li.thumbnail element.
Make the li's repeat for each image in the image array. Use the variable image as your identifier.
 <li class="small-image pull-left thumbnail" ng-repeat="image in product.images" >
 
Now that we have image available from our ng-repeat let's replace the product.images[0] with it.
<img ng-src="{{image}}" /> //uses "image" as variable

2.5 No Images, No Gallery 150 PTS
Many times a product will be ready to sell, but won't have images yet (like our first one). In this case the images array will just be empty. Note the change in our gems array.
We don't want to display the .gallery element if there are no images. Create an expression on our .gallery div to make this happen.
Use the ng-show directive to make sure our image gallery is only displayed if a product has images.
 <div class="gallery" ng-show="product.images.length >0">

2.6 Tabs Inside Out
Use twitter bootstrap classes to create tabs and directives to make them interactive
ng-click - assigns a a value to tab
<section> 
    <ul class="nav nav-pills">
        <li> <a href ng-click="tab = 1"> Description </a> </li>
        <li> <a href ng-click="tab = 2"> Specifications </a> </li>
        <li> <a href ng-click="tab = 3"> Reviews </a> </li>
    </ul>
    {{tab}} //prints value to screen, expression automatically updated on click
</section>

Expressions define a 2-way Data Binding - expressions are re-evaluated when a property changes

Tab content panels

<div class="panel" ng-show="tab === 1"> //show the panel if the # matches the {{tab}} expression
    <h4>Description</h4>
    <p>{{product.description}}</p>
</div>
<div class="panel" ng-show="tab === 2">
    <h4>Specifications</h4>
    <blockquote> None yet </blockquote>
</div>
<div class="panel" ng-show="tab === 3">
    <h4>Reviews</h4>
    <blockquote> None yet </blockquote>
</div>

Set an Active Class - determine which tab is active and add class to it

<section ng-init="tab = 1"> ng-init - allows evaluation of an expression in the current scope
    <ul class="nav nav-pills">
        <li ng-class="{active:tab===1}"> "{name of class to set: Expression to evaluate}", if true, set class, otherwise do nothing
            <a href ng-click="tab = 1"> Description </a> 
        </li>
        <li ng-class="{active:tab===2}"> 
            <a href ng-click="tab = 2"> Specifications </a> 
        </li>
        <li ng-class="{active:tab===3}"> 
            <a href ng-click="tab = 3"> Reviews </a> 
        </li>
    </ul>
</section>

Pull logic into a Controller:
Create a Panel Controller in app.js
app.controller("PanelController", function(){
    this.tab = 1; //make tab a property of the panel --> panel.tab
                // 1 - tab initialization

    this.selectTab = function(setTab){ //assignment for tab
        this.tab = setTab; //setTab property equal to variable, call selectTab(setTab) on tab link setTab = #value
    };
    this.isSelected = function(checkTab){ //comparison 
        return this.tab === checkTab; //is the current tab equal to this tab
    };
});

In HTML:
<section ng-controller="PanelController as panel">
    <ul class="nav nav-pills">
        <li ng-class="{active:panel.isSelected(1)}"> "{name of class to set: Expression to evaluate}", if true, set class, otherwise do nothing
            <a href ng-click="panel.selectTab(1)"> Description </a> 
        </li>
        <li ng-class="{active:panel.isSelected(2)}"> 
            <a href ng-click="panel.selectTab(2)"> Specifications </a> 
        </li>
        <li ng-class="{active:panel.isSelected(3)}"> 
            <a href ng-click="panel.selectTab(3)"> Reviews </a> 
        </li>
    </ul>
    <div class="panel" ng-show="panel.isSelected(1)"> //show the panel if the # matches the {{tab}} expression
        <h4>Description</h4>
        <p>{{product.description}}</p>
    </div>
    <div class="panel" ng-show="panel.isSelected(2)">
        <h4>Specifications</h4>
        <blockquote> None yet </blockquote>
    </div>
    <div class="panel" ng-show="panel.isSelected(3)">
        <h4>Reviews</h4>
        <blockquote> None yet </blockquote>
    </div>
</section>

2.7 Tabs Inside Out 220 PTS
We just learned that cramming a bunch of logic into our HTML is kinda bad. Let's start the Right Way with a Controller which will control our tabs.
Create a controller named TabController.
    app.controller('TabController', function(){});

An empty Controller isn't much use. Do you remember why we needed a Controller at all? That's right, we need to initialize the tab property. Go ahead and add that property now, setting it to 1.
 app.controller('TabController', function(){
    this.tab = 1;
  });

In order to set the current tab, we'll need a setTab method to use in our HTML. It should set the tab property of TabController to a value passed in.
    app.controller('TabController', function(){
    this.tab = 1;
    this.setTab = function(selectedTab){
      this.tab = selectedTab;
    };
  });
  
We've got a setTab method. Now we need an isSet method that accepts a value and returns whether that value matches this.tab.
app.controller('TabController', function(){
    this.tab = 1;
    this.setTab = function(selectedTab){
      this.tab = selectedTab;
      };
     this.isSet = function(checkTab){
       return this.tab === checkTab;
    };
  });
  
2.8 Using TabController 100 PTS
To connect our controller to our page, we're going to need a few directives. Try to figure out which ones to use, but if you get stuck we'll give you hints along the way. We've provided all the HTML for you. Try to accomplish the following tasks:
Attach the TabController to the <section> element with the .tab class. Don't forget to also add an alias.
Trigger the setTab method when a link inside a tab is clicked. Add this to each of the tab links. Pass in the number of the tab, in this case 1, 2 or 3.
Use the isSet method to show the corresponding tab. You'll need to add a directive to each of the <div> elements in .tab.
Add the active class to the correct <li> when each tab is clicked. You'll need to add a directive to each <li> in .nav.
Within the Description tab, output the product's description within the <blockquote> element.
<section class="tab" ng-controller="TabController as tab">
        <ul class="nav nav-pills">
          <li ng-class="{active: tab.isSet(1)}">
            <a href ng-click="tab.setTab(1)">Description</a></li>
          <li ng-class="{active: tab.isSet(2)}">
            <a href ng-click="tab.setTab(2)">Specs</a></li>
          <li ng-class="{active: tab.isSet(3)}">
            <a href ng-click="tab.setTab(3)">Reviews</a></li>
        </ul>
        <div ng-show="tab.isSet(1)">
          <h4>Description</h4>
          <blockquote>{{product.description}}</blockquote>
        </div>
        <div ng-show="tab.isSet(2)">
          <h4>Specs</h4>
          <blockquote>Shine: {{product.shine}} </blockquote>
        </div>
        <div ng-show="tab.isSet(3)">
          <h4>Reviews</h4>
          <blockquote></blockquote>
        </div>
      </section>

2.9 Creating Gallery Controller 150 PTS
Now that you're such a whiz with tabbed tab, can you apply what you've learned to our image gallery, too? Don't worry, we'll start slow… And there's a lot more in common than you might think!
Let's start with a Controller, just like last time. Call it GalleryController.
Initialize a current property of GalleryController with a value of 0.
Add a method to GalleryController called setCurrent that accepts a value and assigns it to current. If no value is passed in, set current to 0.

app.controller('GalleryController', function(){
    this.current = 0;
    this.setCurrent = function(value){
      this.current = value || 0;
    };
  });

2.10 Using Gallery Controller 140 PTS
Now that we've got an awesome GalleryController, let's wire it up to the page:
Attach GalleryController to the .gallery element that wraps our gallery; use the alias gallery.
Change the first ng-src directive to use the current property. Properly use current as the index instead of 0.
<div class='gallery' ng-controller="GalleryController as gallery">
        <img ng-src="{{product.images[gallery.current]}}" />
        







