"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronRight, Target, Eye, Users, Award, Lightbulb, Heart } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")

  const missionData = {
    title: "Our Mission",
    description:
      "Riveyra Infotech is a web development company aims at providing the best services regarding the website and software development. We provide comprehensive and integrated IT services that includes software development, Website design and development, Mobile application development, Mobile website development, Search Engine Optimization, Online marketing, Graphics Design as well as development and implementation of high quality business domain applications. Our goal is to provide high quality and cost effective services to the internet and IT outsourcing community and business who wish to maximize their reach by harnessing the unlimited power of information technology.",
    statementTitle: "Mission Statement",
    points: [
      "Be compassionate and transparent with our clients.",
      "Understanding and interpreting the requirements and desires of various business disciplines.",
      "To provide customizable web development, software development, and a variety of other services at a cutting-edge pricing while paving the road for socially responsible enterprises.",
      "To provide our clients with the most compelling and creative solutions possible.",
      "Creating and promoting brands via the use of Social Media Strategies.",
    ],
    image: "images/aboutus/mission.jpg",
  }

  const visionData = {
    title: "Our Vision",
    description:
      "Riveyra Infotech is a web development company aims at providing the best services regarding the website and software development. We provide comprehensive and integrated IT services that includes software development, Website design and development, Mobile application development, Mobile website development, Search Engine Optimization, Online marketing, Graphics Design as well as development and implementation of high quality business domain applications. Our goal is to provide high quality and cost effective services to the internet and IT outsourcing community and business who wish to maximize their reach by harnessing the unlimited power of information technology.",
    statementTitle: "Vision Statement",
    points: [
      "To deliver creative solutions that continually break new ground.",
      "Emphasizing on timely project delivery under reasonable quotes.",
      "To achieve client satisfaction, we guarantee high-quality work, bidirectional communication, and prompt customer service.",
      "To reach out to our clients and assist them in growing their online businesses.",
    ],
    image: "images/aboutus/vision.jpg",
  }

  const currentData = activeTab === "mission" ? missionData : visionData

  const companyValues = [
    { icon: Target, title: "Innovation", description: "Cutting-edge solutions" },
    { icon: Users, title: "Teamwork", description: "Collaborative approach" },
    { icon: Award, title: "Excellence", description: "Quality delivery" },
    { icon: Heart, title: "Integrity", description: "Transparent practices" },
    { icon: Lightbulb, title: "Creativity", description: "Unique solutions" },
    { icon: Eye, title: "Vision", description: "Future-focused" },
  ]

  useEffect(() => {
    // Hero section animations
    gsap.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" })

    gsap.fromTo(
      ".hero-breadcrumb",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power2.out" },
    )

    // Company description animation
    gsap.fromTo(
      ".company-description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power2.out" },
    )

    // Values grid animation
    gsap.fromTo(
      ".value-card",
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1,
        ease: "back.out(1.7)",
      },
    )

    // Tab buttons animation
    gsap.fromTo(
      ".tab-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.2, stagger: 0.1, ease: "power2.out" },
    )

    // Floating animation for hero image
    gsap.to(".hero-image", {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            className="hero-breadcrumb flex items-center space-x-2 text-gray-400 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="hover:text-green-400 transition-colors cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-400">About Company</span>
          </motion.div>

          {/* Hero Title */}
          <motion.div
            className="hero-title text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover the Future of{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                IT Solutions
              </span>{" "}
              with Riveyra Infotech.
            </h1>
          </motion.div>

          {/* Company Description */}
          <motion.div
            className="company-description max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20">
              <h2 className="text-3xl font-bold text-green-400 mb-6">About Company</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Riveyra Infotech is a software development company that has been successfully present on the software
                development market for over 4 years and since that time has grown to become a well-regarded player in
                this industry and has proven to be a reliable, efficient and trustworthy service provider to the
                businesses from all over the World. The company has established recognizing the potential of the
                increasing market of the companies, that are or would be looking to make their business processes more
                efficient by automating them through the use of advanced software solutions and/or to act in response to
                the current market forces that dictate the necessity of online presence in order to stay abreast with
                competition.
              </p>
            </div>
          </motion.div>

          {/* Company Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="value-card bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-xl p-6 border border-green-500/20 text-center hover:border-green-400/40 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision Toggle Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-full p-2 border border-green-500/20">
              <button
                className={`tab-button px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "mission"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg shadow-green-500/25"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setActiveTab("mission")}
              >
                Our Mission
              </button>
              <button
                className={`tab-button px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "vision"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg shadow-green-500/25"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setActiveTab("vision")}
              >
                Our Vision
              </button>
            </div>
          </div>

          {/* Content Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-lg rounded-3xl border border-green-500/20 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-12 lg:p-16">
                  <h2 className="text-4xl font-bold text-green-400 mb-8">{currentData.title}</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-12">{currentData.description}</p>

                  <h3 className="text-2xl font-bold text-green-400 mb-8">{currentData.statementTitle}</h3>
                  <div className="space-y-4">
                    {currentData.points.map((point, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-300 leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative p-8 lg:p-12 flex items-center justify-center">
                  <motion.div
                    className="hero-image relative"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <img
                      src={currentData.image || "/placeholder.svg"}
                      alt={currentData.title}
                      className="w-full h-auto rounded-2xl shadow-2xl shadow-green-500/20"
                    />

                    {/* Floating decorative elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-60"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-40"
                      animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

     
    </div>
  )
}
