const {body, validationResult} = require("express-validator")

const validFields = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.mapped(),
      });
    }
  
    next();
  };

  exports.createUser = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Must be a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    validFields,
  ];

  exports.createProfessional = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Must be a valid email'),
    body("cat_name").notEmpty().withMessage("Category cannot be empty"),
    body("number_tel").notEmpty().withMessage("number tel cannot be empty"),
    body('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    validFields,
  ];

  exports.reviewsRating = [
    body('rating').notEmpty().withMessage('Rating cannot be empty')
    .isInt({ min: 1, max: 10 })
    .withMessage('Rating must be a number between 1 and 10'),
    body('comment')
      .notEmpty()
      .withMessage('Comment cannot be empty'),
    validFields,
  ];