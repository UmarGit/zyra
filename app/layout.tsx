import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AnalyticsProvider } from "@/components/analytics-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Zyra - AI Image Generation",
  description: "Open-source, node-based AI image generation platform powered by Gemini 2.5 Flash",
  generator: 'Next.js',
  keywords: ['AI', 'image generation', 'node-based', 'open source', 'Gemini', 'creative tools'],
  authors: [{ name: 'Zyra Team' }],
  creator: 'Zyra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
