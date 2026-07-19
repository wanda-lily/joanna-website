"use client"

import { useState } from "react"
import { updatePost } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  const updatePostWithId = updatePost.bind(null, post.id)

  return (
    <form action={updatePostWithId} className="max-w-2xl mx-auto space-y-4 p-8">
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

      <div>
        <p className="text-sm text-gray-500 mb-2">
          Current images ({post.images.length}). Uploading new ones will replace
          them.
        </p>
        <div className="flex gap-2 mb-4">
          {post.images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>
        {/* reuse your existing ImageUploadFields component here */}
      </div>

      <Button type="submit">Save changes</Button>
    </form>
  )
}
