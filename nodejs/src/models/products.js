'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };

  Products.init({
    productName: DataTypes.STRING,
    productImage: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
}; 