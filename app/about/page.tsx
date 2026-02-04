"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Target,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  Globe,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import FAQSection from "@/components/FAQSection"



export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const scrollToMore = () => {
    const element = document.getElementById("learn-more")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const stats = [
    { label: "Years Experience", value: "10+" },
    { label: "Happy Clients", value: "500+" },
    { label: "Projects Done", value: "1.2k+" },
    { label: "Team Members", value: "50+" },
  ]

  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize the scraping industry with transparent, efficient, and eco-friendly solutions.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description: "Becoming the global standard for sustainable vehicle recycling and material recovery.",
    },
    {
      icon: TrendingUp,
      title: "Our Growth",
      description: "Consistently expanding our network to serve more regions and businesses every year.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <motion.div
            style={{ opacity, scale }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-medium text-sm mb-8"
            >
              <Globe className="w-4 h-4" />
              <span>Global Leaders in Vehicle Scrapping</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8"
            >
              Driving the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Sustainable Recycling
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              We transform end-of-life vehicles into valuable resources, powering a greener tomorrow through innovation and integrity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={scrollToMore}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="learn-more" className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro/Story Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-200 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=2666&auto=format&fit=crop"
                alt="Team Meeting"
                className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Certified</div>
                    <div className="text-xs text-gray-500">Industry Standard</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Recognized for excellence in sustainable practices since 2014.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Pioneering the Modern <br />
                <span className="text-orange-500">Scrapping Ecosystem</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a simple yet ambitious goal: to clean up our cities while recovering valuable materials. What started as a small local operation has grown into a leader in the vehicle recycling industry.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe in a future where nothing goes to waste. Our advanced facilities and expert team ensure that every vehicle is processed with the highest environmental standards.
              </p>

              <ul className="space-y-4">
                {["Eco-friendly Processing", "Instant Fair Quotes", "Hassle-free Documentation", "Pan-India Network"].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values/Features */}
      <section className="py-24 bg-gray-900 text-white rounded-t-[3rem] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-orange-100/70 text-lg">Principles that drive our every action and decision.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl"
              >
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-orange-50 rounded-3xl p-12 md:p-20 text-center border border-orange-100"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Scrape Your Vehicle?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Get the best price for your old car today. Instant quote, free pickup, and full documentation support.</p>
            <button className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold rounded-full shadow-xl shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
              Check Price Now
            </button>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </div>
  )
}
