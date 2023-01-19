import sequelize from "../config/database";
import Sequelize from "sequelize";

const Class = sequelize.define("classes",
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
        },

        cohortName: {
            type: Sequelize.STRING,
            field: "cohort_name",
            references: {
                model: 'cohorts',
                key: 'name'
            },
            onUpdate: 'cascade'
        },

        classTypeId: {
            type: Sequelize.INTEGER,
            field: "class_type_id",
            references: {
                model: 'class_types',
                key: 'id'
            }
        },

        status: {
            type: Sequelize.STRING,
            references: {
              model: "statuses",
              key: "name"
            },
            defaultValue: "ENABLED"

            
          },
    },
    { timestamps: false }
);

export default Class;