"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Receipt.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userDataToReceipt",
      });

      Receipt.belongsTo(models.ReservationTicket, {
        foreignKey: "reservationTicketId",
        targetKey: "id",
        as: "phieudatchoDataToReceipt",
      });
    }
  }
  Receipt.init(
    {
      date: DataTypes.DATE,
      userId: DataTypes.STRING,
      reservationTicketId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Receipt",
    }
  );
  return Receipt;
};
