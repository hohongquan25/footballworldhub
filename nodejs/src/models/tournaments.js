'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournaments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tournaments.hasMany(models.News, {foreignKey: 'tournamentsId'})
      Tournaments.belongsTo(models.Countries, {foreignKey: 'countryId'})
    }
  };
  //old
  // tournamentsName: DataTypes.STRING,
  //   startDate: DataTypes.DATE,
  //   endDate: DataTypes.DATE,
  Tournaments.init({
    tournamentName: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    tournamentLogo: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Tournaments',
  });
  return Tournaments;
}; 