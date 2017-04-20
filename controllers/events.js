var express = require('express');
var Event = require('../models/events.js');
var Shop = require('../models/shops.js');
var router = express.Router();

//**************************
// Gets

// Events index page
router.get('/', function(req, res) {
  Shop.find({}, function(err, foundShops) {
    Event.find({}, function(err, foundEvents) {
      res.render('events/index.ejs', {
        events: foundEvents,
        shops: foundShops
      });
    });
  })
});

// New page
router.get('/new', function( req, res) {
  res.render('events/new.ejs', {
    event: {}
  })
})

// Event information page
router.get('/:id', function(req,res) {
  Event.findById( req.params.id, function(err, foundEvent) {
    Shop.findOne( {name: foundEvent.shop}, function(err, foundShop) {
      res.render('events/show.ejs', {
        event: foundEvent,
        shop: foundShop
      })
    })
  })
})

// Edit page
router.get('/:id/edit', function(req, res) {
  Event.findById( req.params.id, function(err, foundEvent) {
    res.render('events/edit.ejs', {
      event: foundEvent
    })
  })
})

//**************************
// Post event
router.post('/', function(req,res) {
  Shop.findOne( { manager: req.session.username }, function(err, foundShop) {
    req.body.shop = foundShop.name;
    Event.create(req.body, function(err, createdEvent) {
      foundShop.events.push(createdEvent);
      foundShop.save(function(err, data) {
        res.redirect('/events');
      })
    })
  })
})

//************************
// Delete Event
router.delete("/:id", function(req,res) {
  Event.findByIdAndRemove( req.params.id, function(err, foundEvent) {
    Shop.findOne({name: foundEvent.shop}, function(err, foundShop) {
      foundShop.events.id(req.params.id).remove();
      foundShop.save(function(err, data) {
        res.redirect('/events');
      })
    })
  })
})

//************************
// Put

router.put("/:id", function(req, res) {
  Event.findByIdAndUpdate( req.params.id, req.body, {new: true}, function( err, foundEvent) {
    Shop.findOne({name: foundEvent.shop}, function( err, foundShop) {
      foundShop.events.id(req.params.id).remove();
      foundShop.events.push(foundEvent);
      foundShop.save(function(err, data) {
        res.redirect('/events');
      })
    })
  })
})


module.exports = router;
