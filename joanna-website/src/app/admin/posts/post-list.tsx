"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useState, useActionState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { Post } from "@prisma/client"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deletePost } from "@/lib/actions"
import Link from "next/link"

type PostProps = { posts: Post[] }

function PostList({ posts = [] }: PostProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [state, formAction, pending] = useActionState(deletePost, null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success("Post deleted successfully")
      setOpen(false)
    } else {
      toast.error("Deletion failed", {
        description: state.error,
      })
      setOpen(false)
    }
  }, [state])

  return (
    <div id="posts" className="max-w-3xl mx-auto p-8 space-y-4">
      <Carousel orientation="vertical" setApi={setApi} className="w-full">
        <CarouselContent>
          {posts.map((item) => (
            <CarouselItem key={item.id}>
              <Card className="rounded-md!">
                <CardHeader>
                  <CardTitle>
                    <Button variant="link" asChild>
                      <Link href={`/admin/edit/${item.slug}`}>
                        {item.title}
                      </Link>
                    </Button>
                  </CardTitle>
                  <CardAction>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">Delete</Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-sm bg-background rounded-md">
                        <DialogHeader>
                          <DialogTitle>Delete post?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <form action={formAction}>
                            <input
                              type="hidden"
                              name="postId"
                              value={item.id}
                            />

                            <Button
                              variant="destructive"
                              type="submit"
                              disabled={pending}
                            >
                              {pending ? "Deleting..." : "Delete"}
                            </Button>
                          </form>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
