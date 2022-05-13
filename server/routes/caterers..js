const express = require('express')
const router = express.Router()
const Caterer = require('../models/Caterer')

router.get('/', async (req, res) => {
  try {
    const caterers = await Caterer.find()
    res.json(caterers)
  } catch (err) {
    res.status(404)
    res.json({ message: err })
  }
})

router.post('/', async (req, res) => {
  const user = new Caterer({
    userID: req.body.userID,
    name: req.body.name,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,
    typeOfPerson: req.body.typeOfPerson,
    contactName: req.body.contactName,
    contactPhoneNumber: req.body.contactPhoneNumber,
    orders: req.body.orders,
    recievePayment: req.body.recievePayment,
    menu: req.body.menu,
    registerDate: req.body.registerDate
  })

  try {
    const savedCaterer = await user.save()
    res.json(savedCaterer)
  } catch (err) {
    res.status(404)
    res.json({ message: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const caterer = await Caterer.findById(req.params.id)
    res.json(caterer)
  } catch (err) {
    res.status(404)
    res.json({ message: err })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removedCaterer = await Caterer.remove({ _id: req.params.id })
    res.json(removedCaterer)
  } catch (err) {
    res.status(404)
    res.json({ message: err })
  }
})

router.put('/:id', async (req, res) => {
  const userID = req.body.userID
  const name = req.body.name
  const address = req.body.address
  const phoneNo = req.body.phoneNo
  const email = req.body.email
  const password = req.body.password
  const typeOfPerson = req.body.typeOfPerson
  const contactName = req.body.contactName
  const contactPhoneNumber = req.body.contactPhoneNumber
  const orders = req.body.orders
  const recievePayment = req.body.recievePayment
  const menu = req.body.menu
  const id = req.params.id
  const registerDate = req.body.registerDate

  try
  { 
    let updatedCaterer
    if (userID) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { userID: userID })
    }
    if (name) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { name: name })
    }
    if (address) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { address: address })
    }
    if (phoneNo) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { phoneNo: phoneNo })
    }
    if (email) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { email: email })
    }
    if (password) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { password: password })
    }
    if (typeOfPerson) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { typeOfPerson: typeOfPerson })
    }
    if (contactName) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { contactName: contactName })
    }
    if (contactPhoneNumber) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { contactPhoneNumber: contactPhoneNumber })
    }
    if (orders) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { orders: orders })
    }
    if (recievePayment) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { recievePayment: recievePayment })
    }
    if (menu) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { menu: menu })
    }
    if (registerDate) {
      updatedCaterer = await Caterer.findOneAndUpdate({ _id: id }, { registerDate: registerDate })
    }

    res.json(updatedCaterer)
  } catch (err) {
    res.status(404)
    res.json({ message: err })
  }
})

module.exports = router
