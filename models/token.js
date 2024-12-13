'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  Token.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: { 
      type: DataTypes.DATE,
      expires: 3600
    }
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};