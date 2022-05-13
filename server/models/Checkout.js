const mongoose = require("mongoose");
const CartSchema = require("../models/Cart").schema;
//const CustomerSchema = require("../models/Customer").schema;

// https://stackoverflow.com/questions/62628054/mongoosemongodb-linking-multiple-schemas

const CheckoutSchema = CartSchema.clone();
CheckoutSchema.add({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Received", "Accepted", "Preparing", "Cancelled"],
    required: true,
    default: "Received"
  },
});

module.exports = mongoose.model("Checkouts", CheckoutSchema);
