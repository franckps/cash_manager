import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { TransactionModel } from "src/domain/models/transaction";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/database.sqlite",
});

export const Transaction: ModelDefined<TransactionModel, TransactionModel> =
  sequelize.define("Transaction", {
    // Model attributes are defined here
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
