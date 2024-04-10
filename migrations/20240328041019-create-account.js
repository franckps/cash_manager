"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Accounts", {
      account: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Accounts");
  },
};
