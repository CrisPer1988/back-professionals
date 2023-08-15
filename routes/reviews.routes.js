const express = require("express")

const reviewsController = require("../controllers/reviews.controller")
// const authMiddleware = require("../middlewares/auth.middleware")
// const validProfessional = require("../middlewares/professionals.middleware")

const router = express.Router()

router.get("/:id", reviewsController.allReviews)




module.exports = router