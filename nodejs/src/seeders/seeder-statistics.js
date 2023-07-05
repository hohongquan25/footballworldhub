'use strict';

module.exports = {
  // user_id: DataTypes.INTEGER,
  //   user_name: DataTypes.STRING,
  //   user_pass: DataTypes.STRING,
  //   birth_day: DataTypes.DATE,
  //   email: DataTypes.STRING,
  //   full_name: DataTypes.STRING,
  //   gender: DataTypes.BOOLEAN,
  //   registration_date: DataTypes.DATE,
  //   last_login: DataTypes.DATE,
  //   user_role: DataTypes.INTEGER,
  //   user_status: DataTypes.STRING

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statistics', [{
        matchId: 1,
        homeTeamGoals: 3,
        awayTeamGoals: 1,
        possessionHome: '70%',
        possessionAway: '30%',
        shotsHome: 9,
        shotsAway: 2,
        yellowCard: 3,
        redCard: 0,    
        cornerHome: 7,
        cornerAway: 6,
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
