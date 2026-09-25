import "dotenv/config"
import dotenv from "dotenv"
import { defineConfig } from "prisma/config"
import path from "node:path"

dotenv.config({ path: ".env.development" })

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
})
