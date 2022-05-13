const mongoose = require("mongoose");
const UserSchema = require("../models/User").schema;
const Cart = require("../models/Cart").schema;
const Orders = require("../models/Checkout").schema;

const CustomerSchema = UserSchema.clone();
CustomerSchema.add({
  cart: {
    type: Cart,
    required: true,
  },
  orders: {
    type: [],
    required: false,
  },
  payment: {
    type: String,
    enum: ["Pay by cash", "Pay by card"],
    required: true,
  },
});

module.exports = mongoose.model("Customers", CustomerSchema);
