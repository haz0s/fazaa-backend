import { Sequelize } from 'sequelize';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Required for Supabase
            rejectUnauthorized: false
        }
    },
    logging: false // Disable logs
});

export default sequelize;
