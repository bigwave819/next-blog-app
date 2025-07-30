import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load your .env file

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    return client.end();
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message);
  });
