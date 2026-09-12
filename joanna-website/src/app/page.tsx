"use client"
import { useState, useEffect } from "react"
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
      "I like the organised chaos of launching pages on websites.Building campaigns. Improving systems. Chasing bugs. Testing twice. Wondering why it worked yesterday. I've spent the last few years doing exactly that at Calvin Klein and Karl Lagerfeld. Turns out, that's exactly the kind of complexity I enjoy.",
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

export default function Home() {
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

  accordionRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })

  return (
    <div
      id="main"
      className="min-h-dvh max-w-6xl mx-auto flex flex-col  gap-space-xl px-space-lg py-space-xl"
    >
      <div
        id="intro"
        className="flex flex-col items-center justify-start w-full"
      >
        <div className="mt-space-2xl relative h-68 w-68 overflow-hidden rounded-full ring-2 ring-card ">
          <Image
            src="/joanna.png"
            alt="joanna picture"
            fill
            sizes="300px"
            priority
            className="object-cover object-top"
          />
        </div>

        <div className="text-center mt-space-lg">
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">
            Joanna
          </h1>
          <div className="flex justify-center">
            <HugeiconsIcon
              icon={Heart}
              className="mt-space-sm text-muted-foreground w-5 h-5 animate-in fade-in zoom-in-75  duration-500 delay-300"
            />
          </div>
        </div>

        <Card className=" mt-space-xl w-full bg-transparent border-none shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="font-normal text-body text-center leading-relaxed max-w-md mx-auto text-foreground/90">
              I love life's clichés: coffee shop corners, bookstores, seat 37A,
              and The Beatles. <br />
              Somewhere in between, I build things for the internet.
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
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
                className="border-none rounded-xl data-[state=open]:bg-card/60 duration-300 scroll-mt-20 sm:scroll-mt-20"
              >
                <AccordionTrigger className="h-10 justify-center py-space-sm text-caption text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                <AccordionContent className="overflow-hidden text-body leading-body">
                  <div className="px-space-md pb-space-lg pt-space-sm">
                    <div className="mt-space-md space-y-space-md text-base leading-[1.75] text-foreground/70 flex flex-col items-center">
                      <h2 className="text-h3 font-medium text-foreground ">
                        Somewhere in between
                      </h2>
                      <div className="space-y-space-sm text-center text-pretty w-3xl text-foreground/80">
                        <p>
                          I spend a lot of my life somewhere in between things.
                          Between books and boarding gates. Between creative
                          ideas and the systems that bring them to life. Between
                          enjoying the internet and occasionally wondering why
                          it stopped working.
                        </p>
                        <p>
                          I love life's clichés: coffee shop corners,
                          bookstores, seat 37A, and The Beatles. I can happily
                          spend an afternoon reading, an evening talking about a
                          book on FaceTime with a friend, and far too much time
                          planning where to travel next.
                        </p>
                        <p>
                          Professionally, I build things for the internet. Over
                          the last few years, I've worked on digital campaigns
                          and website experiences for Calvin Klein and Karl
                          Lagerfeld. Launching pages, improving systems,
                          testing, troubleshooting, and learning that the web
                          has a sense of humour.
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
          </CardContent>
        </Card>
      </div>

      <Section sections={sections} />

      <div className="flex flex-col  justify-center items-center gap-space-sm  pb-space-lg mt-space-lg border-border/40 pt-space-lg">
        {links.map((link) => (
          <Link href={link.href} key={link.value} passHref>
            <Button variant="link" className=" text-sm font-medium">
              {link.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
