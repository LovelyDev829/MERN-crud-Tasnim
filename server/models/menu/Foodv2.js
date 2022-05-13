const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Foodv2Schema = new Schema({
  foodName: {
    type: String
  },
  foodPrice: {
    type: Number
  },
  foodDescription: {
    type: String
  },
  foodRegisteredDate: {
    type: Date
  }
}, {
  collection: 'menu_foodv2'
})

module.exports = mongoose.model('Foodv2', Foodv2Schema)
