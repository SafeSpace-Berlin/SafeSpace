var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema(
  {
    availableFrom: Date,
    availableTo: Date,
    price: String,
    country: String,
    city: String,
    district: String,
    photo: String,
    contact: String,
  },
  { timestamps: true }
);

RoomSchema.methods.toJSON = function () {
  const { ...object } = this.toObject();
  object.id = this._id;
  return object;
};

mongoose.model("Room", RoomSchema);
