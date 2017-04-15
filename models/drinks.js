var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true}
});

var drink = mongoose.model('Drink', drinkSchema);

module.exports = drink;
