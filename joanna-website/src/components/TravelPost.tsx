import { getPrisma } from "@/lib/prisma"
import { PostsCarousel } from "@/components/PostsCarousel"
import TravelMap from "./TravelMap"

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

  // if (posts.length < 1) {
  //   return (
  //     <div className="mx-auo flex h-60 w-full items-center justify-center rounded-md  bg-card text-sm text-muted-foreground">
  //       <p>No travel posts available.</p>
  //     </div>
  //   )
  // }

  return (
    <div className="max-w-4xl max-h-4xl mx-auto flex flex-col items-center rounded-md">
      {/* Mobile: carousel */}
      <div className="w-full sm:hidden">
        <PostsCarousel posts={posts} section="travel" />
      </div>

      {/* Desktop: interactive map */}
      <div className="hidden w-full sm:block">
        <TravelMap posts={posts} />
      </div>
    </div>
  )
}

export default TravelPost
