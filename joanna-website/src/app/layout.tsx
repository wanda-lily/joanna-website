import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Figtree } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Joanna",
  description: "A place for cliches",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col m-5">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
