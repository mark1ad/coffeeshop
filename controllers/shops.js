var express = require('express');
var Shop = require('../models/shops.js');
var Drink = require('../models/drinks.js');
var router = express.Router();

//****************************
// Gets

// Shop index page
router.get('/', function(req, res) {
  Shop.find( {}, function( err, foundShops) {
    res.render('shops/index.ejs', {
      shops: foundShops
    });
  })
})


// New page
router.get('/new', function(req,res) {
  res.render('shops/new.ejs');
})

// Shop information page (show)
router.get('/:id', function(req,res) {
  Shop.findById( req.params.id, function( err, foundShop) {
    res.render('shops/show.ejs', {
      shop: foundShop
    });
  })
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
    { name: "Shop 1", information: 'This is shop 1',
      location: { street: "oak", city: "Fort Collins", state: "CO"},
      img: "http://i.imgur.com/3ijGEGo.jpg",
      drinks: [
        { name: "mocha", description: "A local favorite"},
        { name: "coffee", description: "plain old coffee"},
      ],
    },
    { name: 'Shop 2', information: 'This is shop 2',
      location: { string: "Kennedy Dr", city: "Northglenn", state: "CO"},
      img: "http://i.imgur.com/nUaPiXl.jpg"
    },
    { name: 'Shpo 3', information: 'This is shop 3',
      location: { street: "Main", city: "Windsor", state: "CO"},
      img: "http://i.imgur.com/xuTKX2k.jpg"
    },
    { name: 'Shop 4', information: 'This is shop 4',
      location: {street: "1st Ave", city: "Boulder", state: "CO"},
      img: "http://i.imgur.com/vHhA3Hn.jpg"
    },
  ];

  Shop.create(newShops, function( err) {
    console.log("SEED: new shops created");
    res.redirect('/');
  })
})
