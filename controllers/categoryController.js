const { Category } = require('../models');
const HandlerFactory = require('./handlerFactory');

/**
 * @route POST api/categories
 * @desc Create a category
 * @access Admin only
 * */
exports.createCategory = HandlerFactory.createOne(Category)


/**
 * @route GET api/categories
 * @desc Get all categories
 * @access Public
 * */
exports.getAllCategories = HandlerFactory.getAll(Category)


/**
 * @route GET api/categories/:id
 * @desc Get a single category
 * @access Public
 */
exports.getCategory = HandlerFactory.getOne(Category)


/**
 * @route PUT api/categories/:id
 * @desc Update a category
 * @access Admin only
 */ 
exports.updateCategory = HandlerFactory.updateOne(Category)


/**
 * @route DELETE api/categories/:id
 * @desc Delete a category
 * @access Admin only
 */
exports.deleteCategory = HandlerFactory.deleteOne(Category)