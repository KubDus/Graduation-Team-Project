import Sequelize from "sequelize";
import sequelize from "../config/database";

const Exam = sequelize.define(
  "exams",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    phase: {
      type: Sequelize.STRING,
      references: {
        model: "phases",
        key: "topic"
      },
      allowNull: false
    },

    isRetake: {
      type: Sequelize.BOOLEAN,
      field: "is_retake",
      allowNull: false
    },

    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },

    name: {
      type: Sequelize.STRING,
      allowNull: true
    },

    description: {
      type: Sequelize.STRING,
      allowNull: true
    },

    solution: {
      type: Sequelize.STRING,
      allowNull: true
    },

    walkthrough: {
      type: Sequelize.STRING,
      allowNull: true
    },

    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          isIn: [["ACTIVE", "SOFT-DELETED"]]
      },
      defaultValue: "ACTIVE"
    }
  },
  { timestamps: false }
)

export default Exam;