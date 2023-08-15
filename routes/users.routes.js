const express = require("express")

const usersController = require("../controllers/users.controller")

const validUser = require("../middlewares/users.middleware")

const router = express.Router()

router
.route("/")
.get(usersController.allUsers)
.post(usersController.createUser)

router
.route("/:id")
.patch(validUser.validIfExistUser, usersController.updateUser)
.get(validUser.validIfExistUser, usersController.findOneUser)
.delete(validUser.validIfExistUser, usersController.deleteUser)

router.post("/login", usersController.loginUser)


module.exports = router