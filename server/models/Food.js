const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Foods", FoodSchema);
