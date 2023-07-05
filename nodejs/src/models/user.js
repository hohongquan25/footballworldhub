'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Codes, {foreignKey: 'userRole', targetKey: 'Key', as:'userRoleData' })
      User.belongsTo(models.Codes, {foreignKey: 'Gender', targetKey: 'Key', as:'genderData' })    
    }
  };
  User.init({
    userName: DataTypes.STRING,
    passWord: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    Gender: DataTypes.STRING,
    Avatar: DataTypes.STRING,
    Address1: DataTypes.STRING,
    Address2: DataTypes.STRING,
    userRole: DataTypes.STRING,
    userStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};