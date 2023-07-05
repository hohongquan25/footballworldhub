'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Matches.belongsTo(models.Clubs,{ foreignKey:'clubIdHome'});
      Matches.belongsTo(models.Clubs, { as: 'homeTeam', foreignKey: 'clubIdHome' });
      Matches.belongsTo(models.Clubs, { as: 'awayTeam', foreignKey: 'clubIdAway' });
      Matches.belongsTo(models.Tournaments, { as: 'tournaments', foreignKey: 'tournamentsId' });
      Matches.belongsTo(models.Codes, { as: 'status', foreignKey: 'matchStatus' }); 

    }
  };
  // matchDate: DataTypes.STRING,
  // matchTime: DataTypes.STRING,
  // teamId: DataTypes.INTEGER,
  // matchHomeTeam: DataTypes.STRING,
  // matchAwayTeam: DataTypes.STRING,
  // matchStatus: DataTypes.STRING,
  // countryId: DataTypes.STRING,
  // leagueId: DataTypes.STRING,
  // matchStadium: DataTypes.STRING,
  // matchGoalHome: DataTypes.STRING,
  // matchGoalAway: DataTypes.STRING,
  Matches.init({
    
    matchDate: DataTypes.DATE,
    matchTime: DataTypes.STRING,
    clubIdHome: DataTypes.INTEGER,
    clubIdAway: DataTypes.INTEGER,
    matchStatus: DataTypes.INTEGER,
    tournamentsId: DataTypes.INTEGER,
    matchGoalHome: DataTypes.STRING,
    matchGoalAway: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Matches',
  });
  return Matches;
}; 