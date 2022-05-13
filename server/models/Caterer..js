const mongoose = require("mongoose");
const UserSchema = require("../models/User").schema;
const Menus = require("../models/Menu").schema;
const Orders = require("../models/Checkout").schema;

const CatererSchema = UserSchema.clone();
CatererSchema.add({
  contactName: {
    type: String,
    required: true
  },
  contactPhoneNumber:{
    type: String,
    required: true
  },
  menu: {
    type: Menus,
    required: false
  },
  orders: {
      type: [Orders],
      required: false
  },
  recievePayment: {
    //https://stackoverflow.com/questions/27447876/is-it-possible-to-create-a-multi-select-enum-in-mongoose
    type: [String],
    enum: ["Accept Cash", "Accept Cards", "Accept Cheque"],
    required: true,
  },
});

module.exports = mongoose.model("Caterer", CatererSchema);
