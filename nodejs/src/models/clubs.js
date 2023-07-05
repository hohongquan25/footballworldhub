'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clubs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clubs.hasMany(models.News, {foreignKey: 'clubId'})
      Clubs.belongsTo(models.Countries, {foreignKey: 'countryId'})
    }
  };
  //old
  // clubName: DataTypes.STRING,
  //   clubLogo: DataTypes.STRING,
  //   establishmentDate: DataTypes.DATE,
  //   Stadium: DataTypes.STRING,
  //   clubCountry: DataTypes.STRING,  
  Clubs.init({
    clubName: DataTypes.STRING,
    clubLogo: DataTypes.STRING,
    clubStadium: DataTypes.STRING,
    CountryId: DataTypes.INTEGER,  
    tournamentsId: DataTypes.INTEGER,
    clubCoach: DataTypes.STRING,  
  }, {
    sequelize,
    modelName: 'Clubs',
  });
  return Clubs;
}; 