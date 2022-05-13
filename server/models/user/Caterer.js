const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const CatererSchema = new Schema({
  catererCount: {
    type: Number
  },
  catererList: [{
    _id: false,
    caterer: {
      type: Schema.Types.ObjectId,
      ref: User
    }
  }]
}, {
  collection: 'user_caterer'
})

module.exports = mongoose.model('Caterer', CatererSchema)
