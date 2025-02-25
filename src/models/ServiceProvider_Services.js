// src/models/ServiceProviderServices.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const ServiceProviderServices = sequelize.define('ServiceProviderServices', {
    providerServiceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Adjust if needed
        field: 'Provider_Service_ID', // Specify the actual column name in the table
    },
    serviceObjId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ServiceObj', // Specify the actual column name in the table
        references: {
            model: 'Services', // Name of the Services table
            key: 'ServiceId', // Key in the referenced table
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Description', // Specify the actual column name in the table
    },
    initialCheckUpCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'InitialCheckUpCost', // Specify the actual column name in the table
    },
}, {
    tableName: 'Service_Provider_Services',
    timestamps: false,
});

// Associations
ServiceProviderServices.associate = (models) => {
    ServiceProviderServices.belongsTo(models.Services, {
        foreignKey: 'serviceObjId',
        as: 'serviceObj',
    });
};

export default ServiceProviderServices;
