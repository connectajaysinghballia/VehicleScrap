"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

export const GA_MEASUREMENT_ID = "G-CWNMVTX4QR"

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only track page views if NOT on excluded routes
    if (
      pathname &&
      !pathname.startsWith('/admin') &&
      !pathname.startsWith('/admin-dashboard') &&
      !pathname.startsWith('/b2b-login')
    ) {
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
          page_path: pathname + searchParams.toString(),
        })
      }
    }
  }, [pathname, searchParams])

  // Don't render the script at all if on an excluded route
  if (
    pathname &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/admin-dashboard') ||
      pathname.startsWith('/b2b-login'))
  ) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
