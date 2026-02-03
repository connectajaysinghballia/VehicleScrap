"use client"

import { useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import HeroSection from "@/components/HeroSection"
import ServicesSection from "@/components/ServicesSection"
import FeaturesSection from "@/components/FeaturesSection"
import WelcomePopup from "@/components/WelcomePopup"



export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Loader animation duration
    const loaderTimeout = setTimeout(() => setShowLoader(false), 2500)

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
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-50 text-white"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold tracking-tighter"
                initial={{ letterSpacing: "-0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0em", opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              >
                <span className="text-white">Scrap</span>{" "}
                <span className="text-orange-500">Center</span>
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-1 bg-orange-500 mt-4 rounded-full mx-auto max-w-[200px]"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-4 text-gray-400 font-medium tracking-widest text-sm uppercase"
              >
                Premium Vehicle Recycling
              </motion.p>
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
        </>
      )}
    </div>
  )
}
