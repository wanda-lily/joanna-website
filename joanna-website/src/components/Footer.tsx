"use client"
import { HugeiconsIcon } from "@hugeicons/react"
import { Linkedin02Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "./ui/button"

const currentYear = new Date().getFullYear()

function Footer() {
  async function copyEmail() {
    const email = "joannaanimasaun@gmail.com"
    try {
      await navigator.clipboard.writeText(email)
      toast.success(" Email copied to clipboard")
    } catch (error) {
      console.log("ERR", error)
      toast.error("Couldn't copy email address")
    }
  }

  return (
    <footer className="w-full max-w-4xl mx-auto border-t border-border  mt-auto">
      <div className=" h-14 mx-auto px-space-md flex flex-col sm:flex-row justify-between items-center gap-space-md">
        <div
          id="copyright"
          className="flex items-center gap-space-sm text-caption text-muted-foreground font-medium"
        >
          <span>&copy; {currentYear} Joanna Animasaun</span>
        </div>

        <div
          id="contact"
          className="flex items-center gap-space-md text-muted-foreground"
        >
          <Link
            href="https://www.linkedin.com/in/joanna-tumininu-animasaun-48aa561b9/"
            aria-label="LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={Linkedin02Icon} className="size-4" />
          </Link>

          <Button onClick={copyEmail} variant="link" aria-label="Email">
            <HugeiconsIcon
              icon={Mail01Icon}
              className="size-4 text-muted-foreground hover:text-foreground! transition-colors"
            />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

export default Footer
