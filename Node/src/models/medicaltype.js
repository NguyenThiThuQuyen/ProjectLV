"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicalType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MedicalType.hasMany(models.Medical, {
        foreignKey: "medicaltypeId",
        as: "medicalTypeDataToMedical",
      });
    }
  }
  MedicalType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MedicalType",
    }
  );
  return MedicalType;
};
