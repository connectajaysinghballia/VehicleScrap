import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatWidget from "@/components/ChatWidget"
import AuthProvider from "@/components/AuthProvider"
import LoginPopup from "@/components/LoginPopup"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Riveyra Infotech - Digital Marketing & Development Services",
  description:
    "Leading IT services and consulting company with over 8 years of proven excellence in offshore IT industry. Specializing in Digital Marketing and Development services.",
  keywords:
    "digital marketing, web development, SEO, PPC, social media marketing, UI/UX design, mobile app development",
  authors: [{ name: "Riveyra Infotech" }],
  creator: "Riveyra Infotech",
  publisher: "Riveyra Infotech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://riveyrainfotch.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Riveyra Infotech - Digital Marketing & Development Services",
    description:
      "Leading IT services and consulting company with over 8 years of proven excellence in offshore IT industry.",
    url: "https://riveyrainfotch.com",
    siteName: "Riveyra Infotech",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Riveyra Infotech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riveyra Infotech - Digital Marketing & Development Services",
    description:
      "Leading IT services and consulting company with over 8 years of proven excellence in offshore IT industry.",
    images: ["/logo.png"],
    creator: "@RiveyraInfotech",
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
              <ChatWidget />
              <LoginPopup />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
