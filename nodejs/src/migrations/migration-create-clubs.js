'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clubs', {

      // clubName: DataTypes.STRING,
      // clubLogo: DataTypes.STRING,
      // clubStadium: DataTypes.STRING,
      // CountryId: DataTypes.STRING,  
      // clubCoach: DataTypes.STRING,  
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clubName: {
        type: Sequelize.STRING
      },
      clubLogo: {
        type: Sequelize.STRING
      },
      clubStadium: {
        type: Sequelize.STRING
      },
      CountryId: {
        type: Sequelize.INTEGER
      },
      tournamentsId: {
        type: Sequelize.INTEGER
      },
      clubCoach: {
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
    await queryInterface.dropTable('Clubs');
  }
};