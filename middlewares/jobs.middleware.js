const Job = require("../models/jobs.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.validIfExistJob = catchAsync(async(req, res, next) => {
    const {id} = req.params

    const job = await Job.findOne({
        where: {
            id,
            status: "active"
        }
    })

    if(!job) {
        return next(new AppError(`Job id: ${id} not found`, 404))
    }

    req.job = job
    next()
})

