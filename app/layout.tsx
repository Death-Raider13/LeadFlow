import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "LeadFlow - Collect & Convert Leads Effortlessly",
  description:
    "LeadFlow helps you collect, organize, and reach out to leads via email and SMS. Grow your business with smart lead management.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon and favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon and favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon and favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon and favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon and favicon/favicon.ico" },
    ],
    apple: "/icon and favicon/apple-icon.png",
  },
  manifest: "/icon and favicon/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
