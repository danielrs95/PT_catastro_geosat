import { Pool } from 'pg';

let db;

if (!db) {
  db = new Pool({
    user: 'dani',
    password: 'daniel',
    host: 'localhost',
    port: 5432,
    database: 'catastros',
  });
}

export { db };
