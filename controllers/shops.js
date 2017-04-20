var express = require('express');
var bcrypt = require('bcrypt');
var Shop = require('../models/shops.js');
var Drink = require('../models/drinks.js');
var User = require('../models/users.js');
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
  Drink.find( {} , function(err, foundDrinks) {
    res.render('shops/new.ejs', {
      drinks: foundDrinks
    });
  })
})

// Edit page
router.get('/:id/edit', function( req, res) {
  Shop.findById( req.params.id, function( err, foundShop) {
    Drink.find( {}, function( err, foundDrinks) {
      res.render('shops/edit.ejs', {
        shop:foundShop,
        drinks: foundDrinks
      })
    })
  })
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
  if (req.body.username === '' || req.body.password === '') {
    res.render( 'shops/new.ejs', {
      errorMsg: "Manager and password are required.",
    });
  }
  else {
    var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = {
      username: req.body.manager,
      password: hashedPassword,
      type: "manager"
    }

    User.create(user, function(err, createdUser) {
      Drink.find( { name: { $in: req.body.drinks }}, function( err, foundDrinks) {
        delete req.body.password;
        req.body.drinks = foundDrinks;
        Shop.create(req.body, function(err, createdShop) {
          res.redirect('/shops');
        })
      })
    })
  }


});

//*******************************
// Put
router.put("/:id", function(req, res) {
  Drink.find( { name: { $in : req.body.drinks }}, function(err, foundDrinks){
    req.body.drinks = foundDrinks;
    Shop.findByIdAndUpdate(req.params.id, req.body, function( err) {
      res.redirect('/shops/' + req.params.id);
    })
  })
})

//*****************************
// Delete shop
router.delete('/:id', function(req, res) {
  Shop.findByIdAndRemove( req.params.id, function(err, foundGrapher) {
    res.redirect('/shops');
  })
})

module.exports = router;


//******************************************
// seed db with shops

function addDrinksToShops( shops, drinks, selection ) {
  if (shops.length > 0) {
    var curShop = shops.pop();
    var drinkList = selection.pop();
    for (var i = 0; i < drinkList.length; i++) {
      curShop.drinks.push(drinks[drinkList[i]]);
    }
    curShop.save(function(err, data) {
      addDrinksToShops(shops, drinks, selection);
    })
  }
}

router.get('/seed/shops', function(req, res) {
  var newShops = [
    { name: "A Civilized Fort Collins",
      manager: "Steve",
      information: 'Our first location. Near the CSU Campus',
      location: { street: "318 W Laurel", city: "Fort Collins", state: "CO"},
      img: "http://i.imgur.com/3ijGEGo.jpg",
    },
    { name: 'The Frontier',
      manager: 'Bob',
      information: 'For the adventurous willing to risk the dangers at the edge civilization.',
      location: { street: "10 Humboldt St", city: "Ward", state: "CO"},
      img: "http://i.imgur.com/nUaPiXl.jpg"
    },
    { name: 'The Enlightenment',
      manager: "Susan",
      information: 'For the seeker of wisdom.',
      location: { street: "810 Ash St", city: "Windsor", state: "CO"},
      img: "http://i.imgur.com/xuTKX2k.jpg"
    },
    { name: 'The Fall',
      manager: "Harry",
      information: 'Even at the fall of civilization you\'ll still need good coffee',
      location: {street: "1650 Pearl St", city: "Boulder", state: "CO"},
      img: "http://i.imgur.com/vHhA3Hn.jpg"
    },
  ];

  Shop.remove({}, function(err) {
    console.log('collection removed ' + err);
    Shop.create(newShops, function( err, createdShops) {
      console.log("shops created " + createdShops.length);
      console.log("SEED: new shops created");

      var newDrinks = [
        { name: "Mocha", description: "A local favorite.", img: 'http://i.imgur.com/6XAZBRO.jpg'},
        { name: "Espresso", description: "When you need that caffine shot right now.", img: "http://i.imgur.com/3RyO0Mg.jpg"},
        { name: "Coffee", description: "Basic high octane coffee.", img: 'http://i.imgur.com/LY7XFtK.jpg'},
        { name: "Latte", description: "One shot of espresso mixed with  steamed milk, then topped with foam.", img: 'http://i.imgur.com/KstFehP.jpg'},
        { name: "Americano", description: "One espresso shot mixed with hot water.", img: 'http://i.imgur.com/u7XWQPp.jpg' },
        { name: "Iced Mocha", description: "A cool mocha for a hot summer day.", img: 'http://i.imgur.com/cdt26Bu.jpg'}
      ];

      Drink.remove({}, function(err) {
        console.log("remove drinks " + err);
        Drink.create(newDrinks, function(err, createdDrinks) {
          console.log('mixing drinks ' + createdDrinks.length + ' ' + err);
          console.log("SEED: new drinks created");

          addDrinksToShops( createdShops, createdDrinks,
            [[2,4], [1,0], [ 1,3,0], [1,2,4]] );
          res.redirect('/');
        })
      })
    })
  });
})
