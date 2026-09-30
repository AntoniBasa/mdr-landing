import "dotenv/config";
import { defineConfig } from "prisma/config";

// DATABASE_URL is optional: `prisma generate` works without it, and the app
// falls back to logging when it is missing (see src/lib/server/db.ts).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
