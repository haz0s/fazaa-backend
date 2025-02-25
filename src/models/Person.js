// src/models/Person.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

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
    },
    {
        sequelize,
        modelName: 'Person',
        tableName: 'persons', // Make sure this matches your actual table name
        timestamps: false,
    }
);

export default Person;
