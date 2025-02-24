// src/services/serviceController.js
import supabase from '../db/supabaseClient';

// Function to fetch data from a specific table
export const fetchDataFromTable = async (tableName) => {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .select('*');

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw new Error('Data fetch failed');
    }
};

// Other service functions can be added here
