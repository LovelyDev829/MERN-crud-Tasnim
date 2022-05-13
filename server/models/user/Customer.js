const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const CustomerSchema = new Schema({
  customerCount: {
    type: Number
  },
  customerList: [{
    _id: false,
    customer: {
      type: Schema.Types.ObjectId,
      ref: User
    }
  }]
}, {
  collection: 'user_customer'
})

module.exports = mongoose.model('Customer', CustomerSchema)
