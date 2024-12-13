const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.order_itemsValidator = [
    check('user_id')
    .notEmpty()
    .withMessage('User is required')
    .isNumeric()
    .withMessage('User must be a number'),

    check('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a number'),
    validatorMiddleware
]