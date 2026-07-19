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

import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

function ImageUploadFields() {
  const [uploaded, setUploaded] = useState<{ url: string; altText: string }[]>(
    [],
  )

  return (
    <div className="space-y-3">
      <UploadButton<OurFileRouter, "postImages">
        endpoint="postImages"
        appearance={{
          button:
            "bg-black text-white px-4 py-2 rounded hover:bg-gray-800 ut-uploading:bg-gray-400",
          allowedContent: "text-gray-500 text-xs",
        }}
        onClientUploadComplete={(res) => {
          setUploaded(res.map((f) => ({ url: f.url, altText: "" })))
        }}
      />
      {uploaded.map((img, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <img src={img.url} className="w-12 h-12 object-cover rounded" />
          <input
            value={img.altText}
            name={`altText-${i}`}
            placeholder={`Alt text for image ${i + 1}`}
            className="border rounded px-2 py-1 text-sm flex-1"
            onChange={(e) => {
              setUploaded((prev) =>
                prev.map((item, idx) =>
                  idx === i ? { ...item, altText: e.target.value } : item,
                ),
              )
            }}
          />
          {/* hidden inputs so the URLs travel with the form to your Server Action */}
          <input type="hidden" name={`imageUrl-${i}`} value={img.url} />
        </div>
      ))}
    </div>
  )
}

export default function NewPostPage() {
  const [section, setSection] = useState("")

  return (
    <form action={createPost} className="max-w-7xl mx-auto space-y-4 p-8">
      <Input name="title" placeholder="Title" required />
      <Input name="subtitle" placeholder="Subtitle" />

      {/* hidden input mirrors the Select's value so it serializes into FormData */}
      <input type="hidden" name="section" value={section} />
      <Select onValueChange={setSection} required>
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

      <Textarea
        name="body"
        className="min-h-125"
        placeholder="Write something..."
        required
        rows={50}
      />

      <ImageUploadFields />

      <Button type="submit">Publish</Button>
    </form>
  )
}
