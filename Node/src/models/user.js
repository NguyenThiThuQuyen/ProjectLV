"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderDataToUser",
      });

      User.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleDataToUser",
      });

      User.hasMany(models.Schedule, {
        foreignKey: "userId",
        as: "userDataToSchedule",
      });

      User.hasMany(models.ReservationTicket, {
        foreignKey: "doctorId",
        as: "doctorDataToPhieudatcho",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleId: DataTypes.STRING,
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
