const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})

router.post("/", async (req, res) => {
  const cart = new Cart({
    totalPrice: req.body.totalPrice,
    registerDate: req.body.registerDate,
    foods: req.body.foods,
  });

  try {
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.json(cart);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedCart = await Cart.remove({ _id: req.params.id });
    res.json(removedCart);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  var totalPrice = req.body.totalPrice;
  var registerDate = req.body.registerDate;
  var foods = req.body.foods;
  const id = req.params.id;

  try{
    var updatedCart; 
    if(totalPrice)
      updatedCart = await Cart.findOneAndUpdate({_id: id}, {totalPrice:totalPrice});
    if(registerDate)
      updatedCart = await Cart.findOneAndUpdate({_id: id}, {registerDate:registerDate});
    if(foods)
      updatedCart = await Cart.findOneAndUpdate({_id: id}, {foods:foods});
    
    res.json(updatedCart);
  }catch (err){
    res.status(404);
    res.json({ message: err });
  }
})

module.exports = router;
