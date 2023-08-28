const Professional = require("../models/professionals.model")
const Category = require("../models/category.model")
const catchAsync = require("../utils/catchAsync")
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const Review = require("../models/reviews.model");
const Job = require("../models/jobs.model");
const AppError = require("../utils/appError");

const { Op, fn, col } = require('sequelize');


// exports.createProfessional = catchAsync(async(req, res) => {
//     const {name, email, password, name_category, number_tel} = req.body

//     const salt = await bcrypt.genSalt(8);
//         const encryptedPassword = await bcrypt.hash(password, salt);

//         // Crea el profesional
//         const professional = await Professional.create({
//             name,
//             email,
//             password: encryptedPassword,
//             number_tel,
//         });

//         // Busca o crea la categoría si aún no existe
//         let category = await Category.findOne({
//             where: {
//                 name_category,
//             },
//         });

//         if (!category) {
//             category = await Category.create({
//                 name_category,
//             });
//         }

//         // Asocia el profesional a la categoría
//         //await professional.addCategory(category);

//         const token = generateJWT(professional.id);

//         return res.status(201).json({
//             status: "Success",
//             token,
//             professional,
//         });})

exports.createProfessional = catchAsync(async (req, res) => {
    try {
        const { name, email, password, cat_name, number_tel } = req.body;

        const salt = await bcrypt.genSalt(8);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const professional = await Professional.create({
            name,
            email,
            cat_name,
            password: encryptedPassword,
            number_tel,
        });

        const [category] = await Category.findOrCreate({
            where: {
                name_category: cat_name
            },
        });

        await professional.addCategory(category);

        const token = generateJWT(professional.id);

        return res.status(201).json({
            status: "Success",
            token,
            professional,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "Error al crear el profesional",
        });
    }
});


exports.MyPerfilProfessional = catchAsync(async(req, res) => {
    const {sessionProfessional} = req

    const professional = await Professional.findOne({
        where: {
            status: "active",
            id: sessionProfessional.id
        }
    })

    return res.status(200).json({
        status: "Success",
        professional
    })
})

exports.allProfessionals = catchAsync(async(req, res) => {
    const professionals = await Professional.findAll({
        where: {status: "active"},
        include: [
            {
              model: Job,  
              where: { status: "active" },
            },
            {
                model: Review,
            },
            {
                model: Category,
                attributes: [
                    'id',
                    [fn('UPPER', col('name_category')), 'name_category']
                ]
            }
          ],  
    })

    return res.status(200).json({
        status: "Success",
        results: professionals.length,
        professionals
    })
})

exports.findOneProfessional = catchAsync(async(req, res) => {
    const {professional} = req

    return res.status(200).json({
        status: "Success",
        professional
    })
})

exports.updateProfessional = catchAsync(async(req, res) => {
    const {professional} = req
    const {name, category} = req.body

    await professional.update({
        name, category
    })

    return res.status(200).json({
        status: "Success",
        professional
    })


})

exports.deleteProfessional = catchAsync(async(req,res) => {
    const {professional} = req;

    await professional.update({
        status: "disable"
    });

    res.status(200).json({
        status: "Success",
        message: "Professional deleted"
    })
})

exports.createReview = catchAsync(async(req, res) => {
    const {sessionUser} = req
    const {id} = req.params
    const {rating, comment} = req.body

    const review = await Review.create({
        comment, rating, user_id:sessionUser.id, professional_id:id
    })

    return res.status(201).json({
        status: "Success",
        review
    })
})

// exports.allReviews = catchAsync(async(req, res) => {
//     const reviews = await Review.findAll({
//         where: {status: "active"}
//     })

//     return res.status(200).json({
//         status: "Success",
//         reviews
//     })
// })

exports.findMyReviews = catchAsync(async(req, res) => {
    const {id} = req.params
    const {sessionUser} = req

    const myReviews = await Review.findAll({
        where: {
            status: "active",
            user_id: sessionUser.id,
            professional_id: id
        }
    })

    return res.status(200).json({
        status: "Success",
        myReviews
    })
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body

    const professional = await Professional.findOne({
        where: {
            email,
            status: "active"
        }
    })

    if(!professional) {
        return next(new AppError("Professional not foun", 404))
    }

    if(!(await bcrypt.compare(password, professional.password))) {
        return next(new AppError("Incorrect email or password", 401))
    }

    const token = await generateJWT(professional.id)

    return res.status(200).json({
        status: 'Success',
        token,
        professional
      });
})



exports.updateReview = catchAsync(async(req, res) => {
    
})

exports.professionalsByCategory = catchAsync(async(req, res, next) => {
    const {id} = req.params


    const categories = await Category.findOne({
        where: {
            id
        },
        include: [
            {model: Professional,
                include:[{model:Job}]
                
            }
            
        ]  
    })
    

    return res.status(200).json({
        status: "Succes",
        categories
    })

})

