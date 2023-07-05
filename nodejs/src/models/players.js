'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Players.hasMany(models.News, {foreignKey: 'playerId'})
      Players.belongsTo(models.Clubs, { as: 'club', foreignKey: 'clubId' });
      Players.belongsTo(models.Countries, { as: 'country', foreignKey: 'countryId' });
      Players.belongsTo(models.Codes, { as: 'position', foreignKey: 'positionId' }); 
      Players.hasOne(models.Markdown,{ foreignKey:'playerId'})

    }
  };
  
  Players.init({
    playerName: DataTypes.STRING,
    countryId: DataTypes.STRING,
    playerAge: DataTypes.DATE,
    playerNumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
    clubId: DataTypes.STRING,
    playerImgae: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
}; 