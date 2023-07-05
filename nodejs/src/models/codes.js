'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Codes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Codes.hasMany(models.User, {foreignKey: 'userRole', as: 'userRoleData'})
      Codes.hasMany(models.User, {foreignKey: 'Gender', as: 'genderData'})
      Codes.hasMany(models.Players, {foreignKey: 'positionId', as: 'positionData'})     
    }
  };
  
  Codes.init({
    Key: DataTypes.STRING,
    Type: DataTypes.STRING,
    Value: DataTypes.STRING,
     
  }, {
    sequelize,
    modelName: 'Codes',
  });
  return Codes;
}; 