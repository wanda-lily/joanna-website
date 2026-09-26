"use client"

import { useState } from "react"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { deleteUploadedImage } from "@/lib/actions"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "./ui/button"
import { Cancel01FreeIcons } from "@hugeicons/core-free-icons"

type UploadedImage = {
  url: string
  altText: string
}

export function ImageUploadFields() {
  const [uploaded, setUploaded] = useState<UploadedImage[]>([])
  const [deleting, setDeleting] = useState<string | null>(null)

  async function removeImage(url: string) {
    setDeleting(url)

    try {
      await deleteUploadedImage(url)

      setUploaded((prev) => prev.filter((img) => img.url !== url))

      toast.success("Image removed", {
        description: "The image has been deleted.",
      })
    } catch (error) {
      console.error(error)

      toast.error("Could not remove image", {
        description: "Something went wrong deleting the image.",
      })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      <UploadButton<OurFileRouter, "postImages">
        endpoint="postImages"
        appearance={{
          button:
            "bg-black text-white px-4 py-2 rounded-4xl! hover:bg-gray-800 ut-uploading:bg-gray-400",
          allowedContent: "text-gray-500 text-xs",
        }}
        onClientUploadComplete={(res) => {
          if (!res || res.length === 0) {
            return
          }

          // Append instead of replacing previous uploads.
          const newImages = res.map((file) => ({
            url: file.ufsUrl,
            altText: "",
          }))

          setUploaded((prev) => [...prev, ...newImages])

          toast.success("Upload successful", {
            description: `${res.length} image${
              res.length === 1 ? "" : "s"
            } uploaded successfully.`,
          })
        }}
        onUploadError={(error) => {
          toast.error("Upload failed", {
            description: error.message || "The image could not be uploaded.",
          })
        }}
      />

      {uploaded.length > 0 && (
        <div className="space-y-3">
          {uploaded.map((img, i) => (
            <div key={img.url} className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={img.url}
                  alt={img.altText || `Uploaded image ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Remove Image"
                onClick={() => removeImage(img.url)}
              >
                <HugeiconsIcon icon={Cancel01FreeIcons}></HugeiconsIcon>
              </Button>

              <input
                value={img.altText}
                name={`altText-${i}`}
                placeholder={`Alt text for image ${i + 1}`}
                className="border rounded px-2 py-2 text-sm flex-1"
                onChange={(e) => {
                  setUploaded((prev) =>
                    prev.map((item, index) =>
                      index === i
                        ? {
                            ...item,
                            altText: e.target.value,
                          }
                        : item,
                    ),
                  )
                }}
              />

              <input type="hidden" name={`imageUrl-${i}`} value={img.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
