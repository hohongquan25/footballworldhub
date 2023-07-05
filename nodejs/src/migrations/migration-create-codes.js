'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Codes', {
  
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          Key: {
            type: Sequelize.STRING
          },
          Type: {
            type: Sequelize.STRING
          },
          Value: {
            type: Sequelize.STRING
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
    await queryInterface.dropTable('Codes');
  }
};