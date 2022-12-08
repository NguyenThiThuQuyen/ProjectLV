"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReservationTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReservationTicket.belongsTo(models.MedicalPackage, {
        foreignKey: "medicalpackageId",
        targetKey: "id",
        as: "goituvanDataToPhieudatcho",
      });

      ReservationTicket.belongsTo(models.Schedule, {
        foreignKey: "scheduleId",
        targetKey: "id",
        as: "scheduleDataToPhieudatcho",
      });

      ReservationTicket.belongsTo(models.Patient, {
        foreignKey: "patientId",
        targetKey: "id",
        as: "patientDataToPhieudatcho",
      });

      ReservationTicket.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "doctorDataToPhieudatcho",
      });

      ReservationTicket.hasMany(models.Receipt, {
        foreignKey: "reservationTicketId",
        as: "phieudatchoDataToReceipt",
      });

      ReservationTicket.hasMany(models.Prescription, {
        foreignKey: "reservationTicketId",
        as: "reservationTicketDataToPrescription",
      });
    }
  }
  ReservationTicket.init(
    {
      bookingDate: DataTypes.DATE,
      arrivalDate: DataTypes.DATE,
      status: DataTypes.STRING,
      medicalpackageId: DataTypes.STRING,
      scheduleId: DataTypes.STRING,
      patientId: DataTypes.STRING,
      doctorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ReservationTicket",
    }
  );
  return ReservationTicket;
};
