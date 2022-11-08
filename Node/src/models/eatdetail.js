"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EatDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EatDetail.belongsTo(models.EatDate, {
        foreignKey: "eatdateId",
        targetKey: "id",
        as: "eatDateDataToEatDetail",
      });

      EatDetail.belongsTo(models.Menu, {
        foreignKey: "menuId",
        targetKey: "id",
        as: "menuDataToEatDetail",
      });

      EatDetail.belongsTo(models.Dish, {
        foreignKey: "dishId",
        targetKey: "id",
        as: "dishDataToEatDetail",
      });
    }
  }
  EatDetail.init(
    {
      gioan: DataTypes.STRING,
      huongdanan: DataTypes.STRING,
      solan: DataTypes.STRING,
      ghichu: DataTypes.STRING,
      menuId: DataTypes.STRING,
      dishId: DataTypes.STRING,
      eatdateId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EatDetail",
    }
  );
  return EatDetail;
};
