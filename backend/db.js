const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'k-host.kirato.dev',
  database: 'proxideal',
  password: 'SQL57',
  port: 5432,
});

module.exports = pool;