"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrescriptionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PrescriptionDetail.belongsTo(models.Medical, {
        foreignKey: "medicalId",
        targetKey: "id",
        as: "medicalDataToPrescriptionDetail",
      });
      PrescriptionDetail.belongsTo(models.Prescription, {
        foreignKey: "prescriptionId",
        targetKey: "id",
        as: "prescriptionDataToPrescriptionDetail",
      });
    }
  }
  PrescriptionDetail.init(
    {
      lieudung: DataTypes.STRING,
      cachdung: DataTypes.STRING,
      soluong: DataTypes.STRING,
      solandung: DataTypes.STRING,
      ghichu: DataTypes.STRING,
      medicalId: DataTypes.STRING,
      prescriptionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PrescriptionDetail",
    }
  );
  return PrescriptionDetail;
};
