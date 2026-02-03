"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Zap, TrendingUp } from "lucide-react"

interface ExchangeVehicleFormProps {
  onClose: () => void
}

interface FormData {
  oldVehicleRegistration: string
  oldVehicleBrand: string
  oldVehicleModel: string
  oldVehicleYear: string
  oldVehicleFuelType: string
  newVehicleBrand: string
  newVehicleModel: string
  customerName: string
  customerPhone: string
}

export default function ExchangeVehicleForm({ onClose }: ExchangeVehicleFormProps) {
  const [formData, setFormData] = useState<FormData>({
    oldVehicleRegistration: "",
    oldVehicleBrand: "",
    oldVehicleModel: "",
    oldVehicleYear: "",
    oldVehicleFuelType: "",
    newVehicleBrand: "",
    newVehicleModel: "",
    customerName: "",
    customerPhone: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const benefits = [
    {
      icon: Zap,
      title: "Instant Valuation",
      description: "Get immediate evaluation of your old vehicle",
    },
    {
      icon: TrendingUp,
      title: "Best Exchange Value",
      description: "Maximize your exchange benefits on new purchase",
    },
    {
      icon: CheckCircle,
      title: "Hassle-Free Process",
      description: "Complete documentation handled by our team",
    },
  ]

  const fuelTypes = ["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"]
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
  const oldBrands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Skoda", "Nissan"]
  const newBrands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Skoda", "BMW", "Mercedes", "Audi"]
  const models = ["Sedan", "SUV", "Hatchback", "MUV", "Coupe", "Convertible", "Wagon"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const requiredFields = [
      formData.oldVehicleRegistration,
      formData.oldVehicleBrand,
      formData.oldVehicleModel,
      formData.oldVehicleYear,
      formData.oldVehicleFuelType,
      formData.newVehicleBrand,
      formData.customerName,
      formData.customerPhone,
    ]

    if (requiredFields.every((field) => field !== "")) {
      console.log("Exchange form submitted:", formData)
      setShowSuccess(true)
    } else {
      alert("Please fill in all required fields.")
    }
  }


  return (
    <div className="p-8">
      {/* Form Only - Benefits removed as they are in parent */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Exchange Quote</h2>
        </div>

        {/* Old Vehicle Section */}
        <div className="space-y-3">
          <h4 className="text-gray-900 font-bold text-lg">Old Vehicle Details</h4>
          <div className="space-y-3">
            <input
              type="text"
              name="oldVehicleRegistration"
              placeholder="Registration Number*"
              value={formData.oldVehicleRegistration}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            />
            <select
              name="oldVehicleBrand"
              value={formData.oldVehicleBrand}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            >
              <option value="">Select Brand*</option>
              {oldBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              name="oldVehicleModel"
              value={formData.oldVehicleModel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            >
              <option value="">Select Model*</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="oldVehicleYear"
                value={formData.oldVehicleYear}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              >
                <option value="">Year*</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                name="oldVehicleFuelType"
                value={formData.oldVehicleFuelType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              >
                <option value="">Fuel*</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* New Vehicle Section */}
        <div className="space-y-3">
          <h4 className="text-gray-900 font-bold text-lg">New Vehicle Preference</h4>
          <div className="space-y-3">
            <select
              name="newVehicleBrand"
              value={formData.newVehicleBrand}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            >
              <option value="">Select Preferred Brand*</option>
              {newBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              name="newVehicleModel"
              value={formData.newVehicleModel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            >
              <option value="">Select Preferred Model</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-3">
          <h4 className="text-gray-900 font-bold text-lg">Your Contact Info</h4>
          <div className="space-y-3">
            <input
              type="text"
              name="customerName"
              placeholder="Full Name*"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            />
            <input
              type="tel"
              name="customerPhone"
              placeholder="Phone Number*"
              value={formData.customerPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-orange-500/25 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Check Exchange Value
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
                We will connect you soon with the best exchange offer.
              </p>

              <button
                onClick={() => window.location.href = "/"}
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
