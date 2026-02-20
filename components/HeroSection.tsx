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
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-32 lg:pt-40 bg-gray-50">

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

          {/* Floating UI Elements / Tech Markers - Green/Navy Theme */}
          <div className="absolute top-20 left-20 w-16 h-16 border border-emerald-400/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-20 left-20 w-16 h-16 border-t border-emerald-600 rounded-full animate-[spin_15s_linear_infinite]"></div>

          <div className="absolute bottom-40 right-20 w-24 h-24 border border-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border-r border-blue-600/40 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>

          {/* Animated blobs - Cool Tones */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-800/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] animate-pulse delay-150"></div>
          {/* Right side blob */}
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-teal-400/20 rounded-full blur-[100px] animate-pulse delay-75"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 xl:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">

            {/* Carousel Headings - Premium Typography */}
            <div className="h-[120px] lg:h-[180px] relative flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeading}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-full text-center lg:text-left"
                >
                  {currentHeading === 0 && (
                    <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-sm">
                      India’s First <span className="relative inline-block px-2">
                        <span className="absolute inset-0 bg-emerald-200/50 -skew-y-2 rounded transform scale-105"></span>
                        <span className="relative text-emerald-700">Digital RVSF</span>
                      </span> Experience
                    </h1>
                  )}
                  {currentHeading === 1 && (
                    <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-sm">
                      We Scrap It <span className="relative inline-block px-2">
                        <span className="absolute inset-0 bg-slate-200/50 -skew-y-2 rounded transform scale-105"></span>
                        <span className="relative text-slate-700">The Right Way</span>
                      </span>
                    </h2>
                  )}
                  {currentHeading === 2 && (
                    <h3 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-sm">
                      Vehicles Retire <span className="relative inline-block px-2">
                        <span className="absolute inset-0 bg-teal-200/50 -skew-y-2 rounded transform scale-105"></span>
                        <span className="relative text-teal-700">The Legal Way</span>
                      </span>
                    </h3>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
              <Link href="/quote">
                <Button className="px-10 py-7 text-xl font-bold text-white bg-[#0E192D] hover:bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-900/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10">
                  <span className="drop-shadow-sm">Get Free Quote</span> <ArrowRight className="ml-3 w-6 h-6 animate-pulse" />
                </Button>
              </Link>
            </motion.div>

            {/* Exclusive Benefits - Dark Premium Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-8 flex flex-col items-center lg:items-start w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] bg-[#0E192D]/80 backdrop-blur px-3 py-1 rounded-full border border-emerald-500/30">
                  Exclusive Benefits
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl" style={{ perspective: "800px" }}>
                {[
                  { text: "Certificate of Deposit", icon: Banknote, accent: "emerald", gradient: "bg-gradient-to-br from-slate-800 to-emerald-900/80" },
                  { text: "25% Road Tax Rebate", icon: Sparkles, accent: "teal", gradient: "bg-gradient-to-br from-slate-800 to-teal-900/80" },
                  { text: "Registration Fee Waiver", icon: ShieldCheck, accent: "emerald", gradient: "bg-gradient-to-br from-emerald-900/70 to-slate-800" },
                  { text: "Tax Deduction on EV", icon: Leaf, accent: "teal", gradient: "bg-gradient-to-br from-teal-900/70 to-slate-800" }
                ].map((item, index) => {
                  const isActive = index === activeBenefit
                  const Icon = item.icon
                  const accentColor = item.accent === "emerald"
                    ? { ring: "ring-emerald-500/40", border: "border-emerald-500/60", glow: "shadow-emerald-500/20", icon: "text-emerald-400", iconBg: "bg-emerald-500/20" }
                    : { ring: "ring-teal-400/40", border: "border-teal-400/60", glow: "shadow-teal-400/20", icon: "text-teal-400", iconBg: "bg-teal-500/20" }
                  return (
                    <motion.div
                      key={index}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={isActive ? {
                        rotateY: 0,
                        opacity: 1,
                        scale: 1.04,
                        y: -4,
                      } : {
                        rotateY: 0,
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      transition={{
                        rotateY: { duration: 0.6, delay: index * 0.12, ease: [0.2, 0.65, 0.3, 0.9] },
                        opacity: { duration: 0.5, delay: index * 0.12 },
                        scale: { duration: 0.4 },
                        y: { duration: 0.4 },
                      }}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${item.gradient} transition-all duration-500 cursor-default
                        ${isActive
                          ? `${accentColor.border} ${accentColor.ring} ring-2 shadow-lg ${accentColor.glow}`
                          : "border-white/20 shadow-md"
                        }`}
                    >
                      <motion.div
                        animate={isActive ? { scale: 1.2, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 rounded-full ${accentColor.iconBg} flex-shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${accentColor.icon}`} />
                      </motion.div>
                      <span className={`font-bold text-sm transition-colors duration-500 ${isActive ? "text-white" : "text-slate-100"}`}>
                        {item.text}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
                        />
                      )}
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
              <h3 className="text-xl lg:text-xl xl:text-2xl font-bold text-slate-800 tracking-tight flex flex-col items-center gap-2">
                <span className="bg-white/80 backdrop-blur px-4 py-1 rounded-full shadow-sm border border-slate-100">
                  3 Step Way to
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicTextIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl lg:text-2xl xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 uppercase"
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

