"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    static associate(models) {}
  }
  New.init(
    {
      name: DataTypes.STRING,
      mota: DataTypes.STRING,
      image: DataTypes.STRING,
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "New",
    }
  );
  return New;
};
