// src/models/ServiceReport.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js'; // Adjust the path as needed

const ServiceReport = sequelize.define('ServiceReport', {
    reportId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    requestId: { // Foreign key to ServiceRequest
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ServiceRequests', // Name of the table
            key: 'requestId', // Key in the referenced table
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
        type: DataTypes.BYTE,
        allowNull: false,
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'ServiceReports', // Specify the table name if different
    timestamps: false, // Set to true if you want createdAt/updatedAt fields
});

// Association with ServiceRequest
ServiceReport.associate = (models) => {
    ServiceReport.belongsTo(models.ServiceRequest, {
        foreignKey: 'requestId',
        as: 'serviceRequest',
    });
};

export default ServiceReport;
