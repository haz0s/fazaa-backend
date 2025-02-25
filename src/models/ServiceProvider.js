// src/models/ServiceProvider.js
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");
const { Person } = require("./Person.js");

class ServiceProvider extends Person {}

ServiceProvider.init(
    {
        serviceProviderId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nationalNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Add any additional fields specific to ServiceProvider here
    },
    {
        sequelize,
        modelName: "ServiceProvider",
        tableName: "service_providers", // Make sure this matches your actual table name
        timestamps: false,
    }
);

ServiceProvider.associate = (models) => {
    ServiceProvider.hasMany(models.ServiceRequest, {
        foreignKey: "providerId",
        as: "serviceRequests",
    });
};

module.exports = { ServiceProvider };
