"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medical.belongsTo(models.MedicalType, {
        foreignKey: "medicaltypeId",
        targetKey: "id",
        as: "medicalTypeDataToMedical",
      });
      Medical.belongsTo(models.Donvitinh, {
        foreignKey: "donvitinhId",
        targetKey: "id",
        as: "donvitinhDataToMedical",
      });
      Medical.belongsTo(models.Nhacungcap, {
        foreignKey: "nhacungcapId",
        targetKey: "id",
        as: "nhacungcapDataToMedical",
      });
    }
  }
  Medical.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      nhacungcapId: DataTypes.STRING,
      donvitinhId: DataTypes.STRING,
      medicalTypeId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Medical",
    }
  );
  return Medical;
};
