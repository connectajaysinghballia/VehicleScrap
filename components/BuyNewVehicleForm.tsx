"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Gift, DollarSign, Zap, ArrowRight } from "lucide-react"
import AuthGuard from "./AuthGuard"

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
  })
  const [showSuccess, setShowSuccess] = useState(false)

  // Redirect to home after success message
  // React.useEffect(() => {
  //   if (showSuccess) {
  //     const timer = setTimeout(() => {
  //       router.push("/")
  //     }, 4000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [showSuccess, router])

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description: "Get special pricing for EcoScrap registered buyers",
    },
    {
      icon: DollarSign,
      title: "Financing Support",
      description: "Flexible payment options and loan assistance available",
    },
    {
      icon: Zap,
      title: "Quick Delivery",
      description: "Fast vehicle delivery with complete documentation",
    },
  ]

  const brands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Skoda", "BMW", "Mercedes", "Audi", "Volkswagen"]
  const models = ["Sedan", "SUV", "Hatchback", "MUV", "Coupe", "Convertible", "Wagon"]
  const budgetRanges = ["5-10 Lakhs", "10-15 Lakhs", "15-20 Lakhs", "20-25 Lakhs", "25-30 Lakhs", "30+ Lakhs"]
  const fuelTypes = ["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const brandValue = formData.vehicleBrand === "other" ? formData.customBrand : formData.vehicleBrand
    const modelValue = formData.vehicleModel === "other" ? formData.customModel : formData.vehicleModel

    const requiredFields = [
      brandValue,
      modelValue,
      formData.budgetRange,
      formData.fuelType,
      formData.customerName,
      formData.customerEmail,
      formData.customerPhone,
    ]

    if (requiredFields.every((field) => field !== "")) {
      console.log("Buy new vehicle form submitted:", formData)
      setShowSuccess(true)
    } else {
      alert("Please fill in all required fields.")
    }
  }

  return (
    <div className="p-8">
      <AuthGuard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Find Your Perfect Vehicle</h2>
        <p className="text-gray-600 text-lg">Fill in your preferences and our team will help you find the best match</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Brand */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Vehicle Brand*</label>
            <select
              name="vehicleBrand"
              value={formData.vehicleBrand}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          {/* Custom Brand - Conditional */}
          {formData.vehicleBrand === "other" && (
            <div>
              <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Enter Brand Name*</label>
              <input
                type="text"
                name="customBrand"
                value={formData.customBrand}
                onChange={handleChange}
                placeholder="e.g., Tesla"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                required={formData.vehicleBrand === "other"}
              />
            </div>
          )}

          {/* Vehicle Model */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Vehicle Model*</label>
            <select
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option value="">Select model</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          {/* Custom Model - Conditional */}
          {formData.vehicleModel === "other" && (
            <div>
              <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Enter Model Name*</label>
              <input
                type="text"
                name="customModel"
                value={formData.customModel}
                onChange={handleChange}
                placeholder="e.g., Model S"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                required={formData.vehicleModel === "other"}
              />
            </div>
          )}

          {/* Budget Range */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Budget Range*</label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option value="">Select budget</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Fuel Type*</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option value="">Select fuel type</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Full Name*</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Phone Number*</label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Email Address*</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="md:col-span-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-orange-500/25 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get Vehicle Consultation
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.form>

      {/* Success Modal */}
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
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Request Submitted!</h2>
              <p className="text-center text-gray-600 mb-8">
                We will connect you soon with the best options.
              </p>

              <button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                Back to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
