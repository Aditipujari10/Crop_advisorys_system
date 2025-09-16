import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" },
  ],
}

export const metadata: Metadata = {
  title: "Smart Crop Advisory",
  description: "AI-powered crop advisory system for farmers",
  generator: "v0.app",
  applicationName: "Smart Crop Advisory",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smart Crop Advisory",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "android-app-installable": "yes",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased overflow-x-hidden select-none`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
