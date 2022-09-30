"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackagePrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // PackagePrice.belongsTo(models.ApplyDate, {
      //   foreignKey: "applydateId",
      //   targetKey: "id",
      //   as: "applyDateDataToPackagePrice",
      // });
      PackagePrice.belongsTo(models.MedicalPackage, {
        foreignKey: "medicalpackageId",
        targetKey: "id",
        as: "medicalPackageDataToPackagePrice",
      });
    }
  }
  PackagePrice.init(
    {
      price: DataTypes.STRING,
      applydateId: DataTypes.STRING,
      medicalpackageId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PackagePrice",
    }
  );
  return PackagePrice;
};
