// src/models/Services.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize.js"); // Adjust the path as needed

const Services = sequelize.define(
    "Services",
    {
        serviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        providerServiceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serviceObj: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        initialCheckUpCost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Services", // Specify the table name if different
        timestamps: false, // Set to true if you want createdAt/updatedAt fields
    }
);

module.exports = { Services };
