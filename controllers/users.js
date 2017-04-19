var express = require('express');
var bcrypt = require('bcrypt');
var User = require('../models/users.js');
var router = express.Router();

//*************************
// Gets

// Sign-in page
router.get('/', function(req, res) {
  res.render('users/signin.ejs', {
    errorMsg: '',
  });
})

router.get('/signout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  })
})

//***********************
// Post
router.post('/', function(req, res) {
  if (req.body.username === '' || req.body.password === '') {
    res.render( 'users/signin.ejs', {
      errorMsg: "Username and password are required.",
    });
  }
  else {
    User.findOne( {username: req.body.username }, function(err, foundUser) {
      if (foundUser.username === req.body.username
          && bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.usertype = foundUser.type;
        req.session.username = foundUser.username;
        res.redirect('/');
      }
      else {
        res.render( 'users/signin.ejs', {
          errorMsg: "User not found.",
        });
      }
    })
  }
})

module.exports = router;

//***********************
// seed user db
router.get('/seed/users', function( req,res) {
  var hashedPassword = bcrypt.hashSync( "Mark", bcrypt.genSaltSync(10));
  var corp = {
    username: "Mark",
    password: hashedPassword,
    type: "corp"
  };

  User.create(corp, function(err) {
    console.log("SEED: user created");
    res.redirect('/');
  })
})
