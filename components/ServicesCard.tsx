"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface ServicesCardProps {
    title: string
    description: string
    image: string
    onClick: () => void
    delay?: number
}

const ServicesCard: React.FC<ServicesCardProps> = ({ title, description, image, onClick, delay = 0 }) => {
    return (
        <motion.div
            initial={{ rotateY: 90, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 30, damping: 15, mass: 1.2 }}
            className="group perspective-1000 w-full perspective-origin-center"
            onClick={onClick}
        >
            <div className="relative w-full h-[400px] bg-white rounded-[30px] border border-red-50/50 shadow-[10px_10px_30px_#e0e0e0,-10px_-10px_30px_#ffffff] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)] hover:-translate-y-2 hover:cursor-pointer overflow-hidden flex flex-col group-hover:border-red-100">

                {/* Image Section */}
                <div className="relative w-full h-[55%] rounded-t-[30px] overflow-hidden bg-gray-100">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                    {/* Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full border border-red-100 shadow-sm">
                        <span className="text-xs font-bold text-red-600 tracking-wide uppercase">Core Service</span>
                    </div>
                </div>

                {/* Text Section */}
                <div className="p-6 flex flex-col justify-between h-[45%] bg-white relative">
                    {/* Decorative background circle */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-50 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 font-sans mb-2 group-hover:text-red-700 transition-colors duration-300 line-clamp-1">{title}</h3>
                        <p className="text-sm text-gray-500 font-sans leading-relaxed line-clamp-2">{description}</p>
                    </div>

                    {/* Action Area */}
                    <div className="relative z-10 mt-auto flex items-center justify-between pt-4 border-t border-gray-50 group-hover:border-red-100 transition-colors duration-300">
                        <span className="text-sm font-semibold text-gray-400 group-hover:text-red-600 transition-colors duration-300 font-sans uppercase tracking-wider text-xs">Explore Now</span>
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:rotate-[-45deg]">
                            <ArrowRight className="w-4 h-4 text-red-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ServicesCard
