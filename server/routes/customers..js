const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const cart = new Cart({
    totalPrice: 0.00,
  });

  const user = new Customer({
    userID: req.body.userID,
    name: req.body.name,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,
    typeOfPerson: req.body.typeOfPerson,
    payment: req.body.payment,
    orders: req.body.orders,
    cart: cart,
    registerDate: req.body.registerDate,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.get("/:userID", async (req, res) => {
  try {
    const customers = await Customer.find({ userID: req.params.userID });
    res.json(customers);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedCustomer = await Customer.remove({ _id: req.params.id });
    res.json(removedCustomer);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  var userID = req.body.userID;
  var name = req.body.name;
  var address = req.body.address;
  var phoneNo = req.body.phoneNo;
  var email = req.body.email;
  var password = req.body.password;
  var typeOfPerson = req.body.typeOfPerson;
  var payment = req.body.payment;
  var cart = req.body.cart;
  var orders = req.body.orders;
  var registerDate = req.body.registerDate;
  const id = req.params.id

  try{
    var updatedCustomer; 
    if(name)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {userID:userID});
    if(name)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {name:name});
    if(address)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {address:address});
    if(phoneNo)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {phoneNo:phoneNo});
    if(email)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {email:email});
    if(password)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {password:password});
    if(typeOfPerson)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {typeOfPerson:typeOfPerson});
    if(payment)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {payment:payment});
    if(cart)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {cart:cart});
    if(orders)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {orders:orders});
    if(registerDate)
      updatedCustomer = await Customer.findOneAndUpdate({_id: id}, {registerDate:registerDate});
    
    res.json(updatedCustomer);
  }catch (err){
    res.status(404);
    res.json({ message: err });
  }
})

module.exports = router;
