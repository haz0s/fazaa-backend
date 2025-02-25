import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Create a single Supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const testConnection = async () => {
    try {
        // Perform a simple query (e.g., select from a table)
        const { data, error } = await supabase
            .from('Users') // Replace with your actual table name
            .select('*');

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            console.log('Data fetched successfully:', data);
        }
    } catch (err) {
        console.error('Error connecting to Supabase:', err);
    }
};

testConnection();

export default supabase;
