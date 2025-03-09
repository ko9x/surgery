### Current Focus
* Test all the functions!
    * Some stuff on the server may still be broken from trying to get this working
* Create an easy way to activate and deactivate the item form and manage page
    * Also remove the links from the information page.
* Enter some known good cut-ins and make a database file backup
    * Test that the backup can be pushed while the app is on the server
        * Then enter all the know good cut-ins and create a backup to push to the server
            * also email it to myself and maybe Blake and Cristian just so there are lots of failsafes
* Figure out how to backup the remote app on github
* Make some notes about what we did to get the app working on the remote server
    * Make them here in the todo/readme and on MyNotes if it seems necessary
        * Note about how the alias made the api impossible to hit
        * Anything else?
* Clean up the config file and maybe try adding the other web pages back like My Notes

### What to do later
* Validate the item information here on the backend before storing it to the database
    * Make sure all the ranges are covered and that sort of thing
* Fix the styling and functionality for small screens for all views
    * The manage items view user a hover to show the buttons for desktop.
        * We will need to check if the user is on mobile and then add a click listener instead
* Secure the route to the itemForm and the manageItems view
    * For now we are going to do this by commenting out the path that hits the item form and manage items pages
* Make a login form
    * Once the user is logged in they will have access to the information view, the itemForm view and the manageItems view
    * The information page will be the default page with a button that says "Login"
    * Once a user is logged in, show a header that has the buttons for the other views and a logout button
* Make sure all @DEBUG tags are addressed and removed
* Cleanup all unused routes and functions
    * Or at least comment them so we know why they are there
* Test out sanctum/csrf-cookie route?
    * Not exaclty sure what this is
* Fix the "issues" in the console. They are not errors just stuff like, all the inputs need a name attribute even though it never gets used.
* Streamline the form
    * Each config should just be one card 
    * Each card will have the following
        * the cut-in serial number
        * pre cut-in description
            * exception button to add the pre cut-in description to a specific serial number
        * post cut-in description
            * exception button to add the post cut-in description to a specific serial number
    * Add a button somewhere that allows the user to use the same description for all the pre or post fields.

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
* Add advanced form funcitonality
* Test the findAndFillSibling funciton work with intermediate ranges including exceptions
* Test the advanced form functionality
    * Add a pop-up when user presses add intermediate range button warning them to enter serials accurately?
* Figure out how to wire up the remote database
