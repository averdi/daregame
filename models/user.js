// /models/user.js
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  instagramID: { type: Number, required: true },
  dares: [ {type : mongoose.Schema.ObjectId, ref: 'Dare',
    completed: Boolean,
    accepted: Boolean,
    timeAccepted: Date
   }]
});

var User = mongoose.model('User', userSchema);

// Make this available to our other files
module.exports = User;
