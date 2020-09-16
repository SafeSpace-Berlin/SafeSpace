var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  roomId: String,
  availableFrom: Date,
  availableTo: Date,
  price: String,
  country: String,
  city: String,
  district: String,
  photo: String,
  contact: String
}, {timestamps: true});

mongoose.model('Room', RoomSchema);
