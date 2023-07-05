'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {

    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING
      },
      customerAddress: {
        type: Sequelize.STRING
      },
      customerPhone: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT('Long')
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};