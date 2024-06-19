const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
    .withMessage('Email must be a valid address ending with .com or .in')
    .notEmpty().withMessage('Email is required'),
  body('password').isString().withMessage('Password must be a string').notEmpty().withMessage('Password is required'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('userType').optional().isString().withMessage('User type must be a string'),
  body('mobile').optional().isNumeric().withMessage('Mobile number must be number'),
  // Middleware to check the validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateProduct = [
    body('product').isString().withMessage('Product must be a string').notEmpty().withMessage('Product is required'),
    body('productCategory').optional().isString().withMessage('Product category must be a string'),
    body('productQuantity').optional().isString().withMessage('Product quantity must be a string'),
    body('productPrize').optional().isNumeric().withMessage('Product prize must be a number'),
    body('logisticOwner').optional().isString().withMessage('Logistic owner must be a string'),
  
    // Middleware to check the validation result
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  const validateLogin = [
    body('email')
      .isEmail().withMessage('Invalid email address')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
      .withMessage('Email must be a valid address ending with .com or .in')
      .notEmpty().withMessage('Email is required'),
    body('password')
      .isString().withMessage('Password must be a string')
      .notEmpty().withMessage('Password is required'),
  
    // Middleware to check the validation result
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

module.exports = { validateUser,validateProduct,validateLogin };


