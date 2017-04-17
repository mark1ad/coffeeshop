var mongoose = require('mongoose');
var Drink = require('./drinks.js');

var shopSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  information: { type: String, required: true },
  location: { street: String, city: String, state: String },
  drinks: [ Drink.schema ],
  img: String
});

var sortByName = function(drinkObjects) {
  return drinkObjects.sort(function(a,b) {
    if (a.name < b.name) {return -1; }
    if (a.name > b.name) {return 1; }
    return 0;
  })
}

shopSchema.virtual('drinksAlphabetical').get(function() {
  return sortByName(this.drinks);
})


var shop = mongoose.model('Shop', shopSchema);

module.exports = shop;
