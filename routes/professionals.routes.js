const express = require("express")

const professionalsController = require("../controllers/professionals.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const validProfessional = require("../middlewares/professionals.middleware")
const validations = require("../middlewares/validations.middleware")

const router = express.Router()

router
.route("/")
.get(professionalsController.allProfessionals)
.post(validations.createProfessional, professionalsController.createProfessional)

router.post("/login", professionalsController.login)

router.get("/categories/:id", professionalsController.professionalsByCategory)

router.get("/me", authMiddleware.protectProfessional, professionalsController.MyPerfilProfessional)

router
.route("/:id")
.patch(validProfessional.validIfExistProfessional, professionalsController.updateProfessional)
.delete(validProfessional.validIfExistProfessional, professionalsController.deleteProfessional)

router.get("/:id", authMiddleware.protect, validProfessional.validIfExistProfessional, professionalsController.findOneProfessional)

//router.get("/reviews", professionalsController.allReviews)

router.post("/reviews/:id", authMiddleware.protect, validations.reviewsRating, professionalsController.createReview)

router.get("/myreviews/:id", authMiddleware.protect, professionalsController.findMyReviews)




module.exports = router