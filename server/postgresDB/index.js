const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '52.88.46.42',
  database: 'munch',
  port: 5432,
  password: '$password'
});

pool.connect();

module.exports.pool = pool ; 