"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.belongsTo(models.Gender, {
        foreignKey: "genderId",
        targetKey: "id",
        as: "genderDataToPatient",
      });

      Patient.belongsTo(models.Parent, {
        foreignKey: "parentId",
        targetKey: "id",
        as: "parentDataToPatient",
      });
    }
  }
  Patient.init(
    {
      childrentName: DataTypes.STRING,
      genderId: DataTypes.STRING,
      birthday: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      parentId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
