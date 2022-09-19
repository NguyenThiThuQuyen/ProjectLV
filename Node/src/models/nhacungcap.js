"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nhacungcap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Nhacungcap.hasMany(models.Medical, {
        foreignKey: "nhacungcapId",
        as: "nhacungcapDataToMedical",
      });
    }
  }
  Nhacungcap.init(
    {
      nhacungcap: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Nhacungcap",
    }
  );
  return Nhacungcap;
};
