var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//*******************************
// middleware

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

//********************************
// Controllers

var shopsController = require('./controllers/shops.js');
app.use('/shops', shopsController);
var drinksController = require('./controllers/drinks.js');
app.use('/drinks', drinksController);

//*********************************
// Get home page
app.get('/', function(req, res) {
  res.render('index.ejs');
})

//***********************************

mongoose.connect('mongodb://localhost:27017/coffeeshop');
mongoose.connection.once('open', function() {
  console.log('connected to mongo');
})

app.listen(3000, function() {
  console.log("coffee listening");
})
