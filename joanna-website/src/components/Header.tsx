import Link from "next/link"

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40">
      <div className="flex h-14 items-center justify-between px-space-md">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border font-semibold text-body hover:bg-card transition-colors">
          <Link
            href="/"
            className="w-full h-full flex items-center justify-center"
          >
            J
          </Link>
        </div>

        <nav className="flex gap-space-md font-medium text-caption text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link
            href="/books"
            className="hover:text-foreground transition-colors"
          >
            Books
          </Link>
          <Link
            href="/travel"
            className="hover:text-foreground transition-colors"
          >
            Travel
          </Link>
          <Link
            href="/work"
            className="hover:text-foreground transition-colors"
          >
            Work
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
