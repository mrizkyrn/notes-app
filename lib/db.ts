import { Pool, QueryResultRow } from "pg";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
});

export const query = async <T extends QueryResultRow>(text: string, params?: any[]): Promise<T[]> => {
  try {
    const result = await pool.query<T>(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};