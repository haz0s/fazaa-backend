// src/models/User.js
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");
const { Person } = require("./Person.js");

class User extends Person {}

User.init(
    {
        userId: {
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
            type: DataTypes.INTEGER, // Assuming gender is represented as a byte
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
        cachedAvgRating: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        numOfRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users", // Make sure this matches your actual table name
        timestamps: false,
    }
);

// Association method
User.associate = (models) => {
    User.hasMany(models.ServiceRequest, {
        foreignKey: "userId",
        as: "serviceRequests",
    });
};

module.exports = { User };
