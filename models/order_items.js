'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    OrderItem:
 *      type: object
 *      required:
 *        - quantity
 *        - unit_price
 *        - subtotal
 *        - menu_item_id
 *        - order_id
 *      properties:
 *        quantity:
 *          type: integer
 *          minimum: 1
 *          description: Quantity of menu items
 *        unit_price:
 *          type: number
 *          format: decimal
 *          minimum: 0
 *          description: Price per unit
 *        subtotal:
 *          type: number
 *          format: decimal
 *          minimum: 0
 *          description: Total price for this item
 *        menu_item_id:
 *          type: integer
 *          description: Reference to menu item
 *        order_id:
 *          type: integer
 *          description: Reference to order
 *
 */ 
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    static associate(models) {
      order_items.belongsTo(models.orders, {
        foreignKey: 'order_id',
        as: 'order'
      })
      order_items.belongsTo(models.Menu_items, {
        foreignKey: 'menu_item_id',
        as: 'menu_item'
      })
    }
  }
  order_items.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Quantity is required'},
        isInt: true,
        min: 1,
      }
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Unit price is required'},
        isDecimal: true,
        min: 0,
      }
    },
    subtotal: { 
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Subtotal is required'},
        isDecimal: true,
        min: 0,
      }
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Menu item id is required'},
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Order id is required'},
      }
    }
  }, {
    sequelize,
    modelName: 'order_items',
  });
  return order_items;
};