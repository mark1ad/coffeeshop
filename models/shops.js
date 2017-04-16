var mongoose = require('mongoose');
var Drink = require('./drinks.js');

var shopSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  information: { type: String, required: true },
  location: { street: String, city: String, state: String },
  drinks: [ Drink.schema ],
  img: String
});

var shop = mongoose.model('Shop', shopSchema);

module.exports = shop;
