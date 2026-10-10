import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getServerEnv } from "@/lib/env";
import * as schema from "./schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;
  const sql = neon(getServerEnv().DATABASE_URL);
  cachedDb = drizzle(sql, { schema });
  return cachedDb;
}
