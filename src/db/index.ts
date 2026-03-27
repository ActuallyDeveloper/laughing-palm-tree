import { createDatabase } from "@kilocode/app-builder-db";
import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

let _db: SqliteRemoteDatabase<typeof schema> | null = null;

export function getDb(): SqliteRemoteDatabase<typeof schema> {
  if (!_db) {
    _db = createDatabase(schema);
  }
  return _db;
}

export const db = new Proxy({} as SqliteRemoteDatabase<typeof schema>, {
  get(_target, prop) {
    const database = getDb();
    return Reflect.get(database, prop);
  },
});
