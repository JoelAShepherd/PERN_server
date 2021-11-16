const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    password: process.env.PGPASS,
    host: 'localhost',
    port: process.env.DATABASE_URL,
    database: 'pern_ecomm'
})

module.exports = pool;