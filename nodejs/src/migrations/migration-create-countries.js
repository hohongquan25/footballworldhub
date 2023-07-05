'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Countries', {

        // countryName: DataTypes.STRING,
        // countryLogo: DataTypes.STRING,
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countryName: {
        type: Sequelize.STRING
      },
      countryLogo: {
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
    await queryInterface.dropTable('Countries');
  }
};