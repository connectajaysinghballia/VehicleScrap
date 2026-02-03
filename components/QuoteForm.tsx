"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Bike, Truck, MessageCircle, CheckCircle, Phone, MapPin, FileText, User, Zap, Sparkles } from "lucide-react"
import ValuationModals from "./ValuationModals"

const vehicleData = {
  Car: ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Skoda"],
  Bike: ["Hero", "Honda", "Bajaj", "TVS", "Harley Davidson", "Royal Enfield", "Ducati"],
  Truck: ["Tata", "Ashok Leyland", "Volvo", "Mahindra", "Bharat Benz"],
  Other: ["Auto", "Bus", "Tempo"],
}

const models = {
  Car: ["Sedan", "SUV", "Hatchback", "MUV", "Coupe"],
  Bike: ["Cruiser", "Sport Bike", "Touring", "Standard", "Scooter"],
  Truck: ["Cargo", "Dumper", "Flatbed", "Tanker"],
  Other: ["3-wheeler", "Mini Bus", "School Bus"],
}

const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)

const benefits = [
  {
    icon: Zap,
    title: "Accurate and Up-to-Date Data",
    description: "Get precise valuations based on real-time market data and comprehensive vehicle history",
  },
  {
    icon: CheckCircle,
    title: "Instant Valuation",
    description: "Receive an instant valuation of your vehicle in seconds with our AI-powered assessment",
  },
  {
    icon: Sparkles,
    title: "Expert Guidance",
    description: "Get expert recommendations to help you understand your car's market value better",
  },
]

interface FormData {
  vehicleType: string
  brand: string
  customBrand: string
  model: string
  customModel: string
  year: string
  vehicleNumber: string
  vehicleWeight: string
  name: string
  phone: string
  pincode: string
  agreeTC: boolean
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    vehicleType: "",
    brand: "",
    customBrand: "",
    model: "",
    customModel: "",
    year: "",
    vehicleNumber: "",
    vehicleWeight: "",
    name: "",
    phone: "",
    pincode: "",
    agreeTC: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showValuation, setShowValuation] = useState(false)
  const [valuationId, setValuationId] = useState<string | null>(null)

  const handleVehicleType = (type: string) => {
    setFormData({
      ...formData,
      vehicleType: type,
      brand: "",
      customBrand: "",
      model: "",
      customModel: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation check
    const brandToUse = formData.brand || formData.customBrand
    const modelToUse = formData.model || formData.customModel

    if (!formData.vehicleType || !brandToUse || !modelToUse || !formData.year || !formData.vehicleNumber || !formData.vehicleWeight || !formData.name || !formData.phone || !formData.pincode || !formData.agreeTC) {
      alert("Please fill in all required fields and agree to the terms.")
      return
    }

    try {
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleType: formData.vehicleType,
          brand: brandToUse,
          model: modelToUse,
          year: formData.year,
          vehicleNumber: formData.vehicleNumber,
          vehicleWeight: formData.vehicleWeight,
          address: {
            pincode: formData.pincode,
          },
          contact: {
            name: formData.name,
            phone: formData.phone,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setValuationId(data.id)
        setShowValuation(true)
      } else {
        const data = await response.json()
        alert(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to submit request. Please try again.")
    }
  }

  const vehicleOptions = [
    { icon: Car, label: "Car", value: "Car" },
    { icon: Bike, label: "Bike", value: "Bike" },
    { icon: Truck, label: "Truck", value: "Truck" },
    { icon: MessageCircle, label: "Other", value: "Other" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white py-12 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

      {/* Valuation Modals Flow */}
      <AnimatePresence>
        {showValuation && (
          <ValuationModals
            formData={formData}
            valuationId={valuationId}
            onClose={() => {
              setShowValuation(false)
              setFormData({
                vehicleType: "",
                brand: "",
                customBrand: "",
                model: "",
                customModel: "",
                year: "",
                vehicleNumber: "",
                vehicleWeight: "",
                name: "",
                phone: "",
                pincode: "",
                agreeTC: false,
              })
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-24 pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600 font-medium">Maximum value</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600 font-medium">Free Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600 font-medium">Road tax rebate</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Get an instant valuation</h1>
        </motion.div>

        {/* Main Container - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-8">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white border border-orange-200 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 group shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(249, 115, 22, 0.7)" }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-4"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <IconComponent className="w-6 h-6 text-orange-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-orange-200 backdrop-blur-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Type Selection */}
              <div>
                <label className="text-sm font-bold text-orange-600 mb-3 block uppercase tracking-wider">Vehicle Type*</label>
                <div className="grid grid-cols-2 gap-3">
                  {vehicleOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleVehicleType(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 ${formData.vehicleType === option.value
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 bg-gray-50 hover:border-orange-300"
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className={`w-6 h-6 ${formData.vehicleType === option.value ? "text-orange-500" : "text-gray-400"}`} />
                        <span className={`text-xs font-semibold ${formData.vehicleType === option.value ? "text-orange-600" : "text-gray-500"}`}>
                          {option.label}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Make Selection */}
              {formData.vehicleType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">
                    {formData.vehicleType === "Other" ? "Enter Vehicle Name*" : "Select Make*"}
                  </label>
                  {formData.vehicleType === "Other" ? (
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors">
                      <Car className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Enter vehicle name"
                        value={formData.customBrand}
                        onChange={(e) => setFormData({ ...formData, customBrand: e.target.value, model: "", customModel: "" })}
                        className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  ) : (
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value, model: "", customModel: "" })}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 outline-none transition-colors"
                    >
                      <option value="">Choose {formData.vehicleType || "vehicle"} brand</option>
                      {formData.vehicleType && vehicleData[formData.vehicleType as keyof typeof vehicleData]?.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  )}
                </motion.div>
              )}

              {/* Custom Brand Input */}
              {formData.brand === "other" && formData.vehicleType !== "Other" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors"
                >
                  <FileText className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter brand name"
                    value={formData.customBrand}
                    onChange={(e) => setFormData({ ...formData, customBrand: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                  />
                </motion.div>
              )}

              {/* Model Selection */}
              {(formData.brand || formData.customBrand) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">
                    {formData.vehicleType === "Other" || formData.brand === "other" ? "Enter Model*" : "Select Model*"}
                  </label>
                  {formData.vehicleType === "Other" || formData.brand === "other" ? (
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Enter model name"
                        value={formData.customModel}
                        onChange={(e) => setFormData({ ...formData, customModel: e.target.value })}
                        className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  ) : (
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value, customModel: "" })}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 outline-none transition-colors"
                    >
                      <option value="">Choose model</option>
                      {formData.vehicleType && models[formData.vehicleType as keyof typeof models]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  )}
                </motion.div>
              )}

              {/* Custom Model Input when "Other" is selected from dropdown */}
              {formData.model === "other" && formData.brand !== "other" && formData.vehicleType !== "Other" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors"
                >
                  <FileText className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter model name"
                    value={formData.customModel}
                    onChange={(e) => setFormData({ ...formData, customModel: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                  />
                </motion.div>
              )}

              {/* Year Selection */}
              {((formData.model && formData.model !== "other") || formData.customModel) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Year*</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 outline-none transition-colors"
                  >
                    <option value="">Choose year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Vehicle Number */}
              <div>
                <label htmlFor="vehicleNumber" className="text-sm font-bold text-orange-600 mb-3 block uppercase tracking-wider">
                  Vehicle Registration Number*
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g., DL-01-AB-1234"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                />
              </div>

              {/* Vehicle Weight */}
              <div>
                <label htmlFor="vehicleWeight" className="text-sm font-bold text-orange-600 mb-3 block uppercase tracking-wider">
                  Vehicle Weight (Tons)*
                </label>
                <input
                  type="number"
                  id="vehicleWeight"
                  value={formData.vehicleWeight}
                  onChange={(e) => setFormData({ ...formData, vehicleWeight: e.target.value })}
                  placeholder="e.g., 1.5"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                />
              </div>

              {/* Pincode */}
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors">
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  maxLength={6}
                  className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-orange-500 transition-colors">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={10}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <input
                  type="checkbox"
                  id="tc"
                  checked={formData.agreeTC}
                  onChange={(e) => setFormData({ ...formData, agreeTC: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer accent-orange-500"
                />
                <label htmlFor="tc" className="text-gray-600 cursor-pointer text-sm">
                  I agree to the <span className="text-orange-500 font-medium">Terms & Conditions</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!formData.agreeTC}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-base relative overflow-hidden group"
                whileHover={{ scale: formData.agreeTC ? 1.02 : 1 }}
                whileTap={{ scale: formData.agreeTC ? 0.98 : 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FileText className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Get My Free Quote</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
