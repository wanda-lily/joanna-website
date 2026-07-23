import { HugeiconsIcon } from "@hugeicons/react"
import {
  Linkedin02Icon,
  InstagramIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"
import { ThemeToggle } from "./theme-toggle"

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="flex h-20 items-center justify-between px-4 border-t-2">
      <div
        id="copyright"
        className="flex items-center justify-center mt-2 gap-2"
      >
        <ThemeToggle />
        &copy; {currentYear}
      </div>

      <div
        id="contact"
        className="flex  items-center justify-center mt-2 gap-2"
      >
        <HugeiconsIcon icon={Linkedin02Icon} className="size-6 text-black" />
        <HugeiconsIcon icon={InstagramIcon} className="size-6 text-black" />
        <HugeiconsIcon icon={Mail01Icon} className="size-6 text-black" />
      </div>
    </footer>
  )
}

export default Footer
