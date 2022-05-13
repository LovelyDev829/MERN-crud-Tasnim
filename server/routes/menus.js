const express = require('express')
const router = express.Router()
// const Menu = require('../models/Menu')
const BasicSchema = require('../models/Basic')
const Foodv2Schema = require('../models/menu/Foodv2')
const CategorySchema = require('../models/menu/Category')
const MenuSchema = require('../models/menu/Menu')

router.post('/createMenu', (req, res, next) => {
  const {
    menuName
  } = req.body
  const newMenu = new MenuSchema({
    menuName: menuName,
    categoryCount: 0
  })
  newMenu.save()
    .then((menu) => {
      BasicSchema.find().then((basic) => {
        const count = basic[0].menuCount ? (basic[0].menuCount + 1) : 1
        BasicSchema.findByIdAndUpdate('623d343db59875927a3d494c', { menuCount: count }, { new: true })
          .then((updatedBasic) => {
            console.log('[Creation] A  menu  , menuName   : ' + menuName)
            res.status(200).json({
              menuName: menuName
            })
          }).catch((err) => console.log(err))
      })
    }).catch((err) => console.log(err))
})

router.post('/createCategory', (req, res, next) => {
  console.log('creating a category')
  console.log(req.body)
  const {
    categoryNamE,
    foodCount,
    foodList
  } = req.body
  const newCategory = new CategorySchema({
    categoryName: categoryNamE,
    foodCount: foodCount,
    foodlist: foodList
  })
  BasicSchema.find().then((basic) => {
    const currentMenuId = basic[0].currentMenuId
    newCategory.save().then((category) => {
      if (category) {
        MenuSchema.findOne({ currentMenuId: currentMenuId }).then((menu) => {
          if (menu) {
            const categoryList = menu.categoryList
            categoryList.push({ category: category._id })
            const count = menu.categoryCount = (menu.categoryCount + 1)
            MenuSchema.findByIdAndUpdate(
              menu._id,
              {
                categoryList: categoryList,
                categoryCount: count
              },
              { new: true }
            ).then((updatedMenu) => {
              console.log('[Creation] An author, categoryName :' + categoryNamE)
              res.status(200).json({ categoryName: categoryNamE })
            }).catch((err) => console.log(err))
          }
        }).catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err))
  })
})

router.post('/editCategory', (req, res, next) => {
  console.log('edting a category')
  console.log(req.body)
  const {
    categoryId,
    categoryName
  } = req.body
  CategorySchema.findByIdAndUpdate(
    categoryId,
    { categoryName: categoryName },
    { new: true }
  ).then(() => {
    console.log('[Updating] A category edited categoryName :' + categoryName)
    res.status(200).json({ categoryName: categoryName })
  }).catch((err) => console.log(err))
})

router.post('/createFood', (req, res, next) => {
  console.log('creating a food')
  console.log(req.body)
  const {
    categoryId,
    foodName,
    foodDescription,
    foodPrice
  } = req.body
  const newFood = new Foodv2Schema({
    foodName: foodName,
    foodDescription: foodDescription,
    foodPrice: foodPrice
  })
  newFood.save().then((food) => {
    if (food) {
      CategorySchema.findOne({ _id: categoryId }).then((category) => {
        if (category) {
          const foodList = category.foodList
          foodList.push({ food: food._id })
          const count = category.foodCount = (category.foodCount + 1)
          CategorySchema.findByIdAndUpdate(
            category._id,
            {
              foodList: foodList,
              foodCount: count
            },
            { new: true }
          ).then((updatedCategory) => {
            console.log('[Creation] A food, foodName :' + foodName)
            res.status(200).json({ foodName: foodName })
          }).catch((err) => console.log(err))
        }
      }).catch((err) => console.log(err))
    }
  }).catch((err) => console.log(err))
})

router.post('/editFood', (req, res, next) => {
  console.log('edting a food')
  console.log(req.body)
  const {
    foodId,
    foodName,
    foodDescription,
    foodPrice
  } = req.body
  Foodv2Schema.findByIdAndUpdate(
    foodId,
    {
      foodName: foodName,
      foodDescription: foodDescription,
      foodPrice: foodPrice
    },
    { new: true }
  ).then(() => {
    console.log('[Updating] A food edited foodName :' + foodName)
    res.status(200).json({ foodName: foodName })
  }).catch((err) => console.log(err))
})

router.post('/deleteFood', (req, res, next) => {
  console.log('deleting a food')
  console.log(req.body)
  const {
    categoryId,
    foodId
  } = req.body
  CategorySchema.findById(categoryId).then((category) => {
    const foodList = category.foodList
    const foodCount = category.foodCount - 1
    foodList.remove({ food: foodId })
    CategorySchema.findByIdAndUpdate(
      category._id,
      {
        foodList: foodList,
        foodCount: foodCount
      },
      { new: true }
    ).then(() => {
      Foodv2Schema.findById(foodId).remove().then((deletedFoodItem) => {
        console.log('[Deletion] A food from foodList, foodId :' + deletedFoodItem.foodName)
        res.status(200).json({ foodName: deletedFoodItem.foodName })
      }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
  }).catch((err) => console.log(err))
})

router.post('/deleteCategory', (req, res, next) => {
  console.log('deleting a food')
  console.log(req.body)
  const { categoryId } = req.body
  CategorySchema.findById(categoryId).then((category) => {
    const foodList = category.foodList
    foodList.map((foodListItem) => {
      const foodId = foodListItem.food
      Foodv2Schema.findById(foodId).remove().catch((err) => console.log(err))
      return true
    })
    category.remove().then(() => {
      MenuSchema.findById('623d0a23b59875927a3d4946').then((menuItem) => {
        const categoryList = menuItem.categoryList
        const categoryCount = menuItem.categoryCount - 1
        categoryList.remove({ category: categoryId })
        MenuSchema.findByIdAndUpdate(
          '623d0a23b59875927a3d4946',
          {
            categoryList: categoryList,
            categoryCount: categoryCount
          },
          { new: true }
        ).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }).then((deletedCategory) => {
      console.log('[Deletion] A category, categoryId :' + categoryId)
      res.status(200).json({ categoryId: categoryId })
    }).catch((err) => console.log(err))
  }).catch((err) => console.log(err))
})

router.get('/food/:id', (req, res) => {
  const { id } = req.params
  Foodv2Schema.findById(id).then((tt) => {
    res.json(tt)
  }).catch((err) => console.log(err))
})

router.get('/all', (req, res) => {
  MenuSchema.find().populate({
    path: 'categoryList.category',
    populate: {
      path: 'foodList.food'
    }
  }).then((tt) => {
    res.json(tt)
  }).catch((err) => console.log(err))
})

router.get('/', (req, res) => res.status(200).send(JSON.stringify('Welcome to MENUS!')))

module.exports = router
