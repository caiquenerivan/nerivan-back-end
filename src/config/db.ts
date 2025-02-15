import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const pool = new Pool ({
  connectionString: process.env.DATABASE_URL,
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: true,
  },
});

export default pool;