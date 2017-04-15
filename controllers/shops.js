var express = require('express');
var Shop = require('../models/shops.js');
var Drink = require('../models/drinks.js');
var router = express.Router();

//****************************
// Gets

// Show page
router.get('/', function(req, res) {
  Shop.find( {}, function( err, foundShops) {
        // res.send('message')
        res.render('shops/index.ejs', {
          shops: foundShops
        });
      })
  })

// New page
router.get('/new', function(req,res) {
  res.render('shops/new.ejs');
})

//*******************************
// Post
router.post('/', function(req, res) {
  Shop.create(req.body, function(err, createdShop) {
    console.log("New shop ", err);
    res.redirect('/shops');
  })
})

module.exports = router;


//******************************************
// seed db with shops
router.get('/seed/shops', function(req, res) {
  var newShops = [
    { name: "Shop 1", information: 'This is shop 1'},
    { name: 'Shop 2', information: 'This is shop 2'},
    { name: 'Shpo 3', information: 'This is shop 3'},
    { name: 'Shop 4', information: 'This is shop 4'},
  ];

  Shop.create(newShops, function( err) {
    console.log("SEED: new shops created");
    res.redirect('/');
  })
})
