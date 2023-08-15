const catchAsync = require("../utils/catchAsync")
const Review = require("../models/reviews.model")

exports.allReviews = catchAsync(async(req, res) => {
    const {id} = req.params

    const reviews = await Review.findAll({
        where: {
            status: "active",
            professional_id: id
        }
    })

    return res.status(200).json({
        status: "Success",
        reviews
    })
})