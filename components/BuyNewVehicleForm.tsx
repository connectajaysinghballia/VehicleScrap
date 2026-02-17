"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { indiaData, states } from "@/lib/india-data"
import EKYCForm from "./eKYCForm"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface BuyNewVehicleFormProps {
    onClose: () => void
}

interface FormData {
    vehicleBrand: string
    customBrand: string
    vehicleModel: string
    customModel: string
    budgetRange: string
    fuelType: string
    customerName: string
    customerEmail: string
    customerPhone: string
    state: string
    city: string
    customCity: string
    pincode: string
}

export default function BuyNewVehicleForm({ onClose }: BuyNewVehicleFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        vehicleBrand: "",
        customBrand: "",
        vehicleModel: "",
        customModel: "",
        budgetRange: "",
        fuelType: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        state: "",
        city: "",
        customCity: "",
        pincode: "",
    })
    const [showSuccess, setShowSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const fuelTypes = ["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"]
    const brands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Skoda", "Nissan", "BMW", "Audi"]
    const budgets = ["Below 5 Lakhs", "5 - 10 Lakhs", "10 - 15 Lakhs", "15 - 25 Lakhs", "Above 25 Lakhs"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const requiredFields = [
            formData.vehicleBrand === "other" ? formData.customBrand : formData.vehicleBrand,
            formData.vehicleModel === "other" ? formData.customModel : formData.vehicleModel,
            formData.budgetRange,
            formData.fuelType,
            formData.customerName,
            formData.customerEmail,
            formData.customerPhone,
            formData.state,
            formData.city === "other" ? formData.customCity : formData.city,
            formData.pincode,
        ]

        if (requiredFields.every((field) => field && field.trim() !== "")) {
            setLoading(true)
            fetch("/api/buy-vehicle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (res.ok) {
                        setShowSuccess(true)
                    } else {
                        res.json().then(data => {
                            toast({
                                variant: "destructive",
                                title: "Submission Failed",
                                description: data.message || "Failed to submit request",
                            })
                        })
                    }
                })
                .catch((err) => {
                    console.error(err)
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Something went wrong. Please try again.",
                    })
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            toast({
                variant: "destructive",
                title: "Incomplete Form",
                description: "Please fill in all required fields.",
            })
        }
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Vehicle Preference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        name="vehicleBrand"
                        value={formData.vehicleBrand}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    >
                        <option value="">Interested in Brand*</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                        <option value="other">Other</option>
                    </select>
                    {formData.vehicleBrand === "other" && (
                        <input
                            type="text"
                            name="customBrand"
                            value={formData.customBrand}
                            onChange={handleChange}
                            placeholder="Enter Brand Name*"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                            required={formData.vehicleBrand === "other"}
                        />
                    )}

                    <select
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    >
                        <option value="">Preferred Model Type*</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="MUV">MUV</option>
                        <option value="other">Other</option>
                    </select>
                    {formData.vehicleModel === "other" && (
                        <input
                            type="text"
                            name="customModel"
                            value={formData.customModel}
                            onChange={handleChange}
                            placeholder="Enter Model Name*"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                            required={formData.vehicleModel === "other"}
                        />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    >
                        <option value="">Budget Range*</option>
                        {budgets.map((budget) => (
                            <option key={budget} value={budget}>{budget}</option>
                        ))}
                    </select>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    >
                        <option value="">Preferred Fuel Type*</option>
                        {fuelTypes.map((fuel) => (
                            <option key={fuel} value={fuel}>{fuel}</option>
                        ))}
                    </select>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Full Name*"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    />
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        placeholder="Email Address*"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    />
                </div>

                <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Phone Number*"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    required
                />

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        name="state"
                        value={formData.state}
                        onChange={(e) => {
                            const newState = e.target.value;
                            setFormData(prev => ({ ...prev, state: newState, city: "" }));
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required
                    >
                        <option value="">Select State*</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <div className="relative">
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!formData.state}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all disabled:opacity-50"
                            required
                        >
                            <option value="">Select City*</option>
                            <option value="other">Other</option>
                            {formData.state && indiaData[formData.state as string]?.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Custom City - Conditional */}
                {formData.city === "other" && (
                    <input
                        type="text"
                        name="customCity"
                        value={formData.customCity}
                        onChange={handleChange}
                        placeholder="Type Your City Name*"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        required={formData.city === "other"}
                    />
                )}

                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode*"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    required
                />

                <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {loading ? "Processing..." : "Check Best Deals"}
                </motion.button>
            </form>

            {/* Success View */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-orange-200 p-8 relative"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Request Submitted!</h2>
                            <div className="text-center mb-8">
                                <p className="font-bold text-gray-900 text-lg mb-1">Our team will contact you soon</p>
                                <p className="text-sm text-gray-500">Thank you for choosing us for your next vehicle purchase.</p>
                            </div>

                            <button
                                onClick={() => {
                                    router.push("/")
                                    onClose()
                                }}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
