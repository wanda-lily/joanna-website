import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { ArrowDownDoubleIcon } from "@hugeicons/core-free-icons"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

type SectionItem = {
  value: string
  title: string
  content: string
  icon: IconSvgElement
}

type SectionProps = {
  sections: SectionItem[]
}

function Section({ sections }: SectionProps) {
  return (
    // Main container wrapping all cards. Grid makes them sit nicely side-by-side.
    <div id="section" className="flex justify-evenly gap-10 mx-10">
      {sections.map((item) => (
        <Card
          key={item.value}
          className="flex flex-col items-center justify-between flex-1 p-6"
        >
          <CardHeader className="flex flex-col items-center gap-2 p-0">
            <HugeiconsIcon icon={item.icon} className="size-8 text-gray-500" />
            <CardTitle>
              <h2 className="text-center text-black font-medium text-3xl">
                {item.title}
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-center text-md leading-relaxed  text-gray-500">
            <p className="text-pretty text-sm tracking-wide">{item.content}</p>
          </CardContent>
          <CardFooter className="p-0 mt-4">
            <Link href={`/${item.value}`}>
              {" "}
              <HugeiconsIcon
                icon={ArrowDownDoubleIcon}
                strokeWidth={2}
                className="pointer-events-none shrink-0  text-gray-500 h-4 w-4"
              />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Section
