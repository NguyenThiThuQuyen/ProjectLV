"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gender.hasMany(models.User, {
        foreignKey: "genderId",
        as: "genderDataToUser",
      });

      Gender.hasMany(models.Patient, {
        foreignKey: "genderId",
        as: "genderDataToPatient",
      });

      Gender.hasMany(models.Parent, {
        foreignKey: "genderId",
        as: "genderDataToParent",
      });
    }
  }
  Gender.init(
    {
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gender",
    }
  );
  return Gender;
};
