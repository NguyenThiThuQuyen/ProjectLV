"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExerciseMode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ExerciseMode.belongsTo(models.Treatment, {
      //   foreignKey: "treatmentId",
      //   targetKey: "id",
      //   as: "treatmentDataToExerciseMode",
      // });
    }
  }
  ExerciseMode.init(
    {
      exerciseModeDesc: DataTypes.TEXT,
      exerciseModeImage: DataTypes.STRING,
      treatmentId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ExerciseMode",
    }
  );
  return ExerciseMode;
};
