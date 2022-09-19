"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DayOfWeek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // DayOfWeek.hasMany(models.TimeSlot, {
      //   foreignKey: "dayofweekId",
      //   as: "dayOfWeekDataToTimeSlot",
      // });
    }
  }
  DayOfWeek.init(
    {
      dayOfWeek: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DayOfWeek",
    }
  );
  return DayOfWeek;
};
