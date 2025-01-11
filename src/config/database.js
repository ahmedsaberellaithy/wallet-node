require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PSQL_DB_NAME,
  process.env.PSQL_DB_USER,
  process.env.PSQL_DB_PASSWORD,
  {
    host: process.env.PSQL_DB_HOST,
    port: process.env.PSQL_DB_PORT || 5432,
    dialect: 'postgres',
    logging: true,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, testConnection };
