"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prescription.belongsTo(models.Menu, {
        foreignKey: "menuId",
        targetKey: "id",
        as: "menuDataToPrescription",
      });
    }
  }
  Prescription.init(
    {
      dateCreate: DataTypes.DATE,
      loidan: DataTypes.STRING,
      menuId: DataTypes.STRING,
      reservationTicketId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
