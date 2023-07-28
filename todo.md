### Current Focus
* Make a login form
    * Once the user is logged in they will have access to the information view, the itemForm view and the removeItem view
        * Make a header so we can switch between them quickly and easily
* Make a removeItem view
    * Make sure removing an item removes all the associated ranges and exceptions
* Secure the route to the itemForm and the RemoveItem view
* Validate the item information here on the backend before storing it to the database
    * Make all the ranges are covered and that sort of thing
* Fix the styling for small screens for all views

### What to do later
* Cleanup all unused routes and functions
    * Or at least comment them so we know why they are there
* Test out sanctum/csrf-cookie route?
    * Not exaclty sure what this is

### Done
* Track this project with GitHub!
    * Set it up in Source Tree!
* Set up Sequel Pro to show this database
* Figure out how to view endpoint paths for storage
    * I remember Blake would do some command in terminal that showed a list of routes
        * `Answer:` inside the php-apache container run this command `php artisan route:list`
* Get postman working so we can test what the endpoints do
* Figure out what the api url is so we can hit endpoints that say something like api/item/{item}
    * `Answer:` http://localhost:8080/
        * For example: If you want to hit the ItemController its `http://localhost:8080/api/item`
            * The route list command tells you the `api/item` 
* Use Postman to add some data to the item table
    * This will require setting up the ItemController to interact with the table
        * Currently it just has some functions we wrote to test stuff with Postman
* Create BreakPointController
* Set up the database tables
    * The items table has already been created and I think it should work as is
    * The break-points table still needs to be created
        * We need to add the relationship between the items and the breakpoints to their models
            * Refer to the NoteWorty laravel project to see how this is done
* Figure out how to attach the range with the correct item.id AND name to the correct item object
* Create an endpoint where we get all the items and an array of ranges where the config name matches the config passed in
        * The array of ranges should be attached to each item
            * So {items: {id: 1, ranges: []}, {id:2, ranges: []}} etc...
* We need to be able to hit an endpoint with an object and have all the data get placed in the correct portion of the database
* Create exceptions table
    * Make sure it is added as part of the object that is sent to the front end
* Figure out how to hit an endpoint and see the database information in the response object on the front-end
* Continue working on connecting the frontend to the endpoint
* We need to make sure every item has ranges for every config name
    * Make sure the ranges cover the entire range of the config from XX00001 to TX99999
        * We should prevent the user submitting the form unless all the data is correct
* Separate the information view js and the form view js into seprate js files
    * Make a third js file with all the stuff both views can share
        * Then import that stuff into each file as needed
* Remove all the information view stuff from the itemForm blade
* Remove all the itemForm view stuff from the information blade
            