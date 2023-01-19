import Sequelize from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    firstName: {
      field: "first_name",
      type: Sequelize.STRING,
      allowNull: true,
    },

    lastName: {
      field: "last_name",
      type: Sequelize.STRING,
      allowNull: true,
    },

    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    role: {
      type: Sequelize.STRING,
      references: {
        model: "roles",
        key: "name",
      },
    },

    status: {
      type: Sequelize.STRING,
      references: {
        model: "statuses",
        key: "name",
      },
    },

    authenticationLink: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true
    },
    
    authenticationExpiration: {
      field: "expiration",
      type: Sequelize.DATE,
      allowNull: true
    }

  },
  { timestamps: false }
);
export default User;
