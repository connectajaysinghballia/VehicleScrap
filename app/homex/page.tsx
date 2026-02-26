"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Construction, Sparkles, Truck, Recycle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const slides = [
    {
        id: 1,
        title: "Homex is Coming Soon",
        subtitle: "The ultimate doorstep scrap collection experience.",
        image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=2000",
        icon: Construction,
    },
    {
        id: 2,
        title: "Hassle-Free & Convenient",
        subtitle: "Schedule a pickup from the comfort of your home.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000",
        icon: Truck,
    },
    {
        id: 3,
        title: "Eco-Friendly Recycling",
        subtitle: "Join us in our mission to make the world greener.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2000",
        icon: Recycle,
    }
]

export default function HomexPage() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 7000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0E192D]">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 w-full h-full"
                    initial={{ x: "100%", opacity: 0.8 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0.8 }}
                    transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.8
                    }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-black/60 z-10"></div>
                        <img
                            src={slides[currentSlide].image}
                            alt="Slide Background"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 text-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="space-y-6 max-w-3xl mx-auto"
                        >
                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-emerald-500/30">
                                {React.createElement(slides[currentSlide].icon, { className: "w-10 h-10 text-emerald-400" })}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-medium">
                                {slides[currentSlide].subtitle}
                            </p>

                            {currentSlide === 0 && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="pt-8"
                                >
                                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                                        <Sparkles className="w-5 h-5" />
                                        Launching Soon
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide ? "w-10 h-3 bg-emerald-500" : "w-3 h-3 bg-white/30 hover:bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
