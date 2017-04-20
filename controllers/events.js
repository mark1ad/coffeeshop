var express = require('express');
var Event = require('../models/events.js');
var router = express.Router();

//**************************
// Gets

// Events index page
router.get('/', function(req, res) {
  Event.find({}, function(err, foundEvents) {
    res.render('events/index.ejs', {
      events: foundEvents
    });
  })
});

// New page
router.get('/new', function( req, res) {
  res.render('events/new.ejs', {
    event: {}
  })
})

//**************************
// Post event
router.post('/', function(req,res) {
  Event.create(req.body, function(err, createdEvent) {
    res.redirect('/events');
  })
})


module.exports = router;
