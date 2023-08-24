const express = require("express")

const categoriesController = require("../controllers/categories.controller")


const router = express.Router()

router.get("/", categoriesController.allCategories)


module.exports = router