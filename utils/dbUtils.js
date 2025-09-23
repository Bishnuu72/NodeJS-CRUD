const pool = require('../config/db');

async function executeQuery(query, params = []) {
  const [result] = await pool.execute(query, params);
  return result;
}

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
        username VARCHAR(255) NOT NULL,
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

module.exports = {
  executeQuery, initializeDatabase
};