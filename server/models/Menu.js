const mongoose = require("mongoose");
const Foods = require('../models/Food').schema;

const MenuSchema = mongoose.Schema({
  foods:{
    type: [Foods],
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  categories: {
    type: [String], 
    enum: ["Vegan", "Vegetarian", "Desserts", "Bakery", "Western", "Pizza"],
    required: true,
  },
});

module.exports = mongoose.model("Menus", MenuSchema);
