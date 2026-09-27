"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"
import { Post, PostImage } from "@prisma/client"
import Header from "@/components/Header"

type PostWithImages = Post & {
  images: PostImage[]
}

type SinglePostLayoutProps = {
  post: PostWithImages
  prevSlug: string | null
  nextSlug: string | null
}

export default function SinglePostLayout({
  post,
  prevSlug: prevSlug,
  nextSlug: nextSlug,
}: SinglePostLayoutProps) {
  const sectionSlug = post.section.toLowerCase()

  const carousel = (
    <Carousel
      opts={{
        align: "start",
        loop: post.images.length > 1,
      }}
      className="w-full transition-transform duration-300 hover:scale-102"
    >
      <CarouselContent>
        {post.images.map((image, index) => (
          <CarouselItem key={image.id}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted sm:aspect-[3/4] md:aspect-[2/3]">
              <Image
                src={image.url}
                alt={image.altText ?? ""}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {post.images.length > 1 && (
        <>
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </>
      )}
    </Carousel>
  )
  const paragraphs = post.body
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)

  return (
    <div
      id="travel-section"
      className="flex flex-col gap-space-xl min-h-dvh w-full"
    >
      <Header section={post.title} />
      <div className=" w-full max-w-6xl px-4">
        <Card className="w-full border-0 bg-transparent shadow-none ring-0">
          <CardContent className="p-0">
            {/* =====================================================
                MOBILE
                Text first, image underneath
            ===================================================== */}
            <div className="md:hidden">
              <div className="text-body text-pretty leading-relaxed text-foreground/80 whitespace-pre-line">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={index > 0 ? "mt-6" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {post.images.length > 0 && (
                <div className="mt-8 w-full">{carousel}</div>
              )}
            </div>

            {/* =====================================================
                DESKTOP
                Image floats right and text wraps around it
            ===================================================== */}
            <div className="hidden md:block">
              {post.images.length > 0 && (
                <div className="float-right mb-6 ml-10 w-[46%] lg:w-[42%]">
                  {carousel}
                </div>
              )}

              <div className="text-body leading-relaxed text-foreground/80 whitespace-pre-line">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={index > 0 ? "mt-6" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Clears the float so navigation/content below
                  doesn't accidentally flow beside the image */}
              <div className="clear-both" />
            </div>
          </CardContent>

          <CardFooter />
        </Card>

        {/* Navigation */}
        <div
          id="buttons"
          className="mx-auto flex w-full max-w-md items-center justify-between border-t   sm:justify-center sm:gap-12"
        >
          {prevSlug ? (
            <Link href={`/${sectionSlug}/${prevSlug}`}>
              <Button
                variant="link"
                className="gap-2 px-2 text-foreground/80 transition-colors hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={ArrowLeftDoubleIcon}
                  strokeWidth={2}
                  className="h-4 w-4 shrink-0"
                />
                Previous
              </Button>
            </Link>
          ) : (
            <Button variant="link" disabled className="gap-2 px-2 opacity-30">
              <HugeiconsIcon
                icon={ArrowLeftDoubleIcon}
                strokeWidth={2}
                className="h-4 w-4"
              />
              Previous
            </Button>
          )}

          {nextSlug ? (
            <Link href={`/${sectionSlug}/${nextSlug}`}>
              <Button
                variant="link"
                className="gap-2 px-2 text-foreground/80 transition-colors hover:text-foreground"
              >
                Next
                <HugeiconsIcon
                  icon={ArrowRightDoubleIcon}
                  strokeWidth={2}
                  className="h-4 w-4 shrink-0"
                />
              </Button>
            </Link>
          ) : (
            <Button variant="link" disabled className="gap-2 px-2 opacity-30">
              Next
              <HugeiconsIcon
                icon={ArrowRightDoubleIcon}
                strokeWidth={2}
                className="h-4 w-4"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
