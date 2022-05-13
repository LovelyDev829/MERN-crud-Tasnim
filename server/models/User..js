const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  typeOfPerson: {
    type: String,
    enum: ["customer", "caterer", "admin"],
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
