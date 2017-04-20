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

// Sign Out
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
      if (foundUser !== null
          && foundUser.username === req.body.username
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

function makeUsers( newUsers) {
  if (newUsers.length > 0) {
    var curUser = newUsers.pop();
    var hashedPassword = bcrypt.hashSync( curUser[0], bcrypt.genSaltSync(10));
    var corp = {
      username: curUser[0],
      password: hashedPassword,
      type: curUser[1]
    };

    User.create(corp, function(err) {
      makeUsers(newUsers);
    })
  }
}

router.get('/seed/users', function( req,res) {
  User.remove({}, function(err) {
    var newUsers = [
      [ "Mark", "corp"],
      [ 'Steve', 'manager'],
      [ 'Bob', 'manager'],
      [ 'Susan', 'manager'],
      [ 'Harry', 'manager']
    ];

    makeUsers( newUsers);
    res.redirect('/');

  })
  // var hashedPassword = bcrypt.hashSync( "Mark", bcrypt.genSaltSync(10));
  // var corp = {
  //   username: "Mark",
  //   password: hashedPassword,
  //   type: "corp"
  // };
  //
  // User.create(corp, function(err) {
  //   console.log("SEED: user created");
  // })
})
