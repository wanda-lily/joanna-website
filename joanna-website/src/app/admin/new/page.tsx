"use client"
import { useState } from "react"
import { createPost } from "@/lib/actions"
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

export default function NewPostPage() {
  const [section, setSection] = useState("")
  return (
    <form action={createPost} className="max-w-xl mx-auto space-y-4 p-8">
      <Input name="title" placeholder="Title" required />

      {/* Note: shadcn's Select needs a hidden input to serialize into FormData
          since it's not a native <select> under the hood */}
      <input type="hidden" name="section" id="section-hidden" />
      <Select onValueChange={setSection} required>
        <SelectTrigger>
          <SelectValue placeholder="Choose a section" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="WORK">Work</SelectItem>
          <SelectItem value="TRAVEL">Travel</SelectItem>
          <SelectItem value="BOOKS">Books</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        name="body"
        placeholder="Write something..."
        required
        rows={10}
      />

      <Input type="file" name="images" multiple accept="image/*" />

      <Button type="submit">Publish</Button>
    </form>
  )
}
