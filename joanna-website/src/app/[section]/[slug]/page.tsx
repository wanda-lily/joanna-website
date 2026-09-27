import { getPrisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import SinglePostLayout from "./SinglePostLayout"

interface PageProps {
  params: Promise<{
    section: string
    slug: string
  }>
}

export default async function DynamicPostPage({ params }: PageProps) {
  const prisma = await getPrisma()
  const { slug, section } = await params
  const upperSection = section.toUpperCase()

  // 1. Fetch the current post with its ordered images
  const currentPost = await prisma.post.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  })

  if (!currentPost || currentPost.section !== upperSection) {
    notFound()
  }

  // 2. Query for the previous post in the same section
  const prevPost = await prisma.post.findFirst({
    where: {
      published: true,
      section: upperSection,
      createdAt: { lt: currentPost.createdAt }, // Assumes chronological sorting
    },
    orderBy: { createdAt: "desc" },
    select: { slug: true },
  })

  // 3. Query for the next post in the same section
  const nextPost = await prisma.post.findFirst({
    where: {
      section: upperSection,
      createdAt: { gt: currentPost.createdAt },
    },
    orderBy: { createdAt: "asc" },
    select: { slug: true },
  })

  return (
    <SinglePostLayout
      post={currentPost}
      prevSlug={prevPost?.slug || null}
      nextSlug={nextPost?.slug || null}
    />
  )
}
