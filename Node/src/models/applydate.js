"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApplyDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ApplyDate.hasMany(models.PackagePrice, {
      //   foreignKey: "applydateId",
      //   as: "applyDateDataToPackagePrice",
      // });
    }
  }
  ApplyDate.init(
    {
      applyDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ApplyDate",
    }
  );
  return ApplyDate;
};
