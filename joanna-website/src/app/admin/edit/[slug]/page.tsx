import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditPostForm } from "./edit-form"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  })

  if (!post) notFound()

  return <EditPostForm post={post} />
}
