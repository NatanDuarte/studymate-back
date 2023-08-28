'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      permissions.belongsToMany(models.Users, {
        through: models.user_permission,
        as: 'permissions_of_user',
        foreignKey: 'permission_id'
      });

      permissions.belongsToMany(models.roles, {
        through: models.user_permission,
        as: 'permissions_of_roles',
        foreignKey: 'permission_id'
      });
    }
  }
  permissions.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};