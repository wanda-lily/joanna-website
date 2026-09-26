"use server"

import { getPrisma } from "@/lib/prisma"
import { Section } from "@prisma/client"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

const prisma = await getPrisma()
const utapi = new UTApi()

export type PostActionState =
  | null
  | {
      success: true
      section: Section
      postId: string
    }
  | {
      success: false
      error: string
    }

export type DeletePostActionState =
  | null
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

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

    console.log("CREATE POST:", {
      title,
      section,
      city: formData.get("city"),
      country: formData.get("country"),
    })

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    const slug = `${baseSlug}-${Date.now().toString(36)}`

    let geoData: {
      city: string | null
      country: string | null
      countryCode: string | null
      latitude: number | null
      longitude: number | null
    } = {
      city: null,
      country: null,
      countryCode: null,
      latitude: null,
      longitude: null,
    }
    // If it's a travel post, fetch geocoding data on the server
    if (section === "TRAVEL") {
      const city = formData.get("city") as string
      const country = formData.get("country") as string

      try {
        const url =
          `https://api.geoapify.com/v1/geocode/search` +
          `?text=${encodeURIComponent(`${city}, ${country}`)}` +
          `&format=json` +
          `&limit=1` +
          `&apiKey=${process.env.GEOAPIFY_KEY}`

        const response = await fetch(url)
        if (!response.ok) {
          const errorText = await response.text()

          console.error("Geoapify HTTP error:", {
            status: response.status,
            body: errorText,
          })

          throw new Error(`Geoapify returned ${response.status}`)
        }
        const data = (await response.json()) as any
        console.log("APIFY DATA:", data)

        if (data && data.results && data.results.length > 0) {
          const result = data.results[0]

          geoData = {
            city: city,
            country: country,
            countryCode: result.country_code?.toUpperCase() || null,
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
          }

          console.log("GEOAPIFY RESULT:", result)
        }
      } catch (err) {
        console.error("Geocoding failed:", err)
        return {
          success: false,
          error: "Could not locate the city and country provided.",
        }
      }
    }

    const images: { url: string; altText: string }[] = []

    let i = 0

    while (formData.get(`imageUrl-${i}`)) {
      images.push({
        url: formData.get(`imageUrl-${i}`) as string,
        altText: (formData.get(`altText-${i}`) as string) || "",
      })

      i++
    }

    const post = await prisma.post.create({
      data: {
        title,
        subtitle,
        body,
        slug,
        section,
        ...geoData,
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
      postId: post.id,
    }
  } catch (error) {
    console.error("createPost error:", error)

    return {
      success: false,
      error: "Something went wrong while publishing the post.",
    }
  }
}

export async function deletePost(
  _prevState: DeletePostActionState,
  formData: FormData,
): Promise<DeletePostActionState> {
  const { userId } = await auth()

  if (!userId) {
    return {
      success: false,
      error: "Unauthorized",
    }
  }

  const postId = formData.get("postId")

  if (typeof postId !== "string") {
    return {
      success: false,
      error: "Invalid post ID",
    }
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    })
    revalidatePath("/admin/posts")

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete post",
    }
  }
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
    const city = formData.get("city") as string
    const country = formData.get("country") as string

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
        city,
        country,

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
