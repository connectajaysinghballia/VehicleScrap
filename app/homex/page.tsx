"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
    {
        id: 1,
        image: "/frontpage/selloldvehicalx.jpg",
        title: "Sell Your Old Vehicle",
        subtitle: "Get the best price for your scrap or old car instantly.",
        cta: "Sell Now",
        link: "/services/sell-vehicle"
    },
    {
        id: 2,
        image: "/frontpage/exchangevehiclex.webp",
        title: "Exchange Your Vehicle",
        subtitle: "Upgrade to a new ride with our hassle-free exchange offers.",
        cta: "Exchange Now",
        link: "/services/exchange-vehicle"
    },
    {
        id: 3,
        image: "/frontpage/buynewx.webp",
        title: "Buy New Vehicle",
        subtitle: "Explore our wide range of certified vehicles at great prices.",
        cta: "Explore Cars",
        link: "/services/buy-vehicle"
    }
]

export default function HomexPage() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [current])

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Slider Section - Flex Grow to take available space minus the strip */}
            <div className="relative flex-grow overflow-hidden bg-black group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        {/* Background Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src={slides[current].image}
                                alt={slides[current].title}
                                fill
                                className="object-fill"
                                priority
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-6 md:px-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="max-w-2xl text-white"
                                >
                                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                                        {slides[current].title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
                                        {slides[current].subtitle}
                                    </p>
                                    <Link href={slides[current].link}>
                                        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1">
                                            {slides[current].cta}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all z-20 border border-white/10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all z-20 border border-white/10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? "bg-red-600 w-8" : "bg-white/50 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom White Strip with 4 Images */}
            <div className="w-full h-32 bg-white border-t border-gray-100 flex items-center justify-center z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-4 gap-8 items-center justify-items-center">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="relative w-full h-24 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer">
                                <Image
                                    src="/logo.png" // Placeholder - Replace with actual partner logos
                                    alt={`Partner ${item}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
