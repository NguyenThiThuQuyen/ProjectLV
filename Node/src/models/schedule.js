"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.TimeSlot, {
        foreignKey: "timeslotId",
        targetKey: "id",
        as: "timeSlotDataToSchedule",
      });

      Schedule.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userDataToSchedule",
      });

      Schedule.hasMany(models.ReservationTicket, {
        foreignKey: "scheduleId",
        as: "scheduleDataToPhieudatcho",
      });
    }
  }
  Schedule.init(
    {
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      registerDate: DataTypes.DATE,
      timeslotId: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
