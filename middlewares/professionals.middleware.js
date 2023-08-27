const AppError = require("../utils/appError")
const catchAsyn = require("../utils/catchAsync")
const Professional = require("../models/professionals.model")
const Review = require("../models/reviews.model")
const Job = require("../models/jobs.model")
const Category = require("../models/category.model")
const User = require("../models/users.model")

exports.validIfExistProfessional = catchAsyn(async(req, res, next) => {
    const {id} = req.params

    const professional = await Professional.findOne({
        where: {
            id,
            status: "active"
        },
        include: [
            {
                model: Review,
                
                include: [
                    {model: User}
                ],
                
            },
            {
                model: Category
            },
            {
                model: Job,
                where: { status: "active" },
            },
        ],
        order: [[{model: Review}, "id", "DESC"]]
       
    },
    
    )

    if(!professional){
        return next(new AppError(`Professional id: ${id} not found`))
    }

    console.log(professional);

    req.professional = professional
    next()
})