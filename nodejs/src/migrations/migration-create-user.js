'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {

    //   userName: DataTypes.STRING,
    // passWord: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // email: DataTypes.STRING,
    // birthDay: DataTypes.DATE,
    // Gender: DataTypes.BOOLEAN,
    // Address1: DataTypes.STRING,
    // Address2: DataTypes.STRING,
    // userRole: DataTypes.STRING,
    // userStatus: DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      passWord: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      birthDay: {
        type: Sequelize.DATE
      },
      Gender: {
        type: Sequelize.STRING
      }, 
      Avatar: {
        type: Sequelize.STRING
      },
      Address1: {
        type: Sequelize.STRING
      },
      Address2: {
        type: Sequelize.STRING
      },
      userRole: {
        type: Sequelize.STRING
      },
      userStatus: {
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
    await queryInterface.dropTable('Users');
  }
};