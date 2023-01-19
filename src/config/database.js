import { Sequelize } from 'sequelize'

require('dotenv').config()

const {
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD, 
    DIALECT,
    DB_HOST
} = process.env;

const sequelize = new Sequelize(
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD,
    { 
        dialect : DIALECT || "mysql",
        host: DB_HOST 
    }
);

export default sequelize;