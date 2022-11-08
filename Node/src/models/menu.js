"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.hasMany(models.EatDetail, {
        foreignKey: "menuId",
        as: "menuDataToEatDetail",
      });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,

      monan: DataTypes.STRING,
      congthuc: DataTypes.STRING,
      gioan: DataTypes.STRING,
      ghichu: DataTypes.STRING,
      eatdateId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
