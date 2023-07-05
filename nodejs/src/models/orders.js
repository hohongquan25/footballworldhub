'use strict';
const {
  Model, INET, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Products, {foreignKey: 'productId'})
    }
  };

  Orders.init({
    customerName: DataTypes.STRING,
    customerAddress: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    totalAmount:DataTypes.DECIMAL,
    
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
}; 