// testDatabase.js

import { sequelize } from './src/config/sequelize.js'; // Adjust the import based on your setup
import User from './src/models/User.js'; // Import the User model

async function testDatabase() {
    try {
        // Test the database connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Fetch data from the Users table
        const users = await User.findAll(); // Adjust to the model you want to test
        console.log('Users:', JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        // Close the connection
        await sequelize.close();
    }
}

testDatabase();
