var express  = require('express');
var mongoose = require('mongoose');
require('dotenv').config();

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGODB_URI);

// DEFINE MODEL
var Books = require('./models/books');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/react', function(request, response) {
  response.render('pages/react');
});

// GET ALL BOOKS
app.get('/books', function(req,res){
  Books.find(function(err, books){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(books);
  });
});

app.listen(app.get('port'), function() {
  console.log( process.env.MONGODB_URI )
  console.log('Node app is running on port', app.get('port'));
});