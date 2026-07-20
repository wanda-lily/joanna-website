"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useState } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { Post } from "@prisma/client"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"
import { deletePost } from "@/lib/actions"
import Link from "next/link"

type PostProps = { posts: Post[] }

function PostList({ posts = [] }: PostProps) {
  const [api, setApi] = useState<CarouselApi>()

  return (
    <div id="posts" className="max-w-3xl mx-auto p-8 space-y-4">
      <Carousel orientation="vertical" setApi={setApi} className="w-full">
        <CarouselContent>
          {posts.map((item) => (
            <CarouselItem key={item.id}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Button variant="link" asChild>
                      <Link href={`/admin/edit/${item.slug}`}>
                        {item.title}
                      </Link>
                    </Button>
                  </CardTitle>
                  <CardAction>
                    <form action={deletePost.bind(null, item.id)}>
                      <Button variant="destructive" type="submit">
                        Delete
                      </Button>
                    </form>
                  </CardAction>
                </CardHeader>
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

export default PostList
