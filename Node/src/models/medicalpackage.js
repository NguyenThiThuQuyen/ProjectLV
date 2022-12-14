"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicalPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //   MedicalPackage.hasMany(models.Treatment, {
      //     foreignKey: "medicalpackageId",
      //     as: "medicalPackageDataToTreatment",
      //   });
      MedicalPackage.hasMany(models.PackagePrice, {
        foreignKey: "medicalpackageId",
        as: "medicalPackageDataToPackagePrice",
      });

      MedicalPackage.hasMany(models.ReservationTicket, {
        foreignKey: "medicalpackageId",
        as: "goituvanDataToPhieudatcho",
      });

      //   MedicalPackage.hasMany(models.Schedule, {
      //     foreignKey: "medicalpackageId",
      //     as: "medicalPackageDataToSchedule",
      //   });
      //   MedicalPackage.belongsTo(models.ReservationTicket, {
      //     foreignKey: "reservationticketId",
      //     targetKey: "id",
      //     as: "reservationTicketDataToMedicalPackage",
      //   });
    }
  }
  MedicalPackage.init(
    {
      packageName: DataTypes.STRING,
      packageDecs: DataTypes.STRING,
      detailDecs: DataTypes.STRING,
      image: DataTypes.STRING,
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "MedicalPackage",
    }
  );
  return MedicalPackage;
};
