const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userType: {
    type: String
  },
  userName: {
    type: String
  },
  userAddress: {
    type: String
  },
  userPhoneNumber: {
    type: String
  },
  userEmail: {
    type: String
  },
  userPassword: {
    type: String
  }
}, {
  collection: 'user_user'
})

module.exports = mongoose.model('User', UserSchema)
