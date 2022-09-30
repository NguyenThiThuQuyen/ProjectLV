"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderDataToUser",
      });

      Allcode.hasMany(models.User, {
        foreignKey: "roleId",
        as: "roleDataToUser",
      });

      Allcode.hasMany(models.Parent, {
        foreignKey: "gender",
        as: "genderDataToParent",
      });

      Allcode.hasMany(models.Patient, {
        foreignKey: "gender",
        as: "genderDataToPatient",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
