// import or rquire library
const express = require('express');
const mysql      = require('mysql');
var app = express();

// express configuration
app.set('view engine', 'ejs');

// database connection peramiters
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'expressdb'
});


// check the connection 
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });


// db.connect();
app.get('/', function(req, res){
    db.connect();
    db.query('SELECT * FROM movie', function (error, results, fields) {
        if (error){ throw error;}
        console.log(results);
        res.render('index',{data:results});
    });
     db.end();
});



app.listen(3000,function(){
    console.log("server linsning on port 3000")
});