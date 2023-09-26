'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room.init({
    title: DataTypes.STRING,
    author_id: DataTypes.UUID,
    description: DataTypes.STRING,
    primary_color: DataTypes.STRING,
    secondary_color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};