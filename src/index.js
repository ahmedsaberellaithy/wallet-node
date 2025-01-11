require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, testConnection } = require('./config/database');
const { Umzug, SequelizeStorage } = require('umzug');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure migrations
const umzug = new Umzug({
  migrations: { glob: 'src/migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database and run migrations
async function initializeDatabase() {
  try {
    // Test connection
    await testConnection();
    
    // Run migrations
    console.log('Running migrations...');
    await umzug.up();
    console.log('Migrations completed successfully');
    
    // Start server only after successful database initialization
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Initialize database and start server
initializeDatabase();
