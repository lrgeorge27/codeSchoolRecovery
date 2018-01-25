// AngularJS 3.1 Forms and Models

// ng-model - binds the form element value to the property

// 3.2 Displaying Reviews should seem repetitive 140 PTS
// We added reviews to all the products, as you can see in the js file. Inside our Reviews tab display ALL the reviews for a product. Make sure you show the reviews body, author, and stars.

  <li ng-repeat="review in product.reviews"> //You need to create multiple li's for each review that exists.
                <blockquote>
                  <strong>{{review.stars}} Stars</strong> //Set the blockquote stars ( strong tag) to the review stars.
                  {{review.body}} //Add the review body between the strong & cite tags.
                  <cite class="clearfix">—{{review.author}}</cite> //Set the cite to the review author.
                </blockquote>
              </li>

// 3.3 Create a Review Form 240 PTS
// We have provided a form below the list of reviews and a preview blockquote that will show when the form is being filled out. Add ng-model to each input item stars, body, and author. Remember, each one is a part of the review object as a whole.              
// Set the cite to the review author.
// <!--  Review Form -->
              <h4>Submit a Review</h4>
              <fieldset class="form-group">
                <select ng-model="review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]"  title="Stars"> 
                //Use ng-model for review.stars select form field.
                  <option value="">Rate the Product</option>
                </select>
              </fieldset>
              <fieldset class="form-group">
                <textarea ng-model="review.body" class="form-control" placeholder="Write a short review of the product..." title="Review"></textarea>
                //Use ng-model for review.body for the forms textarea.
              </fieldset>
              <fieldset class="form-group">
                <input type="email" ng-model="review.author" class="form-control" placeholder="jimmyDean@example.org" title="Email" />
                //Use ng-model for review.author – the email field.
              </fieldset>
              <fieldset class="form-group">
                <input type="submit" class="btn btn-primary pull-right" value="Submit Review" />
              </fieldset>
            </form>
            
// 3.4 Review Live Preview! 130 PTS
// Display all three parts of the review in the preview blockquote.
<!--  Live Preview -->
     <blockquote>
        <strong>{{review.stars}} Stars</strong>// In the strong tag, before Stars, put in the right expression to display review.stars. Keep the space prior to Stars
        {{review.body}} // On the blank line with no tags put in the right expression to display review.body
        <cite class="clearfix">-{{review.author}}</cite> //// In the cite tag, immediately after the -, put in the right expression to display review.author.
     </blockquote>

// 3.6 Creating Review Controller 230 PTS
// Create a ReviewController and inside of it an empty review ripe for the stuffing! Then below that create the functionality to create new reviews.            

 app.controller('ReviewController', function(){ // Create a new controller called ReviewController. We'll pass in the product we want to review to our addReview function. Edit your function declaration to accept a product parameter.
    this.review = {}; // Set our review variable to an empty object when the ReviewController is created.
    this.addReview = function(product){ // Create an empty function named addReview in your ReviewController.
      product.reviews.push(this.review); // When addReview is called with a product, it should add the review from the controller to the passed-in product's reviews array. Implement this functionality in the addReview method.
      this.review = {}; // Reset the review to an empty object after it's been added to product.reviews.
    };
  });
  
// 3.7 Using Review Controller 140 PTS
// Assign the review controller we just created to our form and use the alias reviewCtrl to reference it inside the form. On submission of the form save the new review.
  <form name="reviewForm" ng-controller="ReviewController as reviewCtrl" ng-submit="reviewCtrl.addReview(product)"> // Inside the form tag create a ng-controller attribute and assign it to the ReviewController with an alias of reviewCtrl. Inside the form tag create a ng-submit attribute. Set the value of the ng-submit attribute to call our new addReview function. Remember to pass in product when calling the addReview function.
              <!--  Live Preview -->
              <blockquote> // If you will notice, our live preview is no longer working. Try and figure out why and get the preview blockquote working again! Add reviewCtrl to {{}}
                <strong>{{reviewCtrl.review.stars}} Stars</strong>
                {{reviewCtrl.review.body}}
                <cite class="clearfix">—{{reviewCtrl.review.author}}</cite>
              </blockquote>

              <!--  Review Form -->
              <h4>Submit a Review</h4>
              <fieldset class="form-group">
                <select ng-model="reviewCtrl.review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]" title="Stars">
                // Prefix all three ng-models with the controller's alias.
                  <option value="">Rate the Product</option>
                </select>
              </fieldset>
              <fieldset class="form-group">
                <textarea ng-model="reviewCtrl.review.body" class="form-control" placeholder="Write a short review of the product..." title="Review"></textarea>
                // Prefix all three ng-models with the controller's alias.

              </fieldset>
              <fieldset class="form-group">
                <input ng-model="reviewCtrl.review.author" type="email" class="form-control" placeholder="jimmyDean@example.org" title="Email" />
                // Prefix all three ng-models with the controller's alias.
              </fieldset>
              <fieldset class="form-group">
                <input type="submit" class="btn btn-primary pull-right" value="Submit Review" />
              </fieldset>
            </form>

// 3.9 Form Validation 130 PTS
// Use the fancy directives you just learned to validate the new review form.

<!--  Review Form -->
            <form name="reviewForm" ng-controller="ReviewController as reviewCtrl" ng-submit="reviewForm.$valid && reviewCtrl.addReview(product)" novalidate> // Turn off default HTML validation.
                                                                                        // Prevent the submit if not $valid. --> Add formName.$valid to validate
              <!--  Live Preview -->
              <blockquote >
                <strong>{{reviewCtrl.review.stars}} Stars</strong>
                {{reviewCtrl.review.body}}
                <cite class="clearfix">—{{reviewCtrl.review.author}}</cite>
              </blockquote>

              <!--  Review Form -->
              <h4>Submit a Review</h4>
              <fieldset class="form-group">
                <select ng-model="reviewCtrl.review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]" title="Stars" required> // Mark stars & author as required fields.
                  <option value="">Rate the Product</option>
                </select>
              </fieldset>
              <fieldset class="form-group">
                <textarea ng-model="reviewCtrl.review.body" class="form-control" placeholder="Write a short review of the product..." title="Review"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input ng-model="reviewCtrl.review.author" type="email" class="form-control" placeholder="jimmyDean@example.org" title="Email" required/> // Mark stars & author as required fields.
              </fieldset>
              <fieldset class="form-group">
                <div>reviewForm is {{reviewForm.$valid}}</div>
                <input type="submit" class="btn btn-primary pull-right" value="Submit Review" />
              </fieldset>
            </form>

// 3.10 Form Styling 240 PTS
// Give the defined classes in your css colors. See the magic of ng-invalid/ng-valid at work!

//In CSS:
.ng-invalid.ng-dirty { // For elements with both the .ng-invalid and .ng-dirty classes, give the border-color of red.
    border-color: red;
}
.ng-valid.ng-dirty {    // For ng-valid && ng-dirty, give a green border-color.
    border-color: green;
}

// 3.11 Showing CreatedOn Date 230 PTS
// It's time to show when a review was created using the createdOn property. Follow the task below to add this in.

this.addReview = function(product){
      this.review.createdOn = Date.now(); // Upon saving a review, we're running the addReview function in our app.js JavaScript file. Before the review is pushed onto the array, add to this.review a new property createdOn with a value Date.now().
      product.reviews.push(this.review);
      this.review = {};
    };
    
<cite class="clearfix">—{{review.author}} on {{review.createdOn | date}}</cite> // In the review template, we're already displaying most of the information about our review. Add the createdOn date to the review within the cite element. We want it to say "-<Author> on <date>".
// Use the date filter on the createdOn property in the template.

