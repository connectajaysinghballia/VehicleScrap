"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Gift, DollarSign, Zap, Clock, Car, User, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { indiaData, states } from "@/lib/india-data"
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

    const benefits = [
        {
            icon: Gift,
            title: "Exclusive Discounts",
            description: "Get special pricing and offers for EcoScrap registered buyers",
        },
        {
            icon: DollarSign,
            title: "Flexible Financing",
            description: "Easy EMI and loan options available with quick approval",
        },
        {
            icon: Zap,
            title: "Quick Processing",
            description: "Fast vehicle delivery with complete documentation",
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Dedicated customer support for all your queries",
        },
    ]

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Benefits Section - Left Side */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
            >
                <div className="bg-[#0E192D] p-6 rounded-2xl border border-emerald-500/20 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-2">Our Benefits</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full mb-6"></div>

                    <div className="space-y-6">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="flex gap-5 items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-500/20 group-hover:bg-emerald-100 transition-colors duration-300 border border-emerald-500/30 group-hover:border-emerald-200">
                                                <IconComponent className="h-7 w-7 text-emerald-400 group-hover:text-emerald-600 transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#0E192D] transition-colors duration-300">{benefit.title}</h4>
                                            <p className="text-slate-300 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{benefit.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="bg-emerald-900/40 rounded-xl p-5 border border-emerald-500/30 mt-8 backdrop-blur-sm">
                        <p className="text-slate-200 text-sm leading-relaxed">
                            <span className="text-emerald-400 font-bold block mb-1 text-base">EcoScrap Guarantee 🛡️</span>
                            We ensure all vehicles are quality checked and come with verified documentation for your peace of mind.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Form Section - Right Side */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-emerald-100 backdrop-blur-xl relative"
            >
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mb-6">
                        <h3 className="text-lg font-bold text-[#0E192D] flex items-center gap-2 mb-4">
                            <Car className="w-5 h-5 text-emerald-600" />
                            Vehicle Preferences
                        </h3>

                        {/* Vehicle Preference */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Brand*</label>
                                <select
                                    name="vehicleBrand"
                                    value={formData.vehicleBrand}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {formData.vehicleBrand === "other" && (
                                <div>
                                    <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Enter Brand*</label>
                                    <input
                                        type="text"
                                        name="customBrand"
                                        value={formData.customBrand}
                                        onChange={handleChange}
                                        placeholder="Enter Brand Name"
                                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                        required={formData.vehicleBrand === "other"}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Model Type*</label>
                                <select
                                    name="vehicleModel"
                                    value={formData.vehicleModel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="MUV">MUV</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {formData.vehicleModel === "other" && (
                                <div>
                                    <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Enter Type*</label>
                                    <input
                                        type="text"
                                        name="customModel"
                                        value={formData.customModel}
                                        onChange={handleChange}
                                        placeholder="Enter Model Type"
                                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                        required={formData.vehicleModel === "other"}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Budget Range*</label>
                                <select
                                    name="budgetRange"
                                    value={formData.budgetRange}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                >
                                    <option value="">Select Budget</option>
                                    {budgets.map((budget) => (
                                        <option key={budget} value={budget}>{budget}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Fuel Type*</label>
                                <select
                                    name="fuelType"
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                >
                                    <option value="">Select Fuel</option>
                                    {fuelTypes.map((fuel) => (
                                        <option key={fuel} value={fuel}>{fuel}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                        <h3 className="text-lg font-bold text-[#0E192D] flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-blue-600" />
                            Contact Details
                        </h3>

                        {/* Customer Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Full Name*</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Email Address*</label>
                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Phone Number*</label>
                            <input
                                type="tel"
                                name="customerPhone"
                                value={formData.customerPhone}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                required
                            />
                        </div>

                        {/* Location Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">State*</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={(e) => {
                                        const newState = e.target.value;
                                        setFormData(prev => ({ ...prev, state: newState, city: "" }));
                                    }}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">City*</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={!formData.state}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select City</option>
                                    <option value="other">Other</option>
                                    {formData.state && indiaData[formData.state as string]?.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Custom City - Conditional */}
                        {formData.city === "other" && (
                            <div className="mt-4">
                                <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Enter City*</label>
                                <input
                                    type="text"
                                    name="customCity"
                                    value={formData.customCity}
                                    onChange={handleChange}
                                    placeholder="Type Your City Name"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                    required={formData.city === "other"}
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="text-xs font-bold text-[#0E192D]/70 mb-1.5 block uppercase tracking-wider">Pincode*</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="6-digit pincode"
                                maxLength={6}
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#0E192D] placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-sm"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0E192D] hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg relative overflow-hidden group"
                        whileHover={!loading ? { scale: 1.01 } : {}}
                        whileTap={!loading ? { scale: 0.99 } : {}}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                                className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-emerald-200 p-8 relative"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-center text-[#0E192D] mb-2">Request Submitted!</h2>
                                <div className="text-center mb-8">
                                    <p className="font-bold text-gray-900 text-lg mb-1">Our team will contact you soon</p>
                                    <p className="text-sm text-gray-500">Thank you for choosing us for your next vehicle purchase.</p>
                                </div>

                                <button
                                    onClick={() => {
                                        router.push("/")
                                        onClose()
                                    }}
                                    className="w-full bg-[#0E192D] hover:bg-emerald-600 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                                >
                                    Done
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    )
}

