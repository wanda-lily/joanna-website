import { MetadataRoute } from "next"
import { getPrisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prisma = await getPrisma()

  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      section: true,
      slug: true,
      createdAt: true,
    },
  })

  return posts.map((post) => ({
    url: `https://joannaanimasaun.com/${post.section.toLowerCase()}/${post.slug}`,
    lastModified: post.createdAt,
  }))
}
