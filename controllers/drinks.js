var express = require('express');
var Drink = require('../models/drinks.js');
var Shop = require('../models/shops.js');
var router = express.Router();

//***************************
// Gets

// Drinks index page
router.get('/', function(req,res) {
  Drink.find({}, function(err, foundDrinks) {
    res.render('drinks/index.ejs', {
      drinks: foundDrinks
    });
  })
});

// New page
router.get('/new', function(req, res){
  res.render('drinks/new.ejs',{
    drink: {} // send empty drink object for new page to make form partial work.
        // Edit page will send a real object
  });
})

// Drink information page (show)
router.get('/:id', function(req,res) {
  Drink.findById( req.params.id, function( err, foundDrink) {
    res.render('drinks/show.ejs', {
      drink: foundDrink
    })
  })
})

// Edit page
router.get('/:id/edit', function( req, res) {
  Drink.findById( req.params.id, function(err, foundDrink) {
    res.render("drinks/edit.ejs", {
      drink: foundDrink
    })
  })
})

//**************************
// Post drinks
router.post('/', function(req, res) {
  Drink.create( req.body, function(err, createdDrink) {
    res.redirect('/drinks');
  })
})

//***************************
// Put
router.put("/:id", function(req, res) {
  Drink.findByIdAndUpdate(req.params.id, req.body, function(err) {
    res.redirect('/drinks/' + req.params.id);
  })
})

//*****************************
// Delete drinks

function removeDrinkFromShop(shops, drinkID) {
  if (shops.length > 0) {
    var curShop = shops.pop();
    console.log("Remove drink from " + curShop.name);
    curShop.drinks.id(drinkID).remove();
    curShop.save(function(err, data) {
      removeDrinkFromShop(shops, drinkID);
    })
  }
}

router.delete('/:id', function(req,res) {
  Drink.findByIdAndRemove( req.params.id, function( err, foundDrink) {
    Shop.find({'drinks._id':req.params.id}, function(err, foundShops) {
      removeDrinkFromShop(foundShops, req.params.id);
      res.redirect('/drinks');
    })
  })
})

module.exports = router;
