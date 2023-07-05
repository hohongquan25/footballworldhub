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
    return queryInterface.bulkInsert('Comments', [{
        userId: 1,
        newId: 1,
        commentContent: 'bai viet rat hay va bo ich',
        commentDate: new Date(),
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
