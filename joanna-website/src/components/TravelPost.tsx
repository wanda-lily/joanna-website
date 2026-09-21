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
    <div className="max-w-3xl mx-auto flex flex-col items-center ">
      <PostsCarousel posts={posts} section="travel" />
    </div>
  )
}

export default TravelPost
