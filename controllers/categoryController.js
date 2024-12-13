const { Category } = require('../models');
const HandlerFactory = require('./handlerFactory');

exports.createCategory = HandlerFactory.createOne(Category)

exports.getAllCategories = HandlerFactory.getAll(Category)

exports.getCategory = HandlerFactory.getOne(Category)

exports.updateCategory = HandlerFactory.updateOne(Category)

exports.deleteCategory = HandlerFactory.deleteOne(Category)