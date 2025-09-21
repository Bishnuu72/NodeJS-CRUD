const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Create database and table if not exists
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE DATABASE IF NOT EXISTS auth_db;
    `);

    await pool.query(`
      USE auth_db;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database and table initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});