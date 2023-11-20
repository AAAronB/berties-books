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
        let sqlquery = "SELECT * FROM books WHERE name="+'"'+req.query.keyword+'"'; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            res.send(result)
         });
    });
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });                                                                                                 
    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    });
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render('list.ejs', newData);
         });
    });
    app.get('/addbook', function (req,res){
        res.render('addbook.ejs',shopData);
    });
    app.post('/bookadded', function (req,res){
        let addquery = "INSERT INTO books (name,price) VALUES" + "('" + req.body.book_name +"',"+req.body.price+");";
           db.query(addquery, (err, result) => {
             if (err) {
               return console.error(err.message);
             }
             else {
                res.send('Your book ' +'"' + req.body.book_name + '"' + ' for £' +req.body.price + ' has been added to our list.');
             }
           });

    });


 
}
