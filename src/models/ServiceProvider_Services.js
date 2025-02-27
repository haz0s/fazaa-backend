const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

class ServiceProviderServices extends Model {}

// Initialize the model
ServiceProviderServices.init(
    {
        providerServiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Adjust if needed
            field: "providerServiceId", // Specify the actual column name in the table
        },
        
        serviceProviderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "serviceProviderId",
            references: {
                model: "service_providers", // Name of the Services table
                key: "serviceProviderId", // Key in the referenced table
            }, // Specify the actual column name in the table
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "serviceId", // Specify the actual column name in the table
            references: {
                model: "services", // Name of the Services table
                key: "serviceId", // Key in the referenced table
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Description", // Specify the actual column name in the table
        },
        initialCheckUpCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "InitialCheckUpCost", // Specify the actual column name in the table
        },
    },
    {
        sequelize,
        modelName: "ServiceProviderServices",
        tableName: "service_provider_services",
        timestamps: false,
    }
);

// Associations
ServiceProviderServices.associate = (models) => {
    ServiceProviderServices.belongsTo(models.services, {
        foreignKey: "serviceObjId",
        as: "serviceObj",
    });
};

module.exports = { ServiceProviderServices };
