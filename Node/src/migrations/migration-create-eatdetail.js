"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("EatDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gioan: {
        type: Sequelize.STRING,
      },
      huongdanan: {
        type: Sequelize.STRING,
      },
      solan: {
        type: Sequelize.STRING,
      },
      ghichu: {
        type: Sequelize.STRING,
      },
      menuId: {
        type: Sequelize.STRING,
      },
      dishId: {
        type: Sequelize.STRING,
      },
      eatdateId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("EatDetails");
  },
};
