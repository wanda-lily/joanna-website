import { Separator } from "@/components/ui/separator"

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <div className="flex flex-col gap-2 border-t">
      <div className="flex h-16 items-center justify-center mt-2">
        &copy; {currentYear}
      </div>
    </div>
  )
}

export default Footer
