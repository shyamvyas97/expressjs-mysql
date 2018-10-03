// import or rquire library
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
var app = express();

// express configuration
app.set('view engine', 'ejs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// database connection peramiters
const db = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'expressdb',
  multipleStatements: true,
  debug    : false
});

// root route show all movies.
app.get('/', function(req, res){
    db.query('SELECT * FROM movie', function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
        res.render('index',{data:results});
    });
});

// show movie insert form.
app.get('/insert', function(req, res){
  res.render('insert');
});

// instert data in movie table.
app.post('/insert', function(req, res){
  db.query("INSERT INTO movie(name, year, rating) VALUES (?,?,?)",[req.body.name,req.body.year,req.body.rating],function (error, results, fields) {
    if (error) throw error;
    res.redirect('/');
  });
});

// edit data from table.
app.get('/edit/:id',function(req,res){
  db.query("SELECT * FROM movie WHERE id=?",[req.params.id],function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.render('edit',{data:results});
  });
});

// update movie table.
app.post('/edit',function(req,res){
  db.query("UPDATE movie SET name=?,year=?,rating=? WHERE id=?",[req.body.name,req.body.year,req.body.rating,req.body.id],function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.redirect('/');
  });
});

// delete data from table.
app.get('/delete/:id',function(req,res){
  db.query("DELETE FROM movie WHERE id=?",[req.params.id],function (error, results, fields) {
    if (error) throw error;
    res.redirect('/');
  });
});

// api routes

// return all records as json
app.get('/api',function(req,res){
  db.query('SELECT * FROM movie', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(3000,function(){
    console.log("server linsning on port 3000")
});