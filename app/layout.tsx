import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import AuthProvider from "@/components/AuthProvider"
import LoginPopup from "@/components/LoginPopup"
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ScrapCenter India - Vehicle Scrapping Services",
  description:
    "Official authorized vehicle scrapping center in India. We specialize in environmentally friendly disposal of end-of-life vehicles (ELVs) in compliance with current regulations.",
  keywords:
    "scrap center, vehicle scrapping, car scrap, authorized scrapper, rto scrap, scrap car india",
  authors: [{ name: "ScrapCenter India" }],
  creator: "ScrapCenter India",
  publisher: "ScrapCenter India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://scrapcenter.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ScrapCenter India - Vehicle Scrapping Services",
    description:
      "Official authorized vehicle scrapping center in India. Get best price for your old car, bike or vehicle.",
    url: "https://scrapcenter.in",
    siteName: "ScrapCenter India",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ScrapCenter India Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrapCenter India - Vehicle Scrapping Services",
    description:
      "Official authorized vehicle scrapping center in India. Get best price for your old car, bike or vehicle.",
    images: ["/logo.png"],
    creator: "@scrapcenter_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="relative">
                {children}
              </main>
              <Footer />

              <LoginPopup />
              <WhatsAppFloatingButton />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
