
import env from '@/env.js';
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
  }
});

export default db;
