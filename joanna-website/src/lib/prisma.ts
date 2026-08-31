import { PrismaClient } from "@/generated/prisma"
import { PrismaD1 } from "@prisma/adapter-d1"
import { getCloudflareContext } from "@opennextjs/cloudflare"

export async function getPrisma() {
  const { env } = await getCloudflareContext({ async: true })
  const adapter = new PrismaD1(env.DB)
  return new PrismaClient({ adapter })
}
