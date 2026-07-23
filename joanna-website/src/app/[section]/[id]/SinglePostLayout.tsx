"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"
import { Post, PostImage } from "@prisma/client"

type PostWithImages = Post & {
  images: PostImage[]
}

type SinglePostLayoutProps = {
  post: PostWithImages
  prevId: string | null
  nextId: string | null
}

export default function SinglePostLayout({
  post,
  prevId,
  nextId,
}: SinglePostLayoutProps) {
  const sectionSlug = post.section.toLowerCase()

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center">
      <Card className="w-full bg-transparent border-0 shadow-none ring-0">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold tracking-tight mb-2">
            {post.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            {post.section}
          </p>
        </CardHeader>

        {/* Layout container optimized for responsiveness */}
        <CardContent className="flex flex-col md:flex-row gap-8 mt-6 items-start">
          {/* Left Column: Post Body Content Text */}
          <div className="flex-1 text-base text-pretty text-gray-800 leading-relaxed text-left tracking-wide whitespace-pre-line">
            {post.body}
          </div>

          {/* Right Column: Dynamic Image Grid */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {post.images.map((image, index) => (
              <div
                key={image.id}
                /* First image spans across both columns, subsequent ones sit side-by-side */
                className={`relative overflow-hidden rounded-md bg-muted ${
                  index === 0 ? "col-span-2 h-80" : "col-span-1 h-44"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${post.title} gallery image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-300 hover:scale-102"
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter />
      </Card>

      {/* Navigation Footer Row */}
      <div
        id="buttons"
        className="flex justify-center gap-12 mt-10 border-t pt-6 w-full max-w-md"
      >
        {/* Previous Button Link Element */}
        {prevId ? (
          <Link href={`/${sectionSlug}/${prevId}`} passHref legacyBehavior>
            <Button
              variant="link"
              className="gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <HugeiconsIcon
                icon={ArrowLeftDoubleIcon}
                strokeWidth={2}
                className="pointer-events-none shrink-0 h-4 w-4"
              />
              Previous
            </Button>
          </Link>
        ) : (
          <Button variant="link" disabled className="gap-2 opacity-30">
            <HugeiconsIcon
              icon={ArrowLeftDoubleIcon}
              strokeWidth={2}
              className="h-4 w-4"
            />
            Previous
          </Button>
        )}

        {/* Next Button Link Element */}
        {nextId ? (
          <Link href={`/${sectionSlug}/${nextId}`} passHref legacyBehavior>
            <Button
              variant="link"
              className="gap-2 text-gray-600 hover:text-black transition-colors"
            >
              Next
              <HugeiconsIcon
                icon={ArrowRightDoubleIcon}
                strokeWidth={2}
                className="pointer-events-none shrink-0 h-4 w-4"
              />
            </Button>
          </Link>
        ) : (
          <Button variant="link" disabled className="gap-2 opacity-30">
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
  )
}
