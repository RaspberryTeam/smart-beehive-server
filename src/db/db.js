const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
    process.env.DB_NAME,
    // 'smart-beehive',
    process.env.DB_USER,
    // 'postgres',
    process.env.DB_PASSWORD,
    // '12345678',

    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        // host: 'localhost',

        port: process.env.DB_PORT
        // port: 5432
    }
)