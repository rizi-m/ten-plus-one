const { Pool } = require('pg');
let pool;
const config = {
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: 'elefante',
  database: 'tenplusonetest',
};

module.exports = {
  getPool: () => {
    if (pool) return pool;
    pool = new Pool(config);
    return pool;
  },
};
