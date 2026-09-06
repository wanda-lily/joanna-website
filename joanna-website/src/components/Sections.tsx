import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
    <div
      id="section"
      className="grid grid-cols-1 gap-space-md md:grid-cols-3  md:gap-space-lg"
    >
      {sections.map((item) => (
        <Card
          key={item.value}
          className=" border-border/50  bg-card/60 shadow-none  transition-colors duration-300 hover:bg-card  hover:-translate-y-0.5"
        >
          <CardHeader className=" flex flex-col items-center p-space-lg pb-space-md text-center ">
            <HugeiconsIcon
              icon={item.icon}
              className="h-6 w-6 text-muted-foreground/70"
              strokeWidth={1.5}
            />

            <Link
              href={`/${item.value}`}
              className="mt-space-sm  text-xl font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-foreground/70 hover:underline"
              aria-label={`View ${item.title}`}
            >
              {item.title}
            </Link>
          </CardHeader>

          <CardContent className="  px-space-lg pb-space-lg pt-0 text-center">
            <p className=" text-base leading-relaxed text-foreground/65 text-pretty">
              {item.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Section
