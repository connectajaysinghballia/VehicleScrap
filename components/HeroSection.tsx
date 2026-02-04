"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Banknote, ShieldCheck, Leaf, Sparkles, Car } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const messages = [
    "Turn Your Scrap into Cash",
    "Eco-Friendly Vehicle Recycling",
    "Best Value for Your Old Car"
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % messages.length
      const fullText = messages[i]

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 30 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, messages])

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-32 lg:pt-20">

      {/* Background Layer: Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image - High quality car/garage theme */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://manvillerecycling.com/wp-content/uploads/2021/01/How-scrap-metal-recycling-reduces-environmental-pollution-1080x675.jpg')"
          }}
        />

        {/* Light Overlay to ensure Black text pops */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>

        {/* Decorative Gradient Blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-orange-100/50 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">

            {/* Typing Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="min-h-[160px] lg:min-h-[200px] flex items-center lg:items-start"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight drop-shadow-sm">
                {text}
                <span className="animate-pulse text-orange-600">|</span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-800 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Get the best price for your old vehicle with our hassle-free, government-authorized scrapping service. Instant quotes, free pickup, and full documentation support.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/quote">
                <Button className="h-14 px-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold shadow-xl shadow-orange-900/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border-none">
                  Get Instant Quote <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="h-14 px-8 rounded-full border-2 border-gray-800 hover:border-orange-600 hover:text-orange-600 text-gray-900 text-lg font-bold bg-white/50 backdrop-blur-sm transition-all hover:bg-white">
                  How it Works
                </Button>
              </Link>
            </motion.div>

            {/* Exclusive Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-orange-600"></div>
                <p className="text-sm font-extrabold text-orange-700 uppercase tracking-widest bg-white/50 px-2 py-1 rounded">Exclusive Benefits</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { text: "Certificate of Deposit", icon: Banknote },
                  { text: "25% Road Tax Rebate", icon: Sparkles },
                  { text: "Registration Fee Waiver", icon: ShieldCheck },
                  { text: "Tax Deduction on EV", icon: Leaf }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-orange-100 hover:border-orange-500 hover:shadow-lg transition-all cursor-default group"
                  >
                    <div className="p-3 rounded-full bg-orange-100 group-hover:bg-orange-600 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm tracking-wide transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Visual (Static Image or Illustration) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative min-h-[500px] hidden lg:flex items-center justify-center p-10"
          >
            {/* 
                Since we removed the 3D model, we should put a nice hero image here 
                or just let the background shine.
                However, a floating car image usually looks good on landing pages.
                Let's use a nice static car cutout or illustration.
             */}
            <div className="relative z-10 w-full max-w-lg">
              <img
                src="/hero-process.png"
                alt="Vehicle Scrap Process"
                className="w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
