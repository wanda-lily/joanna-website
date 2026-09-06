import { getPrisma } from "@/lib/prisma"
import { PostsCarousel } from "@/components/PostsCarousel"

const prisma = await getPrisma()
async function RecommendationsPage() {
  const posts = await prisma.post.findMany({
    where: {
      section: "RECOMMENDATIONS",
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
        <h1 className="text-h2 font-bold tracking-tight">Recommendations</h1>
        <p className="text-pretty mt-4 text-gray-600 text-body">
          My commitment to reading books, and geeking out over them on FaceTime
          with my friend for hours until we completely lose track of time, is
          the highest level of devotion outside of organised religion. I love
          the comfort of knowing there will always be another book waiting on
          the shelf.
        </p>
      </div>
      <PostsCarousel posts={posts} section="recommendations" />
    </div>
  )
}

export default RecommendationsPage
