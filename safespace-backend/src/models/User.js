var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    budget: { type: String, required: true },
    contact: { type: String, required: true },
    story: { type: String, required: true },
    searching: { type: Boolean, required: true },
    photo: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { ...object } = this.toObject();
  object.id = this._id;
  return object;
};

mongoose.model("User", UserSchema);
