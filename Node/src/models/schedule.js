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
      // Schedule.belongsTo(models.TimeSlot, {
      //   foreignKey: "timeslotId",
      //   targetKey: "id",
      //   as: "timeSlotDataToSchedule",
      // });
      // Schedule.belongsTo(models.MedicalPackage, {
      //   foreignKey: "medicalpackageId",
      //   targetKey: "id",
      //   as: "medicalPackageDataToSchedule",
      // });
      // Schedule.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   targetKey: "id",
      //   as: "userDataToSchedule",
      // });
    }
  }
  Schedule.init(
    {
      timeslotId: DataTypes.STRING,
      medicalpackageId: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
