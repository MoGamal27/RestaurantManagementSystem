const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.menu_itemsValidator = [
  check('name')
    .notEmpty()
    .withMessage('Menu item name is required')
    .isLength({ min: 3 })
    .withMessage('Too short menu item name')
    .isLength({ max: 32 })
    .withMessage('Too long menu item name'),

    check('description')
    .notEmpty()
    .withMessage('Menu item description is required')
    .isLength({ min: 3 })
    .withMessage('Too short menu item description'),

    check('price')
    .notEmpty()
    .withMessage('Menu item price is required')
    .isNumeric()
    .withMessage('Menu item price must be a number'),

    check('category_id')
    .notEmpty()
    .withMessage('Menu item category is required')
    .isNumeric()
    .withMessage('Menu item category must be a number'),

    validatorMiddleware,

];
