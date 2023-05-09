import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const database = process.env.DB_DATABAE;
const password = process.env.DB_PASSWORD;


const pool = new Pool({
    user: 'testuser',
    host: 'localhost',
    database: 'test',
    password: '1234',
    port: 5432,
  });


  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
  });

  export default pool;

