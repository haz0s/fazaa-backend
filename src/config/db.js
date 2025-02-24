// src/config/db.js

const { Pool } = require("pg");
require("dotenv").config(); // Make sure to require dotenv to access environment variables

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = pool;
