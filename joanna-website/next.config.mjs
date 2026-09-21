/** @type {import('next').NextConfig} */

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()

const nextConfig = {
  /* config options here */
  experimental: {
    cpus: 1,
  },
  reactCompiler: true,
  allowedDevOrigins: ["172.20.10.3", "localhost:3000"],
  images: {
    unoptimized: true, // NEW — Vercel's image optimizer isn't available on Workers
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
}

export default nextConfig
