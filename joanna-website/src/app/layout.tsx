import React from "react"
import type { Metadata } from "next"
import { Roboto_Flex, Roboto, Roboto_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { ClerkProvider } from "@clerk/nextjs"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <ClerkProvider>
      <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
        <body className="min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <main id="root-body" className="flex-1 ">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
