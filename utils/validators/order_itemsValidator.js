const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.order_itemsValidator = [
    check('order_id')
    .notEmpty()
    .withMessage('Order ID is required')
    .isNumeric()
    .withMessage('Order ID must be a number'),

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

    check('unit_price')
    .notEmpty()
    .withMessage('Unit price is required')
    .isNumeric()
    .withMessage('Unit price must be a number'),

    check('subtotal')
    .notEmpty()
    .withMessage('Subtotal is required')
    .isNumeric()
    .withMessage('Subtotal must be a number'),

    check('menu_item_id')
    .notEmpty()
    .withMessage('Menu item ID is required'),

    validatorMiddleware
]