var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/coffeeshop';

//*******************************
// middleware

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
  secret: "ohsosecret",
  resave: false,
  saveUninitialized: false
}));
app.use(function(req,res,next) { // handles response variable for user session
  res.locals.currentUser = req.session.username;
  res.locals.userType = req.session.userType;
  next();
})

//********************************
// Controllers

var shopsController = require('./controllers/shops.js');
app.use('/shops', shopsController);
var drinksController = require('./controllers/drinks.js');
app.use('/drinks', drinksController);
var usersController = require('./controllers/users.js');
app.use('/users', usersController);

//*********************************
// Get home page
app.get('/', function(req, res) {
  res.render('index.ejs');
})

//***********************************

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('connected to mongo');
})

app.listen(port, function() {
  console.log("coffee listening on port " + port);
})
