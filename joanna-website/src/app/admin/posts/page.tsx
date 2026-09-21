import { getPrisma } from "@/lib/prisma"
import PostList from "./post-list"
import Header from "@/components/Header"

const prisma = await getPrisma()
export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <section className="min-h-dvh max-w-4xl mx-auto">
      <Header section={"Edit"} />
      <PostList posts={posts} />
    </section>
  )
}
