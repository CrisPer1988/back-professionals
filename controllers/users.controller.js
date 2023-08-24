const User = require("../models/users.model")
const catchAsync = require("../utils/catchAsync")
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require("../utils/appError")


exports.createUser = catchAsync(async(req, res) => {
    const {name, email, password} = req.body

     const salt = await bcrypt.genSalt(10);
     const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password:encryptedPassword
    })

    const token = await generateJWT(user.id);

    return res.status(201).json({
        status: "Success",
        token,
        user
    })
})

exports.allUsers = catchAsync(async(req, res) => {
    const users = await User.findAll({
        where: {status: "active"}
    })

    return res.status(200).json({
        status: "Success",
        results: users.length,
        users
    })
})

exports.findOneUser = catchAsync(async(req,res) => {
    const {user} = req

    return res.status(200).json({
        status: "Success",
        user
    })
})

exports.updateUser = catchAsync(async(req, res) => {
    const {user} = req
    const {name} = req.body

    console.log("puto");

    await user.update({
        name
    })

    return res.status(200).json({
        status: "Success",
        user
    })
})

exports.deleteUser = catchAsync(async(req, res) => {
    const {user} = req

    await user.update({
        status: "disable"
    })

    return res.status(200).json({
        status: "Success"
    })
})

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'active',
      },
    });
  
    if (!user) {
      return next(new AppError('The user could not be found', 404));
    }
  
    if (!(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    const token = await generateJWT(user.id);
  
    res.status(200).json({
      status: 'Success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });