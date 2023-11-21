module.exports = function(app, shopData) {

    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });
    app.get('/search-result', function (req, res) {
        //searching in the database
        let sqlquery = "SELECT * FROM books WHERE name LIKE"+"'%"+req.query.keyword+"%'"; // query database the keyword where it searches for 
        //if the name of the book contains a specific keyword
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); // redirects to the home page if the query fails 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result}); // creates a new object avaliableBooks which uses
            // result to store an array of books
            res.render('search-result.ejs', newData);
         });
    });
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });                                                                                                 
    app.post('/registered', function (req,res) {
        // saving data in database and outputting it to the screen
        let addquery = "INSERT INTO users(first_name,last_name,email) VALUES" + "('" + req.body.first + "','" + req.body.last + "','" + req.body.email +"');"; 
        // adds a user's details to the database
        db.query(addquery, (err, result) => {
            if (err) {
                return console.error(err.message); // returns an error message if the query fails
             }else{
                res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email); 
                // Output lets us know that the user has been successfully added to the database
             }
        });                                                                 
    });
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');  // redirects to the home page if the query fails 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});// creates a new object avaliableBooks which uses
            // result to store an array of books
            res.render('list.ejs', newData);
         });
    });
    app.get('/addbook', function (req,res){
        res.render('addbook.ejs',shopData);
    });
    app.post('/bookadded', function (req,res){
        let addquery = "INSERT INTO books (name,price) VALUES" + "('" + req.body.book_name +"',"+req.body.price+");"; // adds a book to the database
        db.query(addquery, (err, result) => {
            if (err) {
                return console.error(err.message); // returns an error message if the query fails
             }
            else {
                // Output lets the user know that the book has been added to the database
                res.send('Your book ' +'"' + req.body.book_name + '"' + ' for £' +req.body.price + ' has been added to our list.');
             }
        });
    });
    app.get('/bargain', function(req, res) {
        let sqlquery = "SELECT * FROM books WHERE price<20.00"; // query database to get all the books where the price is below 20
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');  // redirects to the home page if the query fails 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});// creates a new object avaliableBooks which uses
            // result to store an array of books
            res.render('bargain.ejs', newData);
        });
    }); 
}
