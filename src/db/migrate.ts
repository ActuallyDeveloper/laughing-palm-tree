import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

await migrate(db, { migrationsFolder: "./src/db/migrations" });
console.log("Migrations completed successfully");
