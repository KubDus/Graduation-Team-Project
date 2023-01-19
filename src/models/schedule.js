import Sequelize from "sequelize";
import sequelize from "../config/database";

const Schedule = sequelize.define("schedules", {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    cohort: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cohorts',
            key: 'id'
        },
    },

    class: {
        type: Sequelize.INTEGER,
        references: {
            model: 'classes',
            key: 'id'
        }
    },

    phase: {
        type: Sequelize.STRING,
        references: {
            model: 'phases',
            key: "topic", 
        },
        allowNull: false
    },
    
    week: {
        allowNull: false,
        type: Sequelize.INTEGER
    },

    day: {
        allowNull: false,
        type: Sequelize.INTEGER
    },

    topic: {
        allowNull: false,
        type: Sequelize.STRING
    },

    mentor: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: "id",
            validate: {
                isIn: ["mentor"]
            }
        },
        allowNull: false
    },

    dedication: {
        allowNull: false,
        type: Sequelize.STRING
    }
},
    { timestamps: false }
);
export default Schedule;