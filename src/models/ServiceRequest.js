// src/models/ServiceRequest.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize.js"); // Adjust the path as needed

const ServiceRequest = sequelize.define(
    "ServiceRequest",
    {
        requestId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            // Foreign key to User
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users", // Name of the User table
                key: "userId", // Key in the referenced table
            },
        },
        providerId: {
            // Foreign key to ServiceProvider
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ServiceProviders", // Name of the ServiceProvider table
                key: "providerId", // Key in the referenced table
            },
        },
        serviceTypeId: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dateOfSubmission: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BYTE,
            allowNull: false,
        },
    },
    {
        tableName: "ServiceRequests", // Specify the table name if different
        timestamps: false, // Set to true if you want createdAt/updatedAt fields
    }
);

// Associations with User and ServiceProvider
ServiceRequest.associate = (models) => {
    ServiceRequest.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userObj",
    });
    ServiceRequest.belongsTo(models.ServiceProvider, {
        foreignKey: "providerId",
        as: "providerObj",
    });
};

module.exports = { ServiceRequest };
