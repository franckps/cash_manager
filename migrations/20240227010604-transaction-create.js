"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Transactions", {
      // Model attributes are defined here
      _id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
    return queryInterface.dropTable("Transaction");
  },
};
