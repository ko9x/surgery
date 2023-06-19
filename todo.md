### Current Focus
* Continue working on connecting the frontend to the endpoint
* We need to make sure every item has ranges for every config name
    * Make sure the ranges cover the entire range of the config from XX00001 to TX99999
        * We should prevent the user submitting the form unless all the data is correct
            * We should also ensure the data is correct before storing the information in the database. 
* Figure out how to hit an endpoint and see the database information in the response object on the front-end
* Test out sanctum/csrf-cookie route?
    * Not exaclty sure what this is
* Cleanup all unused routes and functions
    * Or at least comment them so we know why they are there

* Continue following the tutorial as necessary
    * https://www.twilio.com/blog/get-started-docker-laravel
        * I already created the ItemController but there will be stuff we reference going forward

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
