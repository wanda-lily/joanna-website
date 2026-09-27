import { getPrisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{
    section: string
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const prisma = await getPrisma()

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      published: true,
    },
  })

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,

    robots: {
      index: post.published,
      follow: post.published,
    },
  }
}
