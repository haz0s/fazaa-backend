const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js"); // Adjust the path as needed

class Service extends Model {}

// Initialize the model
Service.init(
    {
        serviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Service", // Changed to singular
        tableName: "services", // Changed to snake_case
        timestamps: false, // Set to true if you want createdAt/updatedAt fields
    }
);

module.exports = { Service };
