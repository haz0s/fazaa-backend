const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js"); // Adjust the path as needed

class ServiceRequest extends Model {}

// Initialize the model
ServiceRequest.init(
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
                model: "users", // Name of the User table
                key: "userId", // Key in the referenced table
            },
        },
        providerId: {
            // Foreign key to ServiceProvider
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "service_providers", // Name of the ServiceProvider table
                key: "serviceProviderId", // Corrected key in the referenced table
            },
        },
        serviceTypeId: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ServiceRequest",
        tableName: "service_requests", // Changed to snake_case for consistency
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
        foreignKey: "serviceProviderId", // Ensure this matches the model definition
        as: "providerObj",
    });
};

module.exports = { ServiceRequest };
