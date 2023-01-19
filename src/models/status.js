import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const Status = sequelize.define('statuses', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
		validate: {
            isIn: [["ENABLED", "EMAIL_SENT", "DISABLED", "SOFT-DELETED", "ACTIVE", "PASSED", "FAILED"]]
        }
    },
},
    { timestamps: false }
);
export default Status;