import { getPrisma } from "@/lib/prisma"
import PostList from "./post-list"

const prisma = await getPrisma()
export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  })

  return <PostList posts={posts} />
}
