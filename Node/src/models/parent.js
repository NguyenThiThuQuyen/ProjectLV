"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parent.hasMany(models.Patient, {
        foreignKey: "parentId",
        as: "parentDataToPatient",
      });

      Parent.belongsTo(models.Gender, {
        foreignKey: "genderId",
        targetKey: "id",
        as: "genderDataToParent",
      });
    }
  }
  Parent.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      genderId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Parent",
    }
  );
  return Parent;
};
