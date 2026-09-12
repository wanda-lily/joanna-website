export const dynamic = "force-dynamic"

import { getPrisma } from "@/lib/prisma"
import { PostsCarousel } from "@/components/PostsCarousel"

async function TravelPost() {
  const prisma = await getPrisma()
  const posts = await prisma.post.findMany({
    where: {
      section: "TRAVEL",
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })

  return (
    <div
      id="main"
      className="min-h-screen max-w-6xl mx-auto flex flex-col items-center gap-space-xl p-space-lg"
    >
      {/* Header sections text centered */}
      <div className="text-center w-full max-w-xl">
        <h1 className="text-h2 font-bold tracking-tight">Travel Logs</h1>
        <p className="text-pretty mt-4 text-gray-600 text-body">
          A collection of places I have been, things I've noticed, and photos I
          wanted to keep.
        </p>
      </div>
      <PostsCarousel posts={posts} section="travel" />
    </div>
  )
}

export default TravelPost
