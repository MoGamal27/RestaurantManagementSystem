const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.orderValidator = [
    check('user_id').notEmpty().withMessage('user ID is required'),
    check('total_amount').notEmpty().withMessage('Total amount is required'),
    validatorMiddleware,
];