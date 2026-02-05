"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, MapPin, Phone, Mail, User, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"
import { useToast } from "@/components/ui/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function PartnerRegistrationPage() {
    const { data: session, status } = useSession()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    // State for auth modal
    const [showAuthModal, setShowAuthModal] = useState(false)

    useEffect(() => {
        if (status === "unauthenticated") {
            setShowAuthModal(true)
        }
    }, [status])

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

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
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
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            </div>

            <AlertDialog open={showAuthModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            You must be logged in to register as a B2B partner. Please login or sign up to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => router.push("/login?callbackUrl=/partner-register")}
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            Go to Login Page
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link href="/login" className="flex items-center justify-center text-gray-500 hover:text-orange-600 mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Login
                </Link>
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100">
                        <Building2 className="w-10 h-10 text-orange-600" />
                    </div>
                </div>
                <h2 className="mt-8 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
                    Become a <span className="text-orange-600">Partner</span>
                </h2>
                <p className="mt-3 text-center text-lg text-gray-600 max-w-sm mx-auto">
                    Join India's fastest-growing network of certified scrap dealers.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
                <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-gray-200/50 sm:rounded-3xl sm:px-12 border border-white/50">

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
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
                                    <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Business / Owner Name</label>
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
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Detailed Address</label>
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
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="Shop No, Street, Landmark"
                                        />
                                    </div>
                                </div>

                                {/* Pincode & City */}
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="110001"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="New Delhi"
                                        />
                                    </div>
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                        placeholder="Delhi"
                                    />
                                </div>

                                {/* Contact & Email */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Contact Number</label>
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
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Email Address</label>
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
                                            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
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
                                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-6">
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">Submission Successful!</h3>
                                <p className="text-gray-500 mb-10 max-w-sm mx-auto text-lg">
                                    Thank you for your interest. Our team will verify your details and contact you within 24 hours.
                                </p>
                                <Link href="/">
                                    <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors">
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
