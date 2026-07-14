import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Heart, Monitor, Globe, Book } from "@hugeicons/core-free-icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="grid h-full grid-rows-[3fr_3fr_1fr] gap-4 p-4">
      <div className="flex flex-col items-center justify-center rounded-lg border border-black">
        <div className="relative h-80 w-80 overflow-hidden rounded-full">
          <Image
            src="/cat.jpg"
            alt="cat picture"
            fill
            className="object-cover object-top"
          />
        </div>

        <h1 className="mt-4 text-black font-semibold">Joanna</h1>
        <HugeiconsIcon icon={Heart} />
        <p className="text-center text-black">
          I love life's clichés: coffee shop corners, bookstores, <br /> seat
          37A, and The Beatles. <br />
          Somewhere in between, I build things for the internet.
        </p>
      </div>
      <div className="border-black border rounded-lg flex gap-4 p-4 ">
        <div className="flex-1 flex flex-col justify-center items-center border-black border rounded-lg w-3">
          <h2 className="text-center text-black font-semibold">Work</h2>
          <HugeiconsIcon icon={Monitor} />
          <p className="text-center text-black">
            I like the organised chaos of launching pages on websites.
            <br /> Building campaigns. Improving systems. Chasing bugs.
            <br /> Testing twice. Wondering why it worked yesterday. <br />
            I've spent the last few years doing exactly that at Calvin Klein
            <br /> and Karl Lagerfeld. <br />
            Turns out, that's exactly the kind of complexity I enjoy.
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center border-black border rounded-lg">
          <h2 className="text-center text-black font-semibold">Work</h2>
          <HugeiconsIcon icon={Monitor} />
          <p className="text-center text-black">
            I like the organised chaos of launching pages on websites.
            <br /> Building campaigns. Improving systems. Chasing bugs.
            <br /> Testing twice. Wondering why it worked yesterday. <br />
            I've spent the last few years doing exactly that at Calvin Klein
            <br /> and Karl Lagerfeld. <br />
            Turns out, that's exactly the kind of complexity I enjoy.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center border-black border rounded-lg">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center border-black border rounded-lg">
        <a>Things I wrote</a>
        <a>Currently</a>
        <a>Recommendations</a>
      </div>
    </div>
  )
}
