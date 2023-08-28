'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsToMany(models.roles, {
        through: models.user_roles,
        as: 'users_roles',
        foreignKey: 'user_id'
      });

      Users.belongsToMany(models.permissions, {
        through: models.user_permission,
        as: 'users_permission',
        foreignKey: 'user_id'
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  });
  return Users;
};