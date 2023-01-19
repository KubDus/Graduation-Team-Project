import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const Country = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
		validate: {
            isIn: [["SK", "CZ", "HU"]]
        }
    },
},
    { timestamps: false }
);

export default Country;