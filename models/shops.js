var mongoose = require('mongoose');
var Drink = require('./drinks.js');

var shopSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  manager: { type: String, required: true },
  information: { type: String, required: true },
  location: { street: String, city: String, state: String },
  drinks: [ Drink.schema ],
  img: String
});

var sortByName = function(drinkObjects) {
  return drinkObjects.slice().sort(function(a,b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) {return -1; }
    if (nameA > nameB) {return 1; }
    return 0;
  });
}

shopSchema.virtual('drinksAlphabetical').get(function() {
  return sortByName(this.drinks);
})

var buildMapURL = function(location) {
  if (location.street === "" || location.city === "" || location.state === "") {
    return "";
  }

  return encodeURI("https://maps.googleapis.com/maps/api/staticmap?center="
  + location.street + '+'
  + location.city + ','
  + location.state +
   "&zoom=16&size=600x300&maptype=roadmap&markers=color:blue|"
   + location.street + '+'
   + location.city + ','
    + location.state +
     "&key=AIzaSyAefy5rezYdyzFbF2qQ7zzHsS-iRTiPBsg");
}

shopSchema.virtual('mapURL').get(function() {
  return buildMapURL(this.location);
})


var shop = mongoose.model('Shop', shopSchema);

module.exports = shop;
