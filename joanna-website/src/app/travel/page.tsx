import { prisma } from "@/lib/prisma"
import { PostsCarousel } from "@/components/PostsCarousel"

async function TravelPost() {
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
    /* Restricted width with max-w-4xl and centered it horizontally using mx-auto */
    <div
      id="main"
      className="w-full max-w-6xl mx-auto px-5 py-10 flex flex-col items-center"
    >
      {/* Header sections text centered */}
      <div className="text-center w-full max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight">TRAVEL LOGS</h1>
        <p className="text-pretty mt-4 text-gray-600 text-sm">
          A collection of places I have been, things I've noticed, and photos I
          wanted to keep.
        </p>
      </div>
      <PostsCarousel posts={posts} section="travel" />
    </div>
  )
}

export default TravelPost
