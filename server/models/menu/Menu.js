const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('./Category')

const MenuSchema = new Schema({
  menuName: {
    type: String
  },
  categoryCount: {
    type: Number
  },
  categoryList: [{
    _id: false,
    category: {
      type: Schema.Types.ObjectId,
      ref: Category
    }
  }]
}, {
  collection: 'menu_main'
})

module.exports = mongoose.model('Menu', MenuSchema)
