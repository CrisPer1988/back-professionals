const express = require("express")

const professionalsController = require("../controllers/professionals.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const validProfessional = require("../middlewares/professionals.middleware")

const router = express.Router()

router
.route("/")
.get(professionalsController.allProfessionals)
.post(professionalsController.createProfessional)

router.post("/login", professionalsController.login)

router.get("/me", authMiddleware.protectProfessional, professionalsController.MyPerfilProfessional)

router
.route("/:id")
.patch(validProfessional.validIfExistProfessional, professionalsController.updateProfessional)
.delete(validProfessional.validIfExistProfessional, professionalsController.deleteProfessional)
.get(validProfessional.validIfExistProfessional, professionalsController.findOneProfessional)

//router.get("/reviews", professionalsController.allReviews)

router.post("/reviews/:id", authMiddleware.protect, professionalsController.createReview)

router.get("/myreviews/:id", authMiddleware.protect, professionalsController.findMyReviews)



module.exports = router