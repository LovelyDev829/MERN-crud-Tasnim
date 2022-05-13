const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})

router.post("/", async (req, res) => {
  const food = new Food({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    registerDate: req.body.registerDate,
  });

  try {
    const savedFood = await food.save();
    res.json(savedFood);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.json(food);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedFood = await Food.remove({ _id: req.params.id });
    res.json(removedFood);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  var name = req.body.name;
  var registerDate = req.body.registerDate;
  var price = req.body.price;
  var description = req.body.description;
  const id = req.params.id;

  try{
    var updatedFood; 
    if(description)
      updatedFood = await Food.findOneAndUpdate({_id: id}, {description:description});
    if(registerDate)
      updatedFood = await Food.findOneAndUpdate({_id: id}, {registerDate:registerDate});
    if(price)
      updatedFood = await Food.findOneAndUpdate({_id: id}, {price:price});
    if(name)
      updatedFood = await Food.findOneAndUpdate({_id: id}, {name:name});
    
    res.json(updatedFood);
  }catch (err){
    res.status(404);
    res.json({ message: err });
  }
})

module.exports = router;
