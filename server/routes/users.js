const express = require('express')
const router = express.Router()
// const Menu = require('../models/Menu')
const UserSchema = require('../models/user/User')
const CustomerSchema = require('../models/user/Customer')
const CatererSchema = require('../models/user/Caterer')

router.post('/createCaterer', (req, res, next) => {
  console.log('creating a Caterer')
  console.log(req.body)
  const {
    address,
    email,
    name,
    password,
    phoneNo
  } = req.body
  const newUser = new UserSchema({
    userType: 'caterer',
    userName: name,
    userAddress: address,
    userPhoneNumber: phoneNo,
    userEmail: email,
    userPassword: password
  })
  newUser.save().then((user) => {
    if (user) {
      CatererSchema.findById('6240d4b26a4ff1296c5f1378').then((caterer) => {
        if (caterer) {
          const catererList = caterer.catererList
          catererList.push({ caterer: user._id })
          const catererCount = caterer.catererCount + 1
          CatererSchema.findByIdAndUpdate(
            caterer._id,
            {
              catererList: catererList,
              catererCount: catererCount
            },
            { new: true }
          ).then((updatedCaterert) => {
            console.log('[Creation] A Caterer, catererName :' + name)
            res.status(200).json({ userName: name })
          }).catch((err) => console.log(err))
        }
      }).catch((err) => console.log(err))
    }
  }).catch((err) => console.log(err))
})

router.post('/createCustomer', (req, res, next) => {
  console.log('creating a Customer')
  console.log(req.body)
  const {
    address,
    email,
    name,
    password,
    phoneNo
  } = req.body
  const newUser = new UserSchema({
    userType: 'customer',
    userName: name,
    userAddress: address,
    userPhoneNumber: phoneNo,
    userEmail: email,
    userPassword: password
  })
  newUser.save().then((user) => {
    if (user) {
      CustomerSchema.findById('6240d4946a4ff1296c5f1374').then((customer) => {
        if (customer) {
          const customerList = customer.customerList
          customerList.push({ customer: user._id })
          const customerCount = customer.customerCount + 1
          CustomerSchema.findByIdAndUpdate(
            customer._id,
            {
              customerList: customerList,
              customerCount: customerCount
            },
            { new: true }
          ).then((updatedCustomert) => {
            console.log('[Creation] A Customer, customerName :' + name)
            res.status(200).json({ userName: name })
          }).catch((err) => console.log(err))
        }
      }).catch((err) => console.log(err))
    }
  }).catch((err) => console.log(err))
})

router.post('/authentication', (req, res, next) => {
  console.log('authenticating')
  console.log(req.body)
  const {
    userEmail,
    userPassword
  } = req.body
  UserSchema.findOne({ userName: userEmail, userPassword: userPassword }).then((userItem) => {
    res.status(200).json({ userType: userItem.userType })
  }).catch((err) => {
    console.log(err)
    res.status(200).json({ userType: 'fake' })
  })
})

module.exports = router
