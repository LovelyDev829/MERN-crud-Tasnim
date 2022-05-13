const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BasicSchema = new Schema({
  menuCount: { type: Number },
  currentMenuId: { type: String }
}, {
  collection: 'basic'
})

module.exports = mongoose.model('Basic', BasicSchema)
