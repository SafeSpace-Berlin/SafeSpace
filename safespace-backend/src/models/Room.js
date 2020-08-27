var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  roomId: String,
}, {timestamps: true});

// Requires population of author
RoomSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    roomId: this.roomId,
  };
};

mongoose.model('Room', RoomSchema);
