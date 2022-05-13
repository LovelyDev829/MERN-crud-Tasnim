const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Foodv2 = require('./Foodv2')

const CategorySchema = new Schema({
  categoryName: {
    type: String
  },
  foodCount: {
    type: Number
  },
  foodList: [{
    _id: false,
    food: {
      type: Schema.Types.ObjectId,
      ref: Foodv2
    }
  }]
}, {
  collection: 'menu_category'
})

module.exports = mongoose.model('Category', CategorySchema)
