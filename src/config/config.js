require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PSQL_DB_USER || 'db-dev-user',
    password: process.env.PSQL_DB_PASSWORD || 'db-dev-user-strong-pass',
    database: process.env.PSQL_DB_NAME || 'wallets-db-dev',
    host: process.env.PSQL_DB_HOST || 'postgres-dev',
    port: process.env.PSQL_DB_PORT || 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'test_user',
    password: 'test_password',
    database: 'test_db',
    host: 'postgres_test',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PSQL_DB_USER,
    password: process.env.PSQL_DB_PASSWORD,
    database: process.env.PSQL_DB_NAME,
    host: process.env.PSQL_DB_HOST,
    port: process.env.PSQL_DB_PORT || 5432,
    dialect: 'postgres'
  }
};