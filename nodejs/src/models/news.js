'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.hasOne(models.Markdown,{ foreignKey:'newId'})
      News.belongsTo(models.Tournaments, {foreignKey: 'tournamentsId'})
      News.belongsTo(models.Clubs, {foreignKey: 'clubId'})
      News.hasMany(models.Comment, { foreignKey: 'newId' });
      // News.belongsTo(models.Players, {foreignKey: 'playerId'})
    }
  };
  
  News.init({
	newTitle: DataTypes.STRING,
	newContent: DataTypes.TEXT,
  imageNew: DataTypes.STRING,
	userId: DataTypes.STRING,
	tournamentsId: DataTypes.INTEGER,
	playerId: DataTypes.INTEGER,
	clubId: DataTypes.INTEGER,

    
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
}; 