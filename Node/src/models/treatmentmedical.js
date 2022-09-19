"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TreatmentMedical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // TreatmentMedical.belongsTo(models.Treatment, {
      //   foreignKey: "treatmentId",
      //   targetKey: "id",
      //   as: "treatmentDataToTreatmentMedical",
      // });
      // TreatmentMedical.belongsTo(models.Medical, {
      //   foreignKey: "medicalId",
      //   targetKey: "id",
      //   as: "medicalDataToTreatmentMedical",
      // });
    }
  }
  TreatmentMedical.init(
    {
      medicalId: DataTypes.STRING,
      treatmentId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TreatmentMedical",
    }
  );
  return TreatmentMedical;
};
