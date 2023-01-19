import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define('roles',
    {
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
                isIn: [["apprentice", "mentor", "admin","mentor + admin"]]
            }
        },
    },
    { timestamps: false }
);
// (async () => {
//     await Role.sync({ force: true });
//     await Role.create({ name: "apprentice" });
//     await Role.create({ name: "mentor" });
//     await Role.create({ name: "admin" });

// })();

export default Role;