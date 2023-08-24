const express = require("express")

const usersController = require("../controllers/users.controller")

const validUser = require("../middlewares/users.middleware")
const validationsUser = require("../middlewares/validations.middleware")

const router = express.Router()

router
.route("/")
.get(usersController.allUsers)
.post(validationsUser.createUser, usersController.createUser)

router
.route("/:id")
.patch(validUser.validIfExistUser, usersController.updateUser)
.get(validUser.validIfExistUser, usersController.findOneUser)
.delete(validUser.validIfExistUser, usersController.deleteUser)

router.post("/login", usersController.loginUser)


module.exports = router