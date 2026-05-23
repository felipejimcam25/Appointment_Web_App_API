import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool ({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
})

export default pool;