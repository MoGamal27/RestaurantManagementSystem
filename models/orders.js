'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - total_amount
 *        - user_id
 *      properties:
 *        status:
 *          type: string
 *          enum: [pending, completed, expired]
 *          default: pending
 *        total_amount:
 *          type: integer
 *          minimum: 0
 *        user_id:
 *          type: integer
 *        createdAt:
 *          type: string
 *          format: date-time
 *
 */
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    static associate(models) {
      orders.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
      orders.hasMany(models.order_items, {
        foreignKey: 'order_id',
        as: 'order_items'
      })
    }
  }
  orders.init({
    status: { 
      type: DataTypes.ENUM,
      values: ['pending', 'completed', 'expired'],
      defaultValue: 'pending',
    },   
    total_amount: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      }
      },
      user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};