import Sequelize from "sequelize";
import sequelize from "../config/database.js";
import Class from "./class.js"

const Cohort = sequelize.define('cohorts', {
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
        allowNull: false
    },

    country: {
        type: Sequelize.STRING,
        references: {
            model: 'countries',
            key: 'name',
        }
    },

    status: {
        type: Sequelize.STRING,
        references: {
            model: "statuses",
            key: "name"            
        },
    },

},
    { timestamps: false }
);

export default Cohort;