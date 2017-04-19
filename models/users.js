var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true}
});

var user = mongoose.model('User', userSchema);

module.exports = user;
