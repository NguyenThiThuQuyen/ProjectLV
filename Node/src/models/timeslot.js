"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // TimeSlot.belongsTo(models.DayOfWeek, {
      //   foreignKey: "dayofweekId",
      //   targetKey: "id",
      //   as: "dayOfWeekDataToTimeSlot",
      // });
      // TimeSlot.hasMany(models.Schedule, {
      //   foreignKey: "timeslotId",
      //   as: "timeSlotDataToSchedule",
      // });
    }
  }
  TimeSlot.init(
    {
      timeSlot: DataTypes.STRING,
      dayofweekId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TimeSlot",
    }
  );
  return TimeSlot;
};
