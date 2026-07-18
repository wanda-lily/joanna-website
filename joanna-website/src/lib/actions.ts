"use server"

import { prisma } from "./prisma"
import { Section } from "@prisma/client"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { UTApi } from "uploadthing/server"

const utapi = new UTApi()

export async function createPost(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const body = formData.get("body") as string
  const section = formData.get("section") as Section
  const files = formData.getAll("images") as File[]

  const slug = title.toLowerCase().replace(/\s+/g, "-")

  // Filter out the empty file input Next sends when nothing's selected
  const validFiles = files.filter((f) => f.size > 0)

  let uploadedUrls: string[] = []
  if (validFiles.length > 0) {
    const results = await utapi.uploadFiles(validFiles)
    uploadedUrls = results.filter((r) => r.data).map((r) => r.data!.url)
  }

  await prisma.post.create({
    data: {
      title,
      body,
      slug,
      section,
      images: {
        create: uploadedUrls.map((url, i) => ({ url, order: i })),
      },
    },
  })

  redirect(`/posts/${slug}`)
}
