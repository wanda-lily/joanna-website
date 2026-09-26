"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { updatePost } from "@/lib/actions"

import { ImageUploadFields } from "@/components/ImageUpload"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { Post, PostImage, Section } from "@/generated/prisma/client"

export function EditPostForm({
  post,
}: {
  post: Post & { images: PostImage[] }
}) {
  const [section, setSection] = useState<Section>(post.section)

  const router = useRouter()

  const updatePostWithId = updatePost.bind(null, post.id)
  const [open, setOpen] = useState(false)

  const [state, formAction, pending] = useActionState(updatePostWithId, null)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success("Your post has been updated successfully.")
      setOpen(false)

      router.push(`/admin`)
    } else {
      toast.error("Save failed", {
        description: state.error,
      })
      setOpen(false)
    }
  }, [state, router, toast])

  return (
    <form
      action={formAction}
      id="edit-post-form"
      className="max-w-7xl mx-auto space-y-4 p-8"
    >
      <label
        className="text-body font-semibold text-muted-foreground block mb-1"
        htmlFor="title"
      >
        Title
      </label>
      <Input
        name="title"
        placeholder="Title"
        defaultValue={post.title}
        required
      />
      <label
        className="text-body font-semibold text-muted-foreground block mb-1"
        htmlFor="subtitle"
      >
        Subtitle
      </label>
      <Input
        name="subtitle"
        placeholder="Subtitle"
        defaultValue={post.subtitle}
      />
      <label
        className="text-body font-semibold text-muted-foreground block mb-1"
        htmlFor="section"
      >
        Section
      </label>
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
      {section === "TRAVEL" && (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
          <div>
            <label className="text-body font-semibold text-muted-foreground block mb-1">
              City
            </label>
            <Input
              name="city"
              placeholder="e.g. Toronto"
              defaultValue={post.city ?? ""}
              required={section === "TRAVEL"}
            />
          </div>
          <div>
            <label className="text-body font-semibold text-muted-foreground block mb-1">
              Country
            </label>
            <Input
              name="country"
              placeholder="e.g. Canada"
              defaultValue={post.country ?? ""}
              required={section === "TRAVEL"}
            />
          </div>
        </div>
      )}

      <label
        className="text-body font-semibold text-muted-foreground block mb-1"
        htmlFor="body"
      >
        Content
      </label>
      <Textarea
        name="body"
        className="min-h-125"
        placeholder="Write something..."
        defaultValue={post.body}
        required
        rows={50}
      />
      <ImageUploadFields />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" type="button">
            Save Changes
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm bg-background rounded-md">
          <DialogHeader>
            <DialogTitle>Update post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently update your
              post.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" form="edit-post-form" disabled={pending}>
              {pending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}
