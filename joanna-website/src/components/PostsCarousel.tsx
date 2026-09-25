import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

//props
interface PostImage {
  id: string
  url: string
  order: number
}

interface Post {
  id: string
  title: string
  subtitle: string | null
  section: string
  images: PostImage[]
}

interface PostsCarouselProps {
  posts: Post[]
  section: string
}

export function PostsCarousel({ posts, section }: PostsCarouselProps) {
  if (posts.length < 1) {
    return (
      <Card className="mx-aut flex h-60 w-full items-center justify-center rounded-md  bg-card text-sm text-muted-foreground">
        <p>No {section} posts available.</p>
      </Card>
    )
  }
  return (
    <Carousel
      id="pictures"
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {posts.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-full lg:basis-1/3 md:basis-1/3"
          >
            <Link
              href={`/${section.toLowerCase()}/${item.id}`}
              className="group block focus:outline-none"
            >
              <div className="h-[350px] w-full overflow-hidden rounded-md border border-border/50 bg-card/60 transition-colors duration-300 hover:-translate-y-0.5 hover:bg-card">
                {item.images[0] && (
                  <div className="relative h-[300px] w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image
                      src={item.images[0].url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex min-h-0 flex-1 items-center justify-center border-t border-border/50 px-space-lg pt-2 text-center">
                  <p className="line-clamp-2 text-sm tracking-tight text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
                    {item.title}
                  </p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-4 lg:-left-12" />
      <CarouselNext className="-right-4 lg:-right-12" />
    </Carousel>
  )
}
