'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.News,{ foreignKey:'newId'})
    }
  };
  
  Comment.init({
	  nameAuthor: DataTypes.STRING,
	  commentContent: DataTypes.TEXT('long'),
	  newId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
}; 