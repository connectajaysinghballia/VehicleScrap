"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, MapPin, Phone, Mail, User, CheckCircle, ArrowRight, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"
import { useToast } from "@/components/ui/use-toast"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function PartnerRegistrationPage() {
    const { data: session, status } = useSession()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    // Hard redirect to B2B login if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login?tab=b2b")
        }
    }, [status, router])

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        contactNumber: "",
        email: ""
    })

    const [existingApplication, setExistingApplication] = useState<any>(null)
    const [isCheckingStatus, setIsCheckingStatus] = useState(true)

    useEffect(() => {
        const checkStatus = async () => {
            if (session?.user) {
                try {
                    const res = await fetch(`/api/b2b-register?userId=${(session.user as any).id}&email=${session.user?.email}`)
                    const data = await res.json()
                    if (data.data) {
                        setExistingApplication(data.data)
                    }
                } catch (error) {
                    console.error("Error fetching status:", error)
                } finally {
                    setIsCheckingStatus(false)
                }
            } else {
                setIsCheckingStatus(false)
            }
        }

        if (status === "authenticated") {
            checkStatus()
        } else if (status === "unauthenticated") {
            setIsCheckingStatus(false)
        }
    }, [session, status])

    if (status === "loading" || status === "unauthenticated") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
                <p className="text-slate-400 font-medium">
                    {status === "loading" ? "Checking authentication..." : "Redirecting to B2B Login..."}
                </p>
            </div>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch("/api/b2b-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userId: session?.user ? (session.user as any).id : undefined
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            setIsLoading(false)
            setIsSubmitted(true)
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            })
        } catch (error: any) {
            setIsLoading(false)
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-900/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-900/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            </div>


            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link href="/login" className="flex items-center justify-center text-gray-400 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Login
                </Link>
                {!existingApplication && (
                    <>
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-[#0E192D] rounded-2xl shadow-xl flex items-center justify-center border border-slate-800">
                                <Building2 className="w-10 h-10 text-orange-500" />
                            </div>
                        </div>
                        <h2 className="mt-8 text-center text-4xl font-extrabold text-white tracking-tight">
                            Become a <span className="text-orange-600">Partner</span>
                        </h2>
                        <p className="mt-3 text-center text-lg text-gray-400 max-w-sm mx-auto">
                            Join India's fastest-growing network of certified scrap dealers.
                        </p>
                    </>
                )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
                <div className="bg-[#0E192D] py-10 px-6 shadow-2xl shadow-black/20 sm:rounded-3xl sm:px-12 border border-slate-800">

                    <AnimatePresence mode="wait">
                        {isCheckingStatus ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600"></div>
                            </div>
                        ) : existingApplication ? (
                            <motion.div
                                key="status"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                {existingApplication.status === "approved" ? (
                                    <>
                                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-900/20 mb-6">
                                            <CheckCircle className="h-12 w-12 text-green-400" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Congratulations!</h3>
                                        <p className="text-gray-400 mb-8 max-w-lg mx-auto text-lg">
                                            We have approved you as our partner. You can now login to your B2B account properly.
                                        </p>

                                        <div className="bg-slate-900 rounded-xl p-6 mb-8 max-w-md mx-auto border border-slate-800 text-left">
                                            <h4 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Your Credentials</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">User ID</p>
                                                    <p className="font-mono text-lg font-bold text-white break-all">{existingApplication.userId}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Password</p>
                                                    <p className="font-mono text-lg font-bold text-white">{existingApplication.password || "Use your email password"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                signOut({ callbackUrl: "/login" })
                                            }}
                                            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                                        >
                                            Log Out & Login as Partner
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-900/20 mb-6">
                                            <CheckCircle className="h-10 w-10 text-yellow-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Application Under Review</h3>
                                        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                                            Your application for <span className="font-semibold text-white">{existingApplication.name}</span> was submitted on {new Date(existingApplication.createdAt).toLocaleDateString()}. Our team is reviewing your details.
                                        </p>
                                        <Link href="/">
                                            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-orange-400 bg-orange-900/30 hover:bg-orange-900/50 transition-colors">
                                                Back to Home <ArrowRight className="ml-2 h-5 w-5" />
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </motion.div>
                        ) : !isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                                onSubmit={handleSubmit}
                            >
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">Business / Owner Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">Detailed Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 pt-4 pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        </div>
                                        <textarea
                                            name="address"
                                            required
                                            rows={2}
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="Shop No, Street, Landmark"
                                        />
                                    </div>
                                </div>

                                {/* Pincode & City */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="110001"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="New Delhi"
                                        />
                                    </div>
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                        placeholder="Delhi"
                                    />
                                </div>

                                {/* Contact & Email */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">Contact Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            required
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-300 ml-1 mb-2">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="partner@business.com"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-xl shadow-orange-500/20 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all active:scale-[0.98]"
                                    >
                                        {isLoading ? "Submitting..." : "Submit Application"}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-900/20 mb-6">
                                    <CheckCircle className="h-12 w-12 text-green-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Submission Successful!</h3>
                                <p className="text-gray-400 mb-10 max-w-sm mx-auto text-lg">
                                    Thank you for your interest. Our team will verify your details and contact you within 24 hours.
                                </p>
                                <Link href="/">
                                    <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-orange-400 bg-orange-900/30 hover:bg-orange-900/50 transition-colors">
                                        Back to Home <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

