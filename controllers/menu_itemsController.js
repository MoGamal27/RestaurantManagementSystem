const { Menu_items } = require('../models');
const appError = require('../utils/appError');
const HandlerFactory = require('./handlerFactory');


/**
 * @desc    Create new menu_items
 * @route   POST api/menu_items
 * @access  Admin only
 */
exports.createMenu_items = HandlerFactory.createOne(Menu_items)

/**
 * @desc    Get all menu_items
 * @route   GET api/menu_items
 * @access  Public
 */ 
exports.getAllMenu_items = HandlerFactory.getAll(Menu_items)

/**
 * @desc  Get menu_items by ID
 * @route   GET api/menu_items/detail/:id
 * @access  Public
 */ 
exports.getMenu_items = HandlerFactory.getOne(Menu_items)

/**
 * @desc    Update menu_items
 * @route   PUT api/menu_items/:id
 * @access  Admin only
 */
exports.updateMenu_items = HandlerFactory.updateOne(Menu_items)

/**
 * @desc    Delete menu_items
 * @route   DELETE api/menu_items/:id
 * @access  Admin only
 */ 
exports.deleteMenu_items = HandlerFactory.deleteOne(Menu_items)

/**
 * @desc    Get menu_items by category
 * @route   GET api/menu_items/category/:category_id
 * @access  Public
 * @returns {object} - menu_items 
 */
exports.getMenu_itemsByCategory = async (req, res, next) => {
    const { category_id } = req.params;

    if (!category_id) {
      return next(new appError('category_id is required'));
    }

  try {
    const menu_items = await Menu_items.findAll({
      where: {
        category_id: category_id
      }
    });
    res.status(200).json({
      status: 'success',
      results: menu_items.length,
      data: {
        menu_items,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get menu_items by sort price
 * @route   GET api/menu_items/:price
 * @access  Public
 * @returns {object} - menu_items 
 */
exports.getMenu_itemsBySortPrice = async (req, res, next) => {
    const { price } = req.params;

    if (!price === 'asc' && price === 'desc') {
      return next(new appError('price must be asc or desc'));
    }

  try {
    const menu_items = await Menu_items.findAll({
        order: [
          ['price', price.toUpperCase()],
        ]
        });
        res.status(200).json({
          status: 'success',
          results: menu_items.length,
          data: {
            menu_items,
          },
        })
        }
        catch(err) {
            console.log(err);
          next(err);
        }
        };


