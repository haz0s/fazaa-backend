const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js"); // Adjust the path as needed

const ServiceReport = sequelize.define(
    "ServiceReport",
    {
        reportId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        requestId: {
            // Foreign key to ServiceRequest
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "service_requests", // Name of the table
                key: "requestId", // Key in the referenced table
            },
        },
        dateOfReport: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finalServiceCost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ratingValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        role: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "service_reports", // Changed to snake_case for consistency
        timestamps: false, // Set to true if you want createdAt/updatedAt fields
    }
);

// Association with ServiceRequest
ServiceReport.associate = (models) => {
    ServiceReport.belongsTo(models.ServiceRequest, {
        foreignKey: "requestId",
        as: "serviceRequest",
    });
};

module.exports = { ServiceReport };
