const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'munch',
  port: 5432
});

pool.connect();

module.exports.pool = pool ; 