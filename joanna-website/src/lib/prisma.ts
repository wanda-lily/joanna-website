import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 1. Establish the connection pool using your environment variable
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// 2. Instantiate the Prisma adapter wrapper
const adapter = new PrismaPg(pool)

// 3. Construct PrismaClient by explicitly injecting the adapter
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
