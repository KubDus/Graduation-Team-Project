import Sequelize from "sequelize";
import sequelize from "../config/database";

const Apprenticeship = sequelize.define(
  "apprenticeships",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    user: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      allowNull: false
    },

    cohort: {
      type: Sequelize.INTEGER,
      references: {
        model: "cohorts",
        key: "id"
      },
      // allowNull: false
    },

    class: {
      type: Sequelize.INTEGER,
      references: {
        model: "classes",
        key: "id"
      },
      // allowNull: false
    },

    phase: {
      type: Sequelize.STRING,
      references: {
        model: "phases",
        key: "topic"
      },
      allowNull: false
    },

    status: {
      type: Sequelize.STRING,
      references: {
        model: "statuses",
        key: "name"
      },
      allowNull: false,
      defaultValue: "ENABLED"
    },

    startdate: {
      field: "start_date",
      type: Sequelize.DATEONLY,
      allowNull: true
    },

    enddate: {
      field: "end_date",
      type: Sequelize.DATEONLY,
      allowNull: true
    },

    exam: {
      type: Sequelize.INTEGER,
      references: {
        model: "exams",
        key: "id"
      },
       allowNull: true
    },

    result: {
      type: Sequelize.DOUBLE,
      allowNull: true
    }

  },
  { timestamps: false }
);
export default Apprenticeship;
