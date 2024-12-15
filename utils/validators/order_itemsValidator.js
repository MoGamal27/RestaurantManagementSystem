const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.order_itemsValidator = [
    check('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .custom((value, { req }) => {
        if (value <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        return true;
    }),


    check('menuItemId')
    .notEmpty()
    .withMessage('Menu item ID is required'),

    validatorMiddleware
]