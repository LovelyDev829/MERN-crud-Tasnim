const express = require('express');
const router = express.Router();
const Checkout = require('../models/Checkout');

router.get('/', async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.json(checkouts);
  } catch (err) {
    res.status(404);
    res.json({message: err});
  }
});

router.post('/', async (req, res) => {
  const checkout = new Checkout({
    totalPrice: req.body.totalPrice,
    registerDate: req.body.registerDate,
    foods: req.body.foods,
    status: req.body.status,
    orderDate: req.body.orderDate,
  });

  try {
    const savedCheckout = await checkout.save();
    res.json(savedCheckout);
  } catch (err) {
    res.status(404);
    res.json({message: err});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    res.json(checkout);
  } catch (err) {
    res.status(404);
    res.json({message: err});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removedCheckout = await Checkout.remove({_id: req.params.id});
    res.json(removedCheckout);
  } catch (err) {
    res.status(404);
    res.json({message: err});
  }
});

router.put('/:id', async (req, res) => {
  const totalPrice = req.body.totalPrice;
  const registerDate = req.body.registerDate;
  const foods = req.body.foods;
  const orderDate = req.body.orderDate;
  const status = req.body.status;
  const id = req.params.id;

  try {
    let updatedCheckout;
    if (totalPrice) {
      updatedCheckout = await Checkout.findOneAndUpdate({_id: id}, {totalPrice: totalPrice});
    }
    if (registerDate) {
      updatedCheckout = await Checkout.findOneAndUpdate({_id: id}, {registerDate: registerDate});
    }
    if (foods) {
      updatedCheckout = await Checkout.findOneAndUpdate({_id: id}, {foods: foods});
    }
    if (status) {
      updatedCheckout = await Checkout.findOneAndUpdate({_id: id}, {status: status});
    }
    if (orderDate) {
      updatedCheckout = await Checkout.findOneAndUpdate({_id: id}, {orderDate: orderDate});
    }

    res.json(updatedCheckout);
  } catch (err) {
    res.status(404);
    res.json({message: err});
  }
});

module.exports = router;
