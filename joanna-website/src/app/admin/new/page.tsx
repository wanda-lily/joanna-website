"use client"
import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createPost } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { ImageUploadFields } from "@/components/ImageUpload"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/Header"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function NewPostPage() {
  const [section, setSection] = useState("")
  const router = useRouter()
  const [state, formAction, pending] = useActionState(createPost, null)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success("Published!", {
        description: "Your post has been published successfully.",
      })

      router.push(`/admin`)
    } else {
      toast.error("Publishing failed", {
        description: state.error,
      })
    }
  }, [state, router, toast])

  return (
    <section className="min-h-dvh max-w-4xl mx-auto">
      <Header section={"New"} />
      <form action={formAction} className="max-w-7xl mx-auto space-y-4 p-8">
        <Input name="title" placeholder="Title" required />

        <Input name="subtitle" placeholder="Subtitle" />

        <input type="hidden" name="section" value={section} />

        <Select value={section} onValueChange={setSection} required>
          <SelectTrigger>
            <SelectValue placeholder="Choose a section" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="WORK">Work</SelectItem>
            <SelectItem value="TRAVEL">Travel</SelectItem>
            <SelectItem value="BOOKS">Books</SelectItem>
            <SelectItem value="TIW">Things I wrote</SelectItem>
            <SelectItem value="CURRENT">Currently</SelectItem>
            <SelectItem value="RECOMMENDATIONS">Recommendations</SelectItem>
          </SelectContent>
        </Select>

        {section === "TRAVEL" && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                City
              </label>
              <Input
                name="city"
                placeholder="e.g. Toronto"
                required={section === "TRAVEL"}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Country
              </label>
              <Input
                name="country"
                placeholder="e.g. Canada"
                required={section === "TRAVEL"}
              />
            </div>
          </div>
        )}

        <Textarea
          name="body"
          className="min-h-125"
          placeholder="Write something..."
          required
          rows={50}
        />

        <ImageUploadFields />

        <Button type="submit" disabled={pending}>
          {pending ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </section>
  )
}
