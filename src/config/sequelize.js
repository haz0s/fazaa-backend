const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // Required for Supabase
            rejectUnauthorized: false,
        },
    },
    logging: false, // Disable logs
});

module.exports = { sequelize };
