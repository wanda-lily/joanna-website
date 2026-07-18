import Link from "next/link"

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="flex h-20 items-center justify-between px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black">
          <Link href="/">J</Link>
        </div>

        <nav className="flex gap-6">
          <Link href="/">About</Link>
          <Link href="/books">Books</Link>
          <Link href="/travel">Travel</Link>
          <Link href="/work">Work</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
