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
import { Button } from "./ui/button"

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
    <div
      id="section"
      className="flex flex-col md:flex-row justify-evenly gap-space-lg mx-space-lg"
    >
      {sections.map((item) => (
        <Card
          key={item.value}
          className="flex flex-col items-center flex-1 p-space-md basis-full sm:basis-1/2 md:basis-1/3"
        >
          <CardHeader className="flex flex-col items-center gap-space-sm p-0">
            <HugeiconsIcon
              icon={item.icon}
              className="h-8 w-8 text-muted-foreground"
            />
            <CardTitle>
              <Button variant="link">
                <Link href={`/${item.value}`} aria-label={`View ${item.title}`}>
                  {" "}
                  {item.title}
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-left text-body leading-relaxed text-muted-foreground">
            <p className="text-pretty text-caption tracking-wide">
              {item.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Section
