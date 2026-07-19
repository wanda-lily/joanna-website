"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useState } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

import { Post, PostImage } from "@prisma/client"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"

type PostWithImages = Post & {
  images: PostImage[]
}

type PostProps = {
  posts: PostWithImages[]
}

function PostCarousel({ posts }: PostProps) {
  const [api, setApi] = useState<CarouselApi>()
  return (
    <div id="posts" className="p-1 mt-4 ">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {posts.map((item) => (
            <CarouselItem key={item.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-4 min-h-200 w-screen">
                  <div className="flex-1">{item.body}</div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {item.images.map((image, index) => (
                      <div
                        key={image.id}
                        className={index === 0 ? "col-span-2" : ""}
                      >
                        <Image
                          src={image.url}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>{item.section}</CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div id="buttons" className="flex justify-center gap-4 mt-4 space-x-6">
        <Button variant="link" onClick={() => api?.scrollPrev()}>
          <HugeiconsIcon
            icon={ArrowLeftDoubleIcon}
            strokeWidth={2}
            className="pointer-events-none shrink-0"
          />
          Previous
        </Button>

        <Button variant="link" onClick={() => api?.scrollNext()}>
          Next
          <HugeiconsIcon
            icon={ArrowRightDoubleIcon}
            strokeWidth={2}
            className="pointer-events-none shrink-0"
          />
        </Button>
      </div>
    </div>
  )
}

export default PostCarousel
