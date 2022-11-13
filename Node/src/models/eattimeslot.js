"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EatTimeslot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EatTimeslot.belongsTo(models.Session, {
        foreignKey: "sessionId",
        targetKey: "id",
        as: "sessionDataToEatTimeslot",
      });

      EatTimeslot.hasMany(models.EatDetail, {
        foreignKey: "eatTimeslotId",
        as: "eatTimeslotDataToEatDetail",
      });
    }
  }
  EatTimeslot.init(
    {
      khunggioan: DataTypes.STRING,
      sessionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EatTimeslot",
    }
  );
  return EatTimeslot;
};
