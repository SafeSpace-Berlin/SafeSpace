var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema(
  {
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    price: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    photo: String,
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

RoomSchema.methods.toJSON = function () {
  const { ...object } = this.toObject();
  object.id = this._id;
  return object;
};

mongoose.model("Room", RoomSchema);
