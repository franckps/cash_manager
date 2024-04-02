"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.dropTable("Transactions").then(() =>
      queryInterface
        .createTable("Transactions", {
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
          account: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false,
          },
        })
        .then(() =>
          queryInterface.addConstraint("Transactions", {
            fields: ["account"],
            type: "FOREIGN KEY",
            name: "FK_Transactions_Account",
            references: {
              table: "Accounts",
              field: "account",
            },
            onDelete: "no action",
            onUpdate: "no action",
          })
        )
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface
      .removeConstraint("Transactions", "FK_Transactions_Account")
      .then(() => queryInterface.removeColumn("Transactions", "account"));
  },
};
