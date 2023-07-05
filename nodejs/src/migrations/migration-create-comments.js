'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {

        // contentHTML: DataTypes.TEXT('long'),
        // contentMarkdown: DataTypes.TEXT('long'),
        // description: DataTypes.TEXT('long'),
        // newId: DataTypes.INTEGER,
        // playerId: DataTypes.INTEGER,
        
    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameAuthor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      commentContent: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      newId: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Comments');
  }
};