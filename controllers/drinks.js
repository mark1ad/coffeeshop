var express = require('express');
var Drink = require('../models/drinks.js');
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

// Drink information page (show)
router.get('/:id', function(req,res) {
  Drink.findById( req.params.id, function( err, foundDrink) {
    res.render('drinks/show.ejs', {
      drink: foundDrink
    })
  })
})

//*****************************
// Delete drinks
router.delete('/:id', function(req,res) {
  Drink.findByIdAndRemove( req.params.id, function( err, foundDrink) {
    res.redirect('/drinks');
  })
})

module.exports = router;
