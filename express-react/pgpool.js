const { Pool } = require('pg');
let pool;
const config = {
  host: 'localhost',
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  database: process.env.PGDB
};

module.exports = {
  getPool: () => {
    if (pool) return pool;
    pool = new Pool(config);
    return pool;
  }
}