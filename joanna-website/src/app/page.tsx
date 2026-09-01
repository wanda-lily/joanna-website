"use client"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import Section from "../components/Sections"
import { Heart, Monitor, Globe, Book } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef } from "react"

const sections = [
  {
    value: "work",
    icon: Monitor,
    title: "Work",
    content:
      "I like the organised chaos of launching pages on websites.Building campaigns. Improving systems. Chasing bugs. Testing twice. Wondering why it worked yesterday. I've spent the last few years doing exactly that at Calvin Klein and Karl Lagerfeld. Turns out, that's exactly the kind of complexity I enjoy.",
  },
  {
    value: "travel",
    icon: Globe,
    title: "Travel",
    content:
      "I appreciate the unpredictability of travel. There's the frustration of navigating Rhodes with Google Maps, or missing the last train in Basel because my friend accidentally bought two one-way tickets. From sitting in a freezing car with my siblings in below-zero temperatures in Lapland to spending an evening with a friend in Dundas Square, Toronto, every trip leaves me with cherished memories I'll probably think about for years to come.",
  },
  {
    value: "books",
    icon: Book,
    title: "Books",
    content:
      "My commitment to reading books, and geeking out over them on FaceTime with my friend for hours until we completely lose track of time, is the highest level of devotion outside of organised religion. I love the comfort of knowing there will always be another book waiting on the shelf.",
  },
]

export default function Home() {
  const accordionRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef(null)
  return (
    <div
      id="main"
      className="min-h-screen max-w-6xl mx-auto flex flex-col justify-between gap-space-xl p-space-lg"
    >
      <div
        id="intro"
        className="flex flex-col items-center justify-start w-full gap-space-lg"
      >
        <div className="relative h-48 w-48 overflow-hidden rounded-full ring-4 ring-card">
          <Image
            src="/joanna.png"
            alt="joanna picture"
            fill
            sizes="300px"
            priority
            className="object-cover object-top"
          />
        </div>

        <div className="text-center space-y-space-sm">
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">
            Joanna
          </h1>
          <div className="flex justify-center">
            <HugeiconsIcon
              icon={Heart}
              className="text-muted-foreground w-5 h-5"
            />
          </div>
        </div>

        <Card className="w-full bg-transparent border-none shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="font-normal text-body text-center leading-relaxed max-w-md mx-auto text-foreground/90">
              I love life's clichés: coffee shop corners, bookstores, seat 37A,
              and The Beatles. <br />
              Somewhere in between, I build things for the internet.
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 mt-space-md">
            <Accordion
              type="single"
              collapsible
              defaultValue=""
              className="border-0 shadow-none"
              onValueChange={(value) => {
                if (value === "about") {
                  setTimeout(() => {
                    accordionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }, 300)
                }
              }}
            >
              <AccordionItem
                ref={accordionRef}
                value="about"
                className="border-none rounded-xl data-[state=open]:bg-card transition-all duration-300 scroll-mt-space-lg"
              >
                <AccordionTrigger className="h-10 justify-center py-space-sm text-caption text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                <AccordionContent className="text-body leading-relaxed px-space-md pb-space-md">
                  <div className="flex flex-col items-center justify-start w-full gap-space-sm">
                    {" "}
                    <h2 className="text-h3 font-medium text-foreground">
                      Somewhere in between
                    </h2>
                    <div className="w-full space-y-space-sm text-left text-foreground/80">
                      <p>
                        I spend a lot of my life somewhere in between things.
                        Between books and boarding gates. Between creative ideas
                        and the systems that bring them to life. Between
                        enjoying the internet and occasionally wondering why it
                        stopped working.
                      </p>
                      <p>
                        I love life's clichés: coffee shop corners, bookstores,
                        seat 37A, and The Beatles. I can happily spend an
                        afternoon reading, an evening talking about a book on
                        FaceTime with a friend, and far too much time planning
                        where to travel next.
                      </p>
                      <p>
                        Professionally, I build things for the internet. Over
                        the last few years, I've worked on digital campaigns and
                        website experiences for Calvin Klein and Karl Lagerfeld.
                        Launching pages, improving systems, testing,
                        troubleshooting, and learning that the web has a sense
                        of humour.
                      </p>
                      <p className="font-medium text-foreground">
                        This little corner of it is mine.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="w-full py-space-xs">
        <Section sections={sections} />
      </div>

      <div className="flex flex-col  justify-center items-center gap-space-sm sm:gap-space-lg pb-space-sm border-t border-border/40 pt-space-lg">
        <Link href="/tiw" passHref>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-foreground text-caption font-medium"
          >
            Things I wrote
          </Button>
        </Link>
        <Link href="/current" passHref>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-foreground text-caption font-medium"
          >
            Currently
          </Button>
        </Link>
        <Link href="/recommendations" passHref>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-foreground text-caption font-medium"
          >
            Recommendations
          </Button>
        </Link>
      </div>
    </div>
  )
}
