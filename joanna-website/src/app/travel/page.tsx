import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import PostCarousel from "@/components/PostsCarousel"
import Image from "next/image"

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
    <div id="main" className="container mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold">TRAVEL LOGS</h1>
      <p className="text-pretty mt-4">
        A collection of places I have been, things I've noticed, and photos I
        wanted to keep.
      </p>
      <Carousel
        id="pictures"
        opts={{
          align: "start",
        }}
        className="w-full  mt-8"
      >
        <CarouselContent>
          {posts.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-full sm:basis-1/2 lg:basis-1/5"
            >
              <Card>
                <CardContent className="p-4 flex flex-col gap-4 aspect-square max-h-70 min-h-70">
                  {/* First image */}
                  {item.images[0] && (
                    <Image
                      src={item.images[0].url}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-60 object-cover rounded-md"
                    />
                  )}

                  {/* Subtitle */}
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>

                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <PostCarousel posts={posts} />
    </div>
  )
}

export default TravelPost
