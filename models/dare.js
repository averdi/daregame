// /models/user.js
var mongoose = require('mongoose');

var dareSchema = new mongoose.Schema({
  description: { type: String, required: true },
  hashtag: { type: String, required: true },
  category: String,
  imageURL: String,
  timeLimit: Number,
  users: [ {type : mongoose.Schema.ObjectId, ref: 'User'}]
});

var Dare = mongoose.model('Dare', dareSchema);

// Make this available to our other files
module.exports = Dare;
