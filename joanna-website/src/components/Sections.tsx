import { HugeiconsIcon } from "@hugeicons/react"
import {
  Heart,
  Monitor,
  Globe,
  Book,
  ArrowDownDoubleIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"

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

function Section() {
  return (
    // Main container wrapping all cards. Grid makes them sit nicely side-by-side.
    <div id="section" className="flex justify-evenly gap-4">
      {sections.map((item) => (
        <div
          key={item.value}
          className="border-black border rounded-lg p-6 flex flex-col items-center justify-start bg-white h-auto flex-1"
        >
          {/* Header section with Title and Icon */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <HugeiconsIcon icon={item.icon} className="size-6 text-black" />
            <h2 className="text-center text-black font-semibold text-xl">
              {item.title}
            </h2>
          </div>

          {/* Body content */}
          <div className="text-center text-black text-sm leading-relaxed space-y-2">
            {item.content}
          </div>

          {/* Arrow */}

          <Link href={`/${item.value}`}>
            {" "}
            <HugeiconsIcon
              icon={ArrowDownDoubleIcon}
              strokeWidth={2}
              className="pointer-events-none shrink-0"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Section
