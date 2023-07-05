'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('News', {

        // new_id: DataTypes.INTEGER,
        // new_title: DataTypes.STRING,
        // new_content: DataTypes.STRING,
        // author: DataTypes.STRING,
        // publish_date: DataTypes.DATE,
        // tournaments_id: DataTypes.INTEGER,
    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      newTitle: {
        type: Sequelize.STRING
      },
      newContent: {
        type: Sequelize.TEXT
      },
      imageNew: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      tournamentsId: {
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.INTEGER
      },
      clubId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        }
      }
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('News');
  }
};