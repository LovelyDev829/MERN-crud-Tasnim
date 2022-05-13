const mongoose = require("mongoose");
const Food = require("../models/Food").schema;

const CartSchema = mongoose.Schema({
    totalPrice: {
      type: Number,
      required: true,
      default: 0.00,
    },
    foods:{
        type: [Food],
        required: false
    },
    registerDate: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Cart", CartSchema);
  