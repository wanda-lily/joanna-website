import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Heart } from "@hugeicons/core-free-icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { title } from "node:process"
import Section from "../components/Sections"

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
      <Section />
      <div className="flex-1 flex flex-col justify-center items-center border-black border rounded-lg">
        <a>Things I wrote</a>
        <a>Currently</a>
        <a>Recommendations</a>
      </div>
    </div>
  )
}
