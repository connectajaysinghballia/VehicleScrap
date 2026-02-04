"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn } from "lucide-react"

export default function AuthGuard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [showModal, setShowModal] = useState(false)

    // Show modal only if unauthenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [status])

    // Don't render anything while checking session to avoid flash (optional)
    if (status === "loading") return null

    // If authenticated, render nothing (allow access)
    if (status === "authenticated") return null

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative border-t-4 border-orange-500 overflow-hidden"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -mr-10 -mt-10 z-0"></div>

                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <LogIn className="w-8 h-8 text-orange-600" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h3>
                            <p className="text-gray-600 mb-8">
                                Please login or sign up to access this feature and continue your request.
                            </p>

                            <button
                                onClick={() => router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
                            >
                                Login / Sign Up
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
