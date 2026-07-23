import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import SinglePostLayout from "./SinglePostLayout"

interface PageProps {
  params: Promise<{
    section: string
    id: string
  }>
}

export default async function DynamicPostPage({ params }: PageProps) {
  const { id, section } = await params
  const upperSection = section.toUpperCase()

  // 1. Fetch the current post with its ordered images
  const currentPost = await prisma.post.findUnique({
    where: { id },
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
      section: upperSection,
      createdAt: { lt: currentPost.createdAt }, // Assumes chronological sorting
    },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  })

  // 3. Query for the next post in the same section
  const nextPost = await prisma.post.findFirst({
    where: {
      section: upperSection,
      createdAt: { gt: currentPost.createdAt },
    },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  })

  return (
    <SinglePostLayout
      post={currentPost}
      prevId={prevPost?.id || null}
      nextId={nextPost?.id || null}
    />
  )
}
