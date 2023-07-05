'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matchDate: {
        type: Sequelize.DATE
      },
      matchTime: {
        type: Sequelize.STRING
      },
      clubIdHome: {
        type: Sequelize.INTEGER
      },
      clubIdAway: {
        type: Sequelize.INTEGER
      },
      matchStatus: {
        type: Sequelize.STRING
      },
      tournamentsId: {
        type: Sequelize.INTEGER
      },
      matchGoalHome: {
        type: Sequelize.STRING
      },
      matchGoalAway: {
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
    await queryInterface.dropTable('Matches');
  }
};