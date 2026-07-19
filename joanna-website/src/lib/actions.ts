"use server"

import { prisma } from "./prisma"
import { Section } from "@prisma/client"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function createPost(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const subtitle = formData.get("subtitle") as string
  const body = formData.get("body") as string
  const section = formData.get("section") as Section
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // strip anything that isn't a letter, number, space, or hyphen
    .replace(/\s+/g, "-") // collapse whitespace into hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens into one
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

  redirect(`/posts/${slug}`)
}

export async function deletePost(postId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  await prisma.post.delete({
    where: { id: postId },
  })

  redirect("/admin/posts")
}

export async function updatePost(postId: string, formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

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
      // only touch images if new ones were uploaded — otherwise leave existing ones alone
      ...(newImages.length > 0 && {
        images: {
          deleteMany: {}, // clear old image rows for this post
          create: newImages.map((img, idx) => ({
            url: img.url,
            altText: img.altText,
            order: idx,
          })),
        },
      }),
    },
  })

  redirect(
    `/posts/${(await prisma.post.findUnique({ where: { id: postId } }))!.slug}`,
  )
}
