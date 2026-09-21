"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { updatePost } from "@/lib/actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import type { Post, PostImage, Section } from "@prisma/client"

export function EditPostForm({
  post,
}: {
  post: Post & { images: PostImage[] }
}) {
  const [section, setSection] = useState<Section>(post.section)

  const router = useRouter()

  const updatePostWithId = updatePost.bind(null, post.id)

  const [state, formAction, pending] = useActionState(updatePostWithId, null)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success("Changes saved", {
        description: "Your post has been updated successfully.",
      })

      router.push(`/admin`)
    } else {
      toast.error("Save failed", {
        description: state.error,
      })
    }
  }, [state, router, toast])

  return (
    <form action={formAction} className="max-w-2xl mx-auto space-y-4 p-8">
      <Input name="title" defaultValue={post.title} required />

      <Input name="subtitle" defaultValue={post.subtitle} />

      <input type="hidden" name="section" value={section} />

      <Select value={section} onValueChange={(v) => setSection(v as Section)}>
        <SelectTrigger>
          <SelectValue />
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

      <Textarea name="body" defaultValue={post.body} required rows={20} />

      {/* Images go here */}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}
