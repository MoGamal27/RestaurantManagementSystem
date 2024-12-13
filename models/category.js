'use strict';
const {
  Model
} = require('sequelize');
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