// src/models/ServiceProvider.js
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

class ServiceProvider extends Model {}

ServiceProvider.init(
    {
        serviceProviderId: {
            type: DataTypes.INTEGER,
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
        numOfRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        cachedAvgRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nationalNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
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
