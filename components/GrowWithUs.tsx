"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Lock } from "lucide-react"

type GrowWithUsProps = {
    variant?: "red" | "green"
}

export default function GrowWithUs({ variant = "red" }: GrowWithUsProps) {
    const { data: session } = useSession()

    const styles = {
        red: {
            border: "border-red-50",
            hoverBg: "hover:bg-red-600",
            accentText: "text-red-600",
            hoverAccent: "group-hover:text-red-100",
            heading: "text-gray-900",
            headingHover: "group-hover:text-white",
            spanText: "text-red-600",
            desc: "text-gray-600",
            descHover: "group-hover:text-red-50",
            btnBg: "bg-red-600",
            btnShadow: "shadow-red-600/30",
            btnHover: "hover:bg-red-700",
            btnHoverShadow: "hover:shadow-red-600/40",
            btnGroupHoverBg: "group-hover:bg-white",
            btnGroupHoverText: "group-hover:text-red-600",
            btnGroupHoverShadow: "group-hover:shadow-white/20",
            lockedText: "text-red-500",
            lockedHover: "group-hover:text-red-200"
        },
        green: {
            border: "border-emerald-100",
            hoverBg: "hover:bg-[#0a192f]",
            accentText: "text-emerald-600",
            hoverAccent: "group-hover:text-emerald-400",
            heading: "text-[#0a192f]",
            headingHover: "group-hover:text-white",
            spanText: "text-emerald-600",
            desc: "text-slate-600",
            descHover: "group-hover:text-slate-300",
            btnBg: "bg-[#0a192f]",
            btnShadow: "shadow-emerald-900/20",
            btnHover: "hover:bg-emerald-800",
            btnHoverShadow: "hover:shadow-emerald-900/30",
            btnGroupHoverBg: "group-hover:bg-emerald-500",
            btnGroupHoverText: "group-hover:text-white",
            btnGroupHoverShadow: "group-hover:shadow-emerald-500/30",
            lockedText: "text-emerald-600",
            lockedHover: "group-hover:text-emerald-300"
        }
    }

    const s = styles[variant]
    // bg-white for green variant (or both) as requested
    const sectionBg = variant === "green" ? "bg-white" : "bg-white"

    return (
        <section className={`py-8 ${sectionBg}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className={`bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[250px] border ${s.border}`}>

                    {/* Left Side: Image (35%) */}
                    <div className="relative w-full lg:w-[35%] h-[180px] lg:h-auto min-h-[200px]">
                        <Image
                            src="/frontpage/b2b2.png"
                            alt="Grow With Us"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/90 lg:to-white/10" />
                    </div>

                    {/* Right Side: Content (65%) */}
                    <div className={`w-full lg:w-[65%] p-6 md:p-8 flex flex-col justify-center bg-white relative group ${s.hoverBg} transition-colors duration-500 ease-in-out`}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={`${s.accentText} font-bold uppercase tracking-wider text-sm mb-3 block ${s.hoverAccent} transition-colors`}>
                                Be Our Partner
                            </span>
                            <h2 className={`text-3xl md:text-4xl font-black ${s.heading} mb-6 leading-tight ${s.headingHover} transition-colors`}>
                                Grow <span className={`${s.spanText} ${s.headingHover} transition-colors`}>With Us</span>
                            </h2>
                            <p className={`${s.desc} font-medium mb-8 ${s.descHover} transition-colors`}>
                                Join our network of verified partners and expand your business with ScrapCenter India.
                            </p>

                            {session ? (
                                <Link
                                    href="/partner-register"
                                    className={`inline-flex items-center gap-3 px-6 py-4 ${s.btnBg} text-white rounded-full font-bold shadow-lg ${s.btnShadow} ${s.btnHover} ${s.btnHoverShadow} ${s.btnGroupHoverBg} ${s.btnGroupHoverText} ${s.btnGroupHoverShadow} transition-all duration-300 w-full justify-center`}
                                >
                                    <span>Apply For Partner</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-400 rounded-full font-bold shadow-inner cursor-not-allowed hover:bg-gray-200 group-hover:bg-white/10 group-hover:text-white/50 transition-all duration-300 w-full justify-center"
                                >
                                    <Lock className="w-5 h-5" />
                                    <span>Login to Apply</span>
                                </Link>
                            )}

                            {!session && (
                                <p className={`text-xs ${s.lockedText} mt-3 text-center font-medium ${s.lockedHover} transition-colors`}>
                                    * Please login to access partner registration
                                </p>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
