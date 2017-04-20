var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  date: { type: Date, require: true}
});

var event = mongoose.model('Event', eventSchema);

module.exports = event;
