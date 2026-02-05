"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Banknote, ShieldCheck, Leaf, Sparkles, Car } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

import CardStack from "@/components/CardStack"

export default function HeroSection() {
  const [currentHeading, setCurrentHeading] = useState(0)
  const [activeBenefit, setActiveBenefit] = useState(0)
  const [dynamicTextIndex, setDynamicTextIndex] = useState(0)

  const dynamicTexts = [
    "Get Valuation",
    "Exchange Vehicle",
    "Sell Old Vehicle",
    "Buy New Vehicle"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % 3)
    }, 3000) // Change heading every 3 seconds

    const benefitTimer = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % 4)
    }, 2000)

    const textTimer = setInterval(() => {
      setDynamicTextIndex((prev) => (prev + 1) % dynamicTexts.length)
    }, 2500)

    return () => {
      clearInterval(timer)
      clearInterval(benefitTimer)
      clearInterval(textTimer)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-32 lg:pt-20 bg-gray-50">

      {/* Background Layer: Advanced Composition */}
      {/* Background Layer: Split Layout */}
      {/* Background Layer: Full Width Layout */}
      <div className="absolute inset-0 z-0">
        {/* Full Screen User Image Background */}
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://www.indusmotor.com/public/uploads/pages/441020220228115459.jpg')",
            }}
          />
          {/* Overlay to ensure text readability against the image - slightly stronger for full width */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

          {/* Decorative Dot Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#444 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          ></div>

          {/* Floating UI Elements / Tech Markers */}
          <div className="absolute top-20 left-20 w-16 h-16 border border-orange-400/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-20 left-20 w-16 h-16 border-t border-orange-600 rounded-full animate-[spin_15s_linear_infinite]"></div>

          <div className="absolute bottom-40 right-20 w-24 h-24 border border-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border-r border-blue-600/40 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>

          {/* Animated blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[100px] animate-pulse delay-150"></div>
          {/* Right side blob previously in separate div */}
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[100px] animate-pulse delay-75"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 xl:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">

            {/* Carousel Headings - Premium Typography */}
            <div className="h-[120px] lg:h-[180px] relative flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                {currentHeading === 0 && (
                  <motion.h1
                    key="heading1"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight drop-shadow-sm"
                  >
                    India’s First <span className="relative inline-block px-2">
                      <span className="absolute inset-0 bg-orange-200/50 -skew-y-2 rounded transform scale-105"></span>
                      <span className="relative text-orange-700">Digital RVSF</span>
                    </span> Experience
                  </motion.h1>
                )}
                {currentHeading === 1 && (
                  <motion.h2
                    key="heading2"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight drop-shadow-sm"
                  >
                    We Scrap It <span className="relative inline-block px-2">
                      <span className="absolute inset-0 bg-blue-200/50 -skew-y-2 rounded transform scale-105"></span>
                      <span className="relative text-blue-700">The Right Way</span>
                    </span>
                  </motion.h2>
                )}
                {currentHeading === 2 && (
                  <motion.h3
                    key="heading3"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight drop-shadow-sm"
                  >
                    Vehicles Retire <span className="relative inline-block px-2">
                      <span className="absolute inset-0 bg-green-200/50 -skew-y-2 rounded transform scale-105"></span>
                      <span className="relative text-green-700">The Legal Way</span>
                    </span>
                  </motion.h3>
                )}
              </AnimatePresence>
            </div>

            {/* Exclusive Benefits - Glassmorphism Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-8 flex flex-col items-center lg:items-start w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-gradient-to-r from-orange-600 to-transparent"></div>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-[0.2em] bg-orange-50/80 backdrop-blur px-3 py-1 rounded-full border border-orange-100">
                  Exclusive Benefits
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                {[
                  { text: "Certificate of Deposit", icon: Banknote, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", shadow: "shadow-blue-200/50", glow: "ring-blue-100" },
                  { text: "25% Road Tax Rebate", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", shadow: "shadow-purple-200/50", glow: "ring-purple-100" },
                  { text: "Registration Fee Waiver", icon: ShieldCheck, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", shadow: "shadow-orange-200/50", glow: "ring-orange-100" },
                  { text: "Tax Deduction on EV", icon: Leaf, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", shadow: "shadow-green-200/50", glow: "ring-green-100" }
                ].map((item, index) => {
                  const isActive = index === activeBenefit
                  return (
                    <motion.div
                      key={index}
                      animate={isActive ? {
                        scale: 1.05,
                        y: -5,
                        opacity: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.95)"
                      } : {
                        scale: 1,
                        y: 0,
                        opacity: 0.8,
                        backgroundColor: "rgba(255, 255, 255, 0.6)"
                      }}
                      className={`flex items-center gap-4 p-4 rounded-xl backdrop-blur-xl border transition-all duration-500 cursor-default group 
                        ${isActive ? `${item.border} ${item.shadow} shadow-lg ring-4 ${item.glow}` : "border-white/50 shadow-sm"}`}
                    >
                      <div className={`p-3 rounded-full ${item.bg} ${isActive ? "scale-110" : "scale-100"} transition-transform duration-500`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className={`font-bold text-sm transition-colors duration-500 ${isActive ? "text-gray-900" : "text-gray-700"}`}>{item.text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: Card Stack Animation with Dynamic Heading */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative flex flex-col items-center justify-start pt-44 lg:justify-center lg:pt-0 min-h-[600px] lg:pl-12 xl:pl-32"
          >
            {/* 3 Step Way Dynamic Heading - Centered relative to the column */}
            <div className="relative lg:absolute top-auto lg:top-48 xl:top-4 w-full text-center z-30 mb-8 lg:mb-0">
              <h3 className="text-xl lg:text-xl xl:text-2xl font-bold text-gray-800 tracking-tight flex flex-col items-center gap-2">
                <span className="bg-white/80 backdrop-blur px-4 py-1 rounded-full shadow-sm border border-gray-100">
                  3 Step Way to
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicTextIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl lg:text-2xl xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 uppercase"
                  >
                    {dynamicTexts[dynamicTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </h3>
            </div>

            {/* Shift cards to the right explicitly */}
            <div className="w-full lg:pl-48 flex justify-center lg:block lg:mt-14">
              <CardStack />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
