'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Players', {

      // playerName: DataTypes.STRING,
      // countryId: DataTypes.STRING,
      // playerAge: DataTypes.DATE,
      // playerNumber: DataTypes.STRING,
      // positionId: DataTypes.STRING,
      // clubId: DataTypes.STRING,
      // playerImgae: DataTypes.STRING,

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerName: {
        type: Sequelize.STRING
      },
      countryId: {
        type: Sequelize.STRING
      },
      playerAge: {
        type: Sequelize.DATE
      },
      playerNumber: {
        type: Sequelize.STRING
      },
      positionId: {
        type: Sequelize.STRING
      },
      clubId: {
        type: Sequelize.STRING
      },
      playerImgae: {
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
    await queryInterface.dropTable('Players');
  }
};