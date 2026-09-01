import Link from "next/link"
import { Button } from "./ui/button"

const navItems = [
  { href: "/", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/travel", label: "Travel" },
  { href: "/work", label: "Work" },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background">
      <div className="flex h-14 items-center justify-between px-space-md">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border font-semibold text-body transition-colors hover:bg-card"
          aria-label="Home"
        >
          J
        </Link>

        <nav className="flex gap-space-md font-medium text-caption text-muted-foreground ">
          {navItems.map(({ href, label }) => (
            <Button key={href} variant="ghost" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
