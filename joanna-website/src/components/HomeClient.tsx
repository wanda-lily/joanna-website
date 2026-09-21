"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Heart, Monitor, Globe, Book } from "@hugeicons/core-free-icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

const sections = [
  {
    value: "books",
    icon: Book,
    title: "Books",
    content:
      "My commitment to reading books, and geeking out over them on FaceTime with my friend for hours until we completely lose track of time, is the highest level of devotion outside of organised religion. I love the comfort of knowing there will always be another book waiting on the shelf.",
  },
  {
    value: "travel",
    icon: Globe,
    title: "Travel",
    content:
      "I appreciate the unpredictability of travel. There's the frustration of navigating Rhodes with Google Maps, or missing the last train in Basel because my friend accidentally bought two one-way tickets. From sitting in a freezing car with my siblings in below-zero temperatures in Lapland to spending an evening with a friend in Dundas Square, Toronto, every trip leaves me with cherished memories I'll probably think about for years to come.",
  },
  {
    value: "work",
    icon: Monitor,
    title: "Work",
    content:
      "I like the organised chaos of launching pages on websites. Building campaigns. Improving systems. Chasing bugs. Testing twice. Wondering why it worked yesterday. I've spent the last few years doing exactly that at Calvin Klein and Karl Lagerfeld. Turns out, that's exactly the kind of complexity I enjoy.",
  },
]

const links = [
  {
    value: "tiw",
    href: "/tiw",
    title: "Things I wrote",
  },
  {
    value: "current",
    href: "/current",
    title: "Currently",
  },
  {
    value: "recommendations",
    href: "/recommendations",
    title: "Recommendations",
  },
]

export default function HomeClient({ travel }: { travel: React.ReactNode }) {
  const { userId } = useAuth()
  const [accordionOpen, setAccordionOpen] = useState("")
  const accordionRef = useRef<HTMLDivElement>(null)
  const shouldScrollToAbout = useRef(false)

  useEffect(() => {
    if (window.location.hash === "#about") {
      shouldScrollToAbout.current = true
      setAccordionOpen("about")
    }
  }, [])

  useEffect(() => {
    if (accordionOpen !== "about") return
    if (!shouldScrollToAbout.current) return

    shouldScrollToAbout.current = false

    const timer = setTimeout(() => {
      accordionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 350)

    return () => clearTimeout(timer)
  }, [accordionOpen])

  return (
    <div id="home" className="flex flex-col gap-space-xl px-space-lg">
      {/* Intro */}
      <div
        id="intro"
        className="flex flex-col items-center justify-start w-full"
      >
        <div className="relative h-28 w-28 mt-space-lg overflow-hidden rounded-full ring-2 ring-card">
          <Image
            src="/joanna.png"
            alt="joanna picture"
            fill
            sizes="300px"
            priority
            className="object-cover object-top"
          />
        </div>

        <div className="text-center mt-space-md flex items-center">
          <h1 className="text-h2 font-medium tracking-tight text-foreground">
            {userId ? <Link href="/admin">Joanna</Link> : "Joanna"}
          </h1>

          <HugeiconsIcon
            icon={Heart}
            size={10}
            className="text-muted-foreground ml-1"
          />
        </div>

        {/* About */}
        <Card className="w-full bg-transparent rounded-none! shadow-none border-t mt-space-lg p-0!">
          <div className="flex items-baseline justify-between mb-space-md">
            <h2 className="text-body font-medium tracking-tight text-foreground">
              About
            </h2>

            <span className="text-caption text-muted-foreground">01</span>
          </div>

          <CardHeader className="p-0">
            <div className="text-body leading-relaxed text-pretty text-foreground/80">
              I love life's clichés: coffee shop corners, bookstores, seat 37A,
              and The Beatles. Somewhere in between,
              <Accordion
                type="single"
                collapsible
                value={accordionOpen}
                className="border-0 shadow-none"
                onValueChange={setAccordionOpen}
              >
                <AccordionItem
                  ref={accordionRef}
                  id="about"
                  value="about"
                  className="border-none rounded-xl data-[state=open]:bg-transparent duration-300 scroll-mt-20"
                >
                  <AccordionTrigger className="p-0! font-normal text-foreground/80 hover:text-foreground transition-colors cursor-pointer">
                    <span className="text-body">
                      I build things for the internet.
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pt-space-lg">
                    <div className="px-space-md pb-space-lg pt-space-sm">
                      <div className="mt-space-md space-y-space-lg">
                        <h3 className="text-body font-medium tracking-tight text-foreground">
                          Somewhere in between
                        </h3>

                        <div className="max-w-2xl text-body text-pretty text-foreground/80 space-y-space-md">
                          <p>
                            I spend a lot of my life somewhere in between
                            things. Between books and boarding gates. Between
                            creative ideas and the systems that bring them to
                            life. Between enjoying the internet and occasionally
                            wondering why it stopped working.
                          </p>

                          <p>
                            I love life's clichés: coffee shop corners,
                            bookstores, seat 37A, and The Beatles. I can happily
                            spend an afternoon reading, an evening talking about
                            a book on FaceTime with a friend, and far too much
                            time planning where to travel next.
                          </p>

                          <p>
                            Professionally, I build things for the internet.
                            Over the last few years, I've worked on digital
                            campaigns and website experiences for Calvin Klein
                            and Karl Lagerfeld. Launching pages, improving
                            systems, testing, troubleshooting, and learning that
                            the web has a sense of humour.
                          </p>

                          <p className="font-medium text-foreground">
                            This little corner of it is mine.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Work */}
      <section id="work" className="w-full border-t mt-space-lg">
        <div className="flex items-baseline justify-between mb-space-lg">
          <h2 className="text-body font-medium tracking-tight text-foreground">
            Work
          </h2>

          <span className="text-caption text-muted-foreground">02</span>
        </div>

        <div id="jobs" className="gap-4 flex flex-col">
          <div className="border-b border-border/60 pb-space-sm w-full flex gap-4">
            <Image
              src="/karl_lagerfeld_logo.jpg"
              alt="Karl Lagerfeld logo"
              width={40}
              height={40}
              sizes="50px"
              priority
            />

            <div>
              <p className="text-body text-foreground/80">
                Ecommerce Campaign Specialist
              </p>

              <p className="text-sm text-muted-foreground">Karl Lagerfeld</p>
            </div>
          </div>

          <div className="w-full flex gap-4">
            <Image
              src="/calvin_klein_logo.jpg"
              alt="Calvin Klein logo"
              width={40}
              height={40}
              sizes="50px"
              priority
            />

            <div>
              <p className="text-body text-foreground/80">
                Ecommerce CMS Coordinator
              </p>

              <p className="text-sm text-muted-foreground">Calvin Klein</p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel */}
      <section
        id="travel"
        className="w-full border-t pt-space-xl mt-space-2xl mb-space-lg"
      >
        <div className="flex flex-col mb-space-lg">
          <div className="flex items-baseline justify-between">
            <h2 className="text-body font-medium tracking-tight text-foreground">
              Travel Logs
            </h2>

            <span className="text-caption text-muted-foreground">03</span>
          </div>

          <p className="text-pretty text-body leading-relaxed text-foreground/70">
            A collection of places I have been, things I've noticed, and photos
            I wanted to keep.
          </p>
        </div>

        {travel}
      </section>
    </div>
  )
}
