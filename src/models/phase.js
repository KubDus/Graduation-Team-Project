import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const Phase = sequelize.define('phases', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    week: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    day: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    topic: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isIn: [["FOUNDATION", "ORIENTATION", "PROJECT", "EXAMS", "EXAMS_RETAKE", "BREAK"]]
        }
    },
},
    { timestamps: false }
);
export default Phase;