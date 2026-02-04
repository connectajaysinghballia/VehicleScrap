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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
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
                        >
                            Go to Login Page
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/login" className="flex items-center justify-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Link>
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Become a Partner
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join our network of certified scrap dealers.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200 sm:rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden">

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-5"
                                onSubmit={handleSubmit}
                            >
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Business / Owner Name</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Detailed Address</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            name="address"
                                            required
                                            rows={2}
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                            placeholder="Shop No, Street, Landmark"
                                        />
                                    </div>
                                </div>

                                {/* Pincode & City */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="110001"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="New Delhi"
                                        />
                                    </div>
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Delhi"
                                    />
                                </div>

                                {/* Contact & Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            required
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                            placeholder="+91 80090 60158"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                            placeholder="partner@business.com"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98]"
                                    >
                                        {isLoading ? "Submitting..." : "Submit Registration"}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                                    <CheckCircle className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Details Submitted!</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                    Thank you for your interest. Our team will verify your details and contact you soon.
                                </p>
                                <Link href="/">
                                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors">
                                        Back to Home <ArrowRight className="ml-2 h-4 w-4" />
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
