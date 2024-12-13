'use strict';
const {
  Model
} = require('sequelize');
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