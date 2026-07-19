import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import Section from "../components/Sections"
import { Heart, Monitor, Globe, Book } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
      "Travel I appreciate the unpredictability of travel. There's the frustration of navigating Rhodes with Google Maps, or missing the last train in Basel because my friend accidentally bought two one-way tickets. From sitting in a freezing car with my siblings in below-zero temperatures in Lapland to spending an evening with a friend in Dundas Square, Toronto, every trip leaves me with cherished memories I'll probably think about for years to come.",
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
  return (
    <div id="main" className="grid h-full grid-rows-[3fr_3fr_1fr] gap-4 p-4">
      <div
        id="intro"
        className="flex flex-col items-center justify-center rounded-lg border border-black"
      >
        <div className="relative h-80 w-80 overflow-hidden rounded-full">
          <Image
            src="/cat.jpg"
            alt="cat picture"
            fill
            sizes="320px"
            priority
            className="object-cover object-top"
          />
        </div>

        <p></p>

        <h1 className="mt-4 text-black font-semibold">Joanna</h1>
        <HugeiconsIcon icon={Heart} />
        <p className="text-center text-black">
          I love life's clichés: coffee shop corners, bookstores, <br /> seat
          37A, and The Beatles. <br />
          Somewhere in between, I build things for the internet.
        </p>
      </div>
      <Section sections={sections} />
      <div className="flex-1 flex flex-col justify-center items-center border-black border rounded-lg">
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
