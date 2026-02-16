"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Lock } from "lucide-react"

export default function GrowWithUs() {
    const { data: session } = useSession()

    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[250px] border border-red-50">

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
                    <div className="w-full lg:w-[65%] p-6 md:p-8 flex flex-col justify-center bg-white relative group hover:bg-red-600 transition-colors duration-500 ease-in-out">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-red-600 font-bold uppercase tracking-wider text-sm mb-3 block group-hover:text-red-100 transition-colors">
                                Be Our Partner
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight group-hover:text-white transition-colors">
                                Grow <span className="text-red-600 group-hover:text-white transition-colors">With Us</span>
                            </h2>
                            <p className="text-gray-600 font-medium mb-8 group-hover:text-red-50 transition-colors">
                                Join our network of verified partners and expand your business with ScrapCenter India.
                            </p>

                            {session ? (
                                <Link
                                    href="/partner-register"
                                    className="inline-flex items-center gap-3 px-6 py-4 bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 hover:shadow-red-600/40 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-white/20 transition-all duration-300 w-full justify-center"
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
                                <p className="text-xs text-red-500 mt-3 text-center font-medium group-hover:text-red-200 transition-colors">
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
