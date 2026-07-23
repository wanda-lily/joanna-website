"use client"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import Section from "../components/Sections"
import {
  Heart,
  Monitor,
  Globe,
  Book,
  ArrowDownDoubleIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  return (
    <div
      id="main"
      className="min-h-screen flex flex-col justify-between gap-12 p-4"
    >
      <div
        id="intro"
        className="flex flex-col items-center justify-start w-full"
      >
        <div className="relative h-80 w-80 overflow-hidden rounded-full">
          <Image
            src="/joanna.png"
            alt="cat picture"
            fill
            sizes="500px"
            priority
            className="object-cover object-top"
          />
        </div>

        <h2 className="mt-10 text-6xl font-semibold">Joanna</h2>
        <p>
          <HugeiconsIcon icon={Heart} className="mt-6 text-gray-500" />
        </p>

        <Card className="w-full bg-transparent ring-0 mb-0 border-0 shadow-none">
          <CardHeader>
            <CardTitle>
              <div>
                <p className="text-center text-black tracking-wide font-normal text-sm">
                  I love life's clichés: coffee shop corners, bookstores, <br />{" "}
                  seat 37A, and The Beatles. <br />
                  Somewhere in between, I build things for the internet.
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              defaultValue=""
              className="border-0 shadow-none"
              onValueChange={(value) => {
                if (value === "about") {
                  /* FIX 2: Delay slightly increased to let the opening animation complete before calculating layout positions */
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
                className="not-last:border-b data-[state=open]:bg-card mx-5 scroll-mt-6 mt-10"
              >
                <AccordionTrigger className="mt-0 py-0 text-gray-500 hover:text-black transition-colors"></AccordionTrigger>

                <AccordionContent className="overflow-hidden text-black text-[15px]">
                  <div className="flex flex-col items-center pb-2">
                    <h2 className=" mt-20 text-center text-3xl mb-5">
                      Somewhere in between
                    </h2>

                    {/* FIX 5: Standardized content layout properties to keep block copy centered and readable instead of spreading out */}
                    <div className="mx-auto w-full max-w-xl space-y-4 text-left tracking-wide pb-4">
                      <p className="mb-10">
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
                      <p>This little corner of it is mine.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Section sections={sections} />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Link href={"/tiw"}>
          <Button variant="link">Things I wrote</Button>
        </Link>
        <Link href={"/current"}>
          <Button variant="link">Currently</Button>
        </Link>
        <Link href={"/recommendations"}>
          <Button variant="link">Recommendations</Button>
        </Link>
      </div>
    </div>
  )
}
