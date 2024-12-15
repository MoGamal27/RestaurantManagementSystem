'use strict';
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - role
 *      properties:
 *        name:
 *          type: string
 *          default: mohamed
 *        email:
 *          type: string
 *          default: mohamednn@gmail.com
 *        password:
 *          type: string
 *          default: 12345678
 *        role:
 *          type: string
 *          default: USER
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: mohamednn@gmail.com
 *        password:
 *          type: string
 *          default: 12345678
 */

 
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.orders, {
        foreignKey: 'user_id',
      })
      User.hasMany(models.Token, {
        foreignKey: 'user_id'
      })
  }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name cannot be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email is required' },
          isEmail: { msg: 'Invalid email format' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password cannot be empty' },
        },
      },
      role: {
        type: DataTypes.ENUM('ADMIN', 'STAFF', 'USER'),
        defaultValue: 'USER',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

