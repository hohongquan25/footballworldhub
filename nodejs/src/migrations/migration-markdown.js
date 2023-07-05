'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Markdowns', {

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
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      newId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      playerId: {
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
    await queryInterface.dropTable('Markdowns');
  }
};