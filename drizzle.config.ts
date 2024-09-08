import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/lib/db/schema.server.ts",
    out: "./drizzle",
    url: process.env.DATABASE_URL
});