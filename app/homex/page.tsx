"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Construction, Sparkles, Truck, Recycle, Home } from "lucide-react"
import Link from "next/link"

const slides = [
    {
        id: 1,
        title: "Homex is Coming Soon",
        titleHighlight: "Coming Soon",
        subtitle: "The ultimate doorstep scrap collection experience.",
        image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=2000",
        icon: Construction,
        color: "from-emerald-500 to-teal-400"
    },
    {
        id: 2,
        title: "Hassle-Free & Convenient",
        titleHighlight: "Convenient",
        subtitle: "Schedule a pickup from the comfort of your home.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000",
        icon: Truck,
        color: "from-blue-500 to-indigo-400"
    },
    {
        id: 3,
        title: "Eco-Friendly Recycling",
        titleHighlight: "Recycling",
        subtitle: "Join us in our mission to make the world greener.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2000",
        icon: Recycle,
        color: "from-purple-500 to-fuchsia-400"
    }
]

export default function HomexPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)

        return () => clearInterval(timer)
    }, [isHovered])

    const textVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0A0F1C] font-sans selection:bg-emerald-500/30">
            {/* Navbar spacer or floating nav link back home */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white transition-colors cursor-pointer"
                    >
                        <Home className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </motion.div>
                </Link>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 w-full h-full"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    {/* Background Image with animated gradient overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/70 to-transparent z-10 transition-all duration-1000"></div>
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                        <img
                            src={slides[currentSlide].image}
                            alt="Slide Background"
                            className="w-full h-full object-cover transition-all duration-1000"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content Layer */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 text-center pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="space-y-8 max-w-5xl mx-auto flex flex-col items-center pointer-events-auto"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className={`w-28 h-28 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center bg-gradient-to-br ${slides[currentSlide].color} bg-opacity-20 relative overflow-hidden group`}
                        >
                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                            {React.createElement(slides[currentSlide].icon, { className: "w-12 h-12 text-white relative z-10 drop-shadow-md" })}
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                                variants={textVariants}
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg"
                            >
                                {slides[currentSlide].title.replace(slides[currentSlide].titleHighlight, '')}
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].color} filter drop-shadow-sm`}>
                                    {slides[currentSlide].titleHighlight}
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium max-w-3xl mx-auto drop-shadow-md"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>
                        </div>

                        {currentSlide === 0 && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="pt-8"
                            >
                                <div className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-emerald-500 rounded-full hover:bg-emerald-400 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-5px_rgba(16,185,129,0.7)] hover:-translate-y-1 overflow-hidden cursor-pointer">
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
                                    <span className="tracking-wide">Notify Me On Launch</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 left-0 w-full z-30 flex justify-center gap-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentSlide(index)
                            setIsHovered(false)
                        }}
                        className={`group relative h-2 transition-all duration-500 rounded-full overflow-hidden ${index === currentSlide ? "w-24 bg-white/20" : "w-10 bg-white/10 hover:bg-white/30"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {index === currentSlide && (
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color}`}
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 6, ease: "linear" }}
                                key={currentSlide} // Resets animation when slide changes
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Statistics Section */}
            <div className="absolute bottom-4 left-0 w-full z-30 px-6 hidden sm:block">
                <div className="max-w-4xl mx-auto flex items-center justify-between text-white/60">
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white">10+</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Years Experience</span>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white">500+</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Happy Clients</span>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white">1.2k+</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Projects Done</span>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white">50+</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Team Members</span>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    )
}
