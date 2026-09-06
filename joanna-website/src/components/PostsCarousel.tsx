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
      <Card className="mx-auto mt-10 flex h-40 w-140 items-center justify-center border-2 border-border/50 bg-card/60 text-sm text-muted-foreground">
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
      className="w-full mt-10 relative px-4"
    >
      <CarouselContent className="pl-4">
        {posts.map((item) => (
          <CarouselItem
            key={item.id}
            /* 1 card on tiny screens, 2 on tablet, 3 on desktop layouts */
            className="basis-full sm:basis-1/2 md:basis-1/3 p-2"
          >
            {/*   Link tag pointing to a dedicated post route */}
            <Link
              href={`/${section.toLowerCase()}/${item.id}`}
              className="group block focus:outline-none"
            >
              <Card className="pt-0! mt-0! h-[430px] overflow-hidden border-border/50 bg-card/60 shadow-none transition-colors duration-300  hover:bg-card hover:-translate-y-0.5">
                <CardContent className="flex h-full flex-col p-0">
                  {/* First image */}
                  {item.images[0] && (
                    <div className="relative w-full h-[300px] shrink-0 overflow-hidden rounded-t-lg bg-muted">
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

                  {/* Subtitle text blocks */}
                  <div className="flex min-h-0 flex-1 flex-col px-space-lg pb-space-lg  pt-space-md text-center">
                    <div className="border-t border-border/50 pt-space-md">
                      <h2 className=" text-base font-medium  line-clamp-2 tracking-tight text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-4 lg:-left-12" />
      <CarouselNext className="-right-4 lg:-right-12" />
    </Carousel>
  )
}
