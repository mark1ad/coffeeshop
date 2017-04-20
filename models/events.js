var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  shop: { type: String, require: true },
  name: { type: String, required: true},
  description: { type: String, required: true },
  date: { type: Date, require: true}
});

var formatDate = function(date) {
  return ((date.getMonth() + 1) + '/' + date.getDate());
}

eventSchema.virtual('formattedDate').get(function() {
  return formatDate(this.date);
})

var event = mongoose.model('Event', eventSchema);

module.exports = event;
