const catchAsync = require("../utils/catchAsync")
const Category = require("../models/category.model")

exports.allCategories = catchAsync(async(req, res) => {
    const categories = await Category.findAll({
        where: {
            status: "active"
        }
    })

    return res.status(200).json({
        status: "Success",
        categories
    })
})