"use client"

import { motion } from "framer-motion"
import { Car, Truck, Bike, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ValuationCTA() {
    // Generate random positions and delays for the falling background icons
    const icons = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        icon: [Car, Truck, Bike][i % 3], // Cycle through icons
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10, // Slower duration: 10-20s
        size: 40 + Math.random() * 40, // Larger size: 40-80px
    }))

    return (
        <section className="py-8 px-4 bg-[#FFFDF5] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} // Animation only plays once
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // smooth graceful entrance
                className="relative max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl transform-gpu"
                style={{ backgroundColor: "#E31837" }} // Mahindra Red
            >
                {/* Animated Background: Falling Vehicles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {icons.map((item) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 600, opacity: [0, 0.3, 0.3, 0] }} // Fade in, down, fade out
                                transition={{
                                    repeat: Infinity,
                                    duration: item.duration,
                                    delay: item.delay,
                                    ease: "linear",
                                }}
                                style={{ left: item.left }}
                                className="absolute top-0 text-white/20"
                            >
                                <Icon size={item.size} />
                            </motion.div>
                        )
                    })}
                </div>

                {/* Content */}
                <div className="relative z-10 px-8 py-8 md:px-16 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm"
                        >
                            Free Service
                        </motion.span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight leading-none">
                            Get <span className="text-yellow-300">Free</span> Valuation <br /> <span className="text-white/80">Of Your Car</span>
                        </h2>
                        <p className="text-white/90 text-lg font-medium max-w-md mx-auto md:mx-0">
                            Instantly check the current market scrap value of your vehicle with our AI-powered tool.
                        </p>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/services/sell-vehicle" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#E31837] rounded-full text-xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all">
                            <span>Check For Free</span>
                            <span className="bg-[#E31837]/10 p-1 rounded-full group-hover:bg-[#E31837] group-hover:text-white transition-colors duration-300">
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
