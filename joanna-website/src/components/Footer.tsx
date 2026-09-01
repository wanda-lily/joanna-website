import { HugeiconsIcon } from "@hugeicons/react"
import {
  Linkedin02Icon,
  InstagramIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-space-lg mt-auto">
      <div className=" mx-auto px-space-md flex flex-col sm:flex-row justify-between items-center gap-space-md">
        <div
          id="copyright"
          className="flex items-center gap-space-sm text-caption text-muted-foreground font-medium"
        >
          <ThemeToggle />
          <span>&copy; {currentYear}</span>
        </div>

        <div
          id="contact"
          className="flex items-center gap-space-md text-muted-foreground"
        >
          <Link
            href="#"
            aria-label="LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={Linkedin02Icon} className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={InstagramIcon} className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            aria-label="Email"
            className="hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={Mail01Icon} className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
