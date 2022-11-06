"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EatDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
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
