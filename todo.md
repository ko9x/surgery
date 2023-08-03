### Current Focus
* Continue making sure exceptions are after the ends_at or before the starts_at number
    * Is this completely necessary?
    * Add an alert that explains what an exception is?
* Make a login form
    * Once the user is logged in they will have access to the information view, the itemForm view and the manageItems view
* The information page will be the default page with a button that says "Login"
    * Once a user is logged in, show a header that has the buttons for the other views and a logout button
* Secure the route to the itemForm and the manageItems view
* Validate the item information here on the backend before storing it to the database
    * Make sure all the ranges are covered and that sort of thing
* Fix the styling and functionality for small screens for all views
    * The manage items view user a hover to show the buttons for desktop.
        * We will need to check if the user is on mobile and then add a click listener instead
    * The links to go to the other pages don't work on mobile because they use localhost not the ip address
        * The database also cannot be accessed on mobile because the api uses localhost not the ip address
            * This won't be an issue once the app is on the server

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
* Make a manageItems view
    * Create a function in the APIService that will return the name of all the items in the database
        * Run the createBottomResultsArea function for each item that is returned
            * Add a button to each item that will return the item id
    * Create a function in the APIService that will send the id of the selected item to the backend to be removed
    * Make sure removing an item removes all the associated ranges and exceptions
    * Show a confirm popup that tells the user that removing an item cannot be undone
    * Create a function in the APIService that will send the id and new name to the backend edit the name
    * Show an alert that says the name has been updated
