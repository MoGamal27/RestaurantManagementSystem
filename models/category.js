'use strict';
const {
  Model
} = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Main Course
 *        description:
 *          type: string
 *          default: Main dishes served as primary courses
 */


module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Menu_items, {
        foreignKey: 'category_id'
      });
    }
  }
  Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A category title is required'
        }
    }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A category description is required'
        }
    }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};