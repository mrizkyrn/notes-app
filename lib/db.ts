import { Pool, QueryResultRow } from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

const caCert = process.env.CA_CERT;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: caCert ? Buffer.from(caCert) : undefined,
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