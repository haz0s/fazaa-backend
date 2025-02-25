// src/models/Person.js
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.js");

class Person extends Model {}

Person.init(
    {
        personId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: "Person",
        tableName: "persons", // Make sure this matches your actual table name
        timestamps: false,
    }
);

module.exports = { Person };
