var express = require('express');
var User = require('../models/users.js');
var router = express.Router();

//*************************
// Gets

// Sign-in page
router.get('/', function(req, res) {
  res.render('users/signin.ejs');
})

//***********************
// Post
router.post('/', function(req, res) {
  res.redirect('/');
})

module.exports = router;

//***********************
// seed user db
router.get('/seed/users', function( req,res) {
  var corp = {
    username: "Mark",
    password: "Mark",
    type: "corp"
  };

  User.create(corp, function(err) {
    console.log("SEED: user created");
    res.redirect('/');
  })
})
