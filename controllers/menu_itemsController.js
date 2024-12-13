const { Menu_items } = require('../models');
const appError = require('../utils/appError');
const HandlerFactory = require('./handlerFactory');

exports.createMenu_items = HandlerFactory.createOne(Menu_items)

exports.getAllMenu_items = HandlerFactory.getAll(Menu_items)

exports.getMenu_items = HandlerFactory.getOne(Menu_items)

exports.updateMenu_items = HandlerFactory.updateOne(Menu_items)

exports.deleteMenu_items = HandlerFactory.deleteOne(Menu_items)

// filter by category
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

// filter by sort price
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


