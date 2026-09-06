"use server"

import { getPrisma } from "@/lib/prisma"
import { Section } from "@prisma/client"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { UTApi } from "uploadthing/server"

const prisma = await getPrisma()
const utapi = new UTApi()

export type PostActionState =
  | {
      success: true
      section: Section
      postId: string
    }
  | {
      success: false
      error: string
    }
  | null

export async function createPost(
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState & { slug?: string }> {
  const { userId } = await auth()

  if (!userId) {
    return {
      success: false,
      error: "Unauthorized",
    }
  }

  try {
    const title = formData.get("title") as string
    const subtitle = formData.get("subtitle") as string
    const body = formData.get("body") as string
    const section = formData.get("section") as Section

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    const slug = `${baseSlug}-${Date.now().toString(36)}`

    const images: { url: string; altText: string }[] = []

    let i = 0

    while (formData.get(`imageUrl-${i}`)) {
      images.push({
        url: formData.get(`imageUrl-${i}`) as string,
        altText: (formData.get(`altText-${i}`) as string) || "",
      })

      i++
    }

    await prisma.post.create({
      data: {
        title,
        subtitle,
        body,
        slug,
        section,
        images: {
          create: images.map((img, idx) => ({
            url: img.url,
            altText: img.altText,
            order: idx,
          })),
        },
      },
    })

    return {
      success: true,
      slug,
      section,
    }
  } catch (error) {
    console.error("createPost error:", error)

    return {
      success: false,
      error: "Something went wrong while publishing the post.",
    }
  }
}

export async function deletePost(postId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  await prisma.post.delete({
    where: { id: postId },
  })

  redirect("/admin/posts")
}

export async function updatePost(
  postId: string,
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const { userId } = await auth()

  if (!userId) {
    return {
      success: false,
      error: "Unauthorized",
    }
  }

  try {
    const title = formData.get("title") as string
    const subtitle = formData.get("subtitle") as string
    const body = formData.get("body") as string
    const section = formData.get("section") as Section

    const newImages: { url: string; altText: string }[] = []

    let i = 0

    while (formData.get(`imageUrl-${i}`)) {
      newImages.push({
        url: formData.get(`imageUrl-${i}`) as string,
        altText: (formData.get(`altText-${i}`) as string) || "",
      })

      i++
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        subtitle,
        body,
        section,

        ...(newImages.length > 0 && {
          images: {
            deleteMany: {},
            create: newImages.map((img, idx) => ({
              url: img.url,
              altText: img.altText,
              order: idx,
            })),
          },
        }),
      },
    })

    return {
      success: true,
      section,
      postId,
    }
  } catch (error) {
    console.error("updatePost error:", error)

    return {
      success: false,
      error: "Something went wrong while saving your changes.",
    }
  }
}

export async function deleteUploadedImage(imageUrl: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const fileKey = imageUrl.split("/").pop()

  if (!fileKey) {
    throw new Error("Invalid UploadThing URL")
  }

  await utapi.deleteFiles(fileKey)

  return {
    success: true,
  }
}
