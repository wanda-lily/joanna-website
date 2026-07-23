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
              <Card className="overflow-hidden border border-gray-100 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:border-gray-200 ring-0">
                <CardContent className="p-3 flex flex-col gap-3 min-h-[360px] max-h-[360px]">
                  {/* First image */}
                  {item.images[0] && (
                    <div className="relative w-full h-48 overflow-hidden rounded-md">
                      <Image
                        src={item.images[0].url}
                        alt={item.title}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        priority
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Subtitle text blocks */}
                  <div className="flex flex-col gap-1 mt-1">
                    <h2 className="font-semibold text-base text-black group-hover:text-gray-700 transition-colors line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
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
