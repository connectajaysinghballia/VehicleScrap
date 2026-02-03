"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EKYCForm from "@/components/eKYCForm"
import { motion } from "framer-motion"

export default function EKYCPage() {
    const router = useRouter()
    const [formData, setFormData] = useState<any>(null)
    const [valuation, setValuation] = useState(0)

    useEffect(() => {
        // Retrieve data stored from ValuationModals
        const storedData = localStorage.getItem("kycFormData")
        const storedValuation = localStorage.getItem("kycValuation")

        try {
            if (storedData) {
                setFormData(JSON.parse(storedData))
            }
        } catch (error) {
            console.error("Failed to parse form data", error)
        }

        if (storedValuation) {
            setValuation(parseFloat(storedValuation))
        }
    }, [])

    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
            >
                <EKYCForm
                    formData={formData}
                    valuation={valuation}
                    onBack={() => router.back()}
                    isPage={true} // New prop to signal page mode styling
                />
            </motion.div>
        </div>
    )
}
