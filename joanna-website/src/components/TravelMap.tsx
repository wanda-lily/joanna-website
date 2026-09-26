"use client"

import { useState } from "react"
import type { Post } from "@/generated/prisma/client"
import Link from "next/link"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps/core"
import { geoCentroid } from "d3-geo"

type TravelPost = Pick<
  Post,
  "id" | "city" | "country" | "countryCode" | "latitude" | "longitude"
>

type TravelMapProps = {
  posts: TravelPost[]
}

export default function TravelMap({ posts }: TravelMapProps) {
  const geoUrl = "/world-geo.json"
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [cardPosition, setCardPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const postsByCountry = posts.reduce<Record<string, TravelPost[]>>(
    (acc, post) => {
      if (!post.countryCode) {
        return acc
      }
      if (!acc[post.countryCode]) {
        acc[post.countryCode] = []
      }

      acc[post.countryCode].push(post)

      return acc
    },
    {},
  )
  const visitedCountries = new Set(posts.map((post) => post.countryCode))

  const selectedPosts = selectedCountry
    ? (postsByCountry[selectedCountry] ?? [])
    : []

  return (
    // <div className="relative w-full" style={{ aspectRatio: "800 / 450" }}>
    <div className="relative w-full aspect-square sm:aspect-[16/9]">
      <ComposableMap
        width={800}
        height={450}
        projection="geoEqualEarth"
        projectionConfig={{
          rotate: [0, 0],
          scale: 200,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies, borders, projection }) => (
            <g>
              {geographies.map((geo) => {
                const countryCode = geo.properties?.iso_a2
                const isVisited = visitedCountries.has(countryCode)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isVisited ? "#C28B2D" : "#f6f2e9"}
                    className={
                      isVisited
                        ? "cursor-pointer outline-none hover:fill-neutral-700"
                        : "outline-none"
                    }
                    onClick={(event) => {
                      if (!isVisited) return

                      const [longitude, latitude] = geoCentroid(geo)
                      const point = projection([longitude, latitude])
                      if (!point) return
                      const [x, y] = point

                      const svgEl = event.currentTarget.ownerSVGElement
                      const rect = svgEl?.getBoundingClientRect()
                      const scaleX = rect ? rect.width / 800 : 1
                      const scaleY = rect ? rect.height / 450 : 1

                      setSelectedCountry(countryCode)
                      setCardPosition({ x: x * scaleX, y: y * scaleY })
                    }}
                  />
                )
              })}
              <path
                d={borders?.svgPath || ""}
                fill="none"
                stroke="#FFF"
                strokeWidth={0.5}
              />
            </g>
          )}
        </Geographies>
      </ComposableMap>

      {selectedCountry && selectedPosts.length > 0 && (
        <div
          className="absolute z-10 w-64 -translate-x-1/2 -translate-y-full rounded-md bg-card p-4 shadow-xs"
          style={{
            left: cardPosition?.x,
            top: cardPosition?.y,
          }}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-body font-medium ">
                {`${selectedPosts[0].country} (${selectedPosts.length}) `}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCountry(null)}
              className="text-xl leading-none text-neutral-400 hover:text-black"
            >
              ×
            </button>
          </div>

          <div className="space-y-1 border-t pt-2">
            {selectedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/travel/${post.id}`}
                className="text-sm text-muted-foreground block rounded-md  hover:underline"
              >
                {post.city}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
