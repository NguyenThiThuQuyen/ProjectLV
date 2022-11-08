"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EatDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EatDate.hasMany(models.EatDetail, {
        foreignKey: "eatdateId",
        as: "eatDateDataToEatDetail",
      });
    }
  }
  EatDate.init(
    {
      eatdate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EatDate",
    }
  );
  return EatDate;
};
