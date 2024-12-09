import mysql from 'mysql2/promise';
import oracledb from 'oracledb';

require('dotenv').config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  port: Number(process.env.DB_PORT) || 3306
});

let oraDb: oracledb.Connection;

export async function getOracleConnection() {
    if (!oraDb) {
        oraDb = await oracledb.getConnection({
            user: process.env.EXP_USER || '',
            password: process.env.EXP_PASS ||'',
            connectString: process.env.EXP_CONNECTION || '172.17.131.18:1524/EXPK'
        });
    }
    return oraDb;
}