// src/index.js
import express from 'express';
import sequelize from './db/sequelize.js';
import User from './models/User.js';
import ServiceProvider from './models/ServiceProvider.js';
import ServiceRequest from './models/ServiceRequest.js';
import ServiceProviderServices from './models/ServiceProviderServices.js';
import ServiceReport from './models/ServiceReport.js';
import Services from './models/Services.js'; // Import the Services model

// Initialize Express app
const app = express();

// Define associations
User.associate({ ServiceRequest });
ServiceProvider.associate({ ServiceRequest });
ServiceRequest.associate({ User, ServiceProvider });
ServiceProviderServices.associate({ Services });
ServiceReport.associate({ ServiceRequest });
Services.associate({ /* any associations if needed */ }); // Define any associations for Services

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync the database
        console.log('Database & tables synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

// Call the sync function
syncDatabase();

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
