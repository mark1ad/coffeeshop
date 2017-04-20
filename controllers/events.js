var express = require('express');
var Event = require('../models/events.js');
var router = express.Router();

//**************************
// Gets

// Events index page
router.get('/', function(req, res) {
  res.render('events/index.ejs');
})


module.exports = router;
