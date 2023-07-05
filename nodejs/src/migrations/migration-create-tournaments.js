'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tournaments', {

      // tournamentName: DataTypes.STRING,
      // countryId: DataTypes.STRING,
      // tournamentLogo: DataTypes.STRING,
        
    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tournamentName: {
        type: Sequelize.STRING
      },
      countryId: {
        type: Sequelize.INTEGER
      },
      tournamentLogo: {
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
    await queryInterface.dropTable('Tournaments');
  }
};