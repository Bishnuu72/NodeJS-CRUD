const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const { initializeDatabase } = require('./utils/dbUtils');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

initializeDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});