import { Separator } from "@/components/ui/separator"

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="flex h-20 items-center justify-between px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500">
          J
        </div>

        <nav className="flex gap-6">
          <a>About</a>
          <a>Work</a>
          <a>Travel</a>
          <a>Books</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
