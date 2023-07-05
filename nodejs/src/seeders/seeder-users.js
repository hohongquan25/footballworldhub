'use strict';

module.exports = {
  // userName: DataTypes.STRING,
  // passWord: DataTypes.STRING,
  // fullName: DataTypes.STRING,
  // email: DataTypes.STRING,
  // birthDay: DataTypes.DATE,
  // Gender: DataTypes.BOOLEAN,
  // Address1: DataTypes.STRING,
  // Address2: DataTypes.STRING,
  // userRole: DataTypes.STRING,
  // userStatus: DataTypes.STRING

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: 'hohongquan',
      passWord: 'quan123',
      fullName: 'ho hong quan',
      email: 'hohongquan25@gmail.com',
      phoneNumber: '0346785893',
      birthDay: new Date(),
      Gender: 'Nam',
      Avatar: '',
      Address1: 'Nghe An',
      Address2: 'Ha Noi',
      userRole: '0',
      userStatus: '1',
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
