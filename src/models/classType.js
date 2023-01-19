import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const ClassType = sequelize.define('class_type', {
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
            isIn: [["SIC", "OSIC", "OEWC"]]
        }
    },
},
    { timestamps: false }
);


export default ClassType;