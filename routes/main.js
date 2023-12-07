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
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email); 
        // Output lets us know that the user has been successfully added to the database                                                               
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
    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return console.error(err.message);
            // There is an error message to inform us if there has been a problem with adding the book
            // to the database
          }
          else {
            res.send(' This book is added to database, name: '
                      + req.body.name + ' price '+ req.body.price);
            // Message to verify that the book has been added to the database
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
