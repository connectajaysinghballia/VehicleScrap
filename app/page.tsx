"use client"

import { useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import HeroSection from "@/components/HeroSection"
import ServicesSection from "@/components/ServicesSection"
import FeaturesSection from "@/components/FeaturesSection"
import FAQSection from "@/components/FAQSection"
import ReviewSection from "@/components/ReviewSection"
import WelcomePopup from "@/components/WelcomePopup"



export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Loader animation duration
    const loaderTimeout = setTimeout(() => setShowLoader(false), 800)

    return () => {
      clearTimeout(loaderTimeout)
    }
  }, [])

  return (
    <div className="bg-background min-h-screen text-foreground">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="text-center"
            >
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="w-32 md:w-48 mx-auto"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "backOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showLoader && (
        <>
          <WelcomePopup />
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <FAQSection />
          <ReviewSection />
        </>
      )}
    </div>
  )
}
