"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Bike, Truck, MessageCircle, CheckCircle, Phone, MapPin, FileText, User, Zap, Sparkles } from "lucide-react"
import Image from "next/image"
import ValuationModals from "./ValuationModals"
import AuthGuard from "./AuthGuard"
import Link from "next/link"

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
      // Submit to API to get ID
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          brand: brandToUse,
          model: modelToUse,
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
        if (data.id) {
          setValuationId(data.id)
        }
        setShowValuation(true)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        const data = await response.json()
        alert(data.message || "Failed to submit valuation request. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting valuation:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  const vehicleOptions = [
    { icon: Car, label: "Car", value: "Car" },
    { icon: Bike, label: "Bike", value: "Bike" },
    { icon: Truck, label: "Truck", value: "Truck" },
    { icon: MessageCircle, label: "Other", value: "Other" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/20 to-white py-12 px-4 relative overflow-hidden">
      <AuthGuard />
      {/* Background effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

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
          className="relative rounded-3xl overflow-hidden mb-12 mt-12 text-center min-h-[350px] flex flex-col justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/getvaluation/headingbg.jpg"
              alt="Vehicle Valuation Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#0a192f]/80 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">Maximum value</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">Free Pickup</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">Road tax rebate</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Get an instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">valuation</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Check your car's value in seconds with our AI-powered valuation tool.
            </p>
          </div>
        </motion.div>

        {/* Main Container - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Benefits */}
          <motion.div
            style={{ perspective: 2000 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.4 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, rotateX: -90, y: 50, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      rotateX: 0,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 40,
                        damping: 15,
                        mass: 1.2
                      }
                    }
                  }}
                  className="bg-[#0a192f] border border-emerald-500/20 rounded-2xl p-6 hover:bg-white hover:border-emerald-300 transition-colors duration-500 group shadow-lg origin-top"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.15)",
                    borderColor: "rgba(16, 185, 129, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:scale-110 transition-all duration-300"
                  >
                    <IconComponent className="w-7 h-7 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-emerald-50 mb-2 group-hover:text-[#0a192f] transition-colors">{benefit.title}</h3>
                  <p className="text-emerald-100/90 leading-relaxed group-hover:text-gray-600 transition-colors">{benefit.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-emerald-100 backdrop-blur-xl relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.2 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Vehicle Type Selection */}
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } } }}>
                <label className="text-sm font-bold text-[#0a192f] mb-3 block uppercase tracking-wider">Vehicle Type*</label>
                <div className="grid grid-cols-2 gap-3">
                  {vehicleOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleVehicleType(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 ${formData.vehicleType === option.value
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 bg-gray-50 hover:border-emerald-300"
                          }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className={`w-6 h-6 ${formData.vehicleType === option.value ? "text-emerald-600" : "text-gray-400"}`} />
                        <span className={`text-xs font-semibold ${formData.vehicleType === option.value ? "text-emerald-700" : "text-gray-500"}`}>
                          {option.label}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Make Selection */}
              {formData.vehicleType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <label className="text-sm font-bold text-[#0a192f] mb-2 block uppercase tracking-wider">
                    {formData.vehicleType === "Other" ? "Enter Vehicle Name*" : "Select Make*"}
                  </label>
                  {formData.vehicleType === "Other" ? (
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group">
                      <Car className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Enter vehicle name"
                        value={formData.customBrand}
                        onChange={(e) => setFormData({ ...formData, customBrand: e.target.value, model: "", customModel: "" })}
                        className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  ) : (
                    <motion.select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value, model: "", customModel: "" })}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 outline-none transition-all duration-300"
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)" }}
                    >
                      <option value="">Choose {formData.vehicleType || "vehicle"} brand</option>
                      {formData.vehicleType && vehicleData[formData.vehicleType as keyof typeof vehicleData]?.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </motion.select>
                  )}
                </motion.div>
              )}

              {/* Custom Brand Input */}
              {formData.brand === "other" && formData.vehicleType !== "Other" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group"
                >
                  <FileText className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
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
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <label className="text-sm font-bold text-[#0a192f] mb-2 block uppercase tracking-wider">
                    {formData.vehicleType === "Other" || formData.brand === "other" ? "Enter Model*" : "Select Model*"}
                  </label>
                  {formData.vehicleType === "Other" || formData.brand === "other" ? (
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group">
                      <FileText className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Enter model name"
                        value={formData.customModel}
                        onChange={(e) => setFormData({ ...formData, customModel: e.target.value })}
                        className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  ) : (
                    <motion.select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value, customModel: "" })}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 outline-none transition-all duration-300"
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)" }}
                    >
                      <option value="">Choose model</option>
                      {formData.vehicleType && models[formData.vehicleType as keyof typeof models]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </motion.select>
                  )}
                </motion.div>
              )}

              {/* Custom Model Input when "Other" is selected from dropdown */}
              {formData.model === "other" && formData.brand !== "other" && formData.vehicleType !== "Other" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0, y: 0 }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group"
                >
                  <FileText className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
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
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <label className="text-sm font-bold text-[#0a192f] mb-2 block uppercase tracking-wider">Year*</label>
                  <motion.select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 outline-none transition-all duration-300"
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)" }}
                  >
                    <option value="">Choose year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>
              )}

              {/* Vehicle Number */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label htmlFor="vehicleNumber" className="text-sm font-bold text-[#0a192f] mb-3 block uppercase tracking-wider">
                  Vehicle Registration Number*
                </label>
                <motion.input
                  type="text"
                  id="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g., DL-01-AB-1234"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 outline-none"
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)" }}
                />
              </motion.div>

              {/* Vehicle Weight */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label htmlFor="vehicleWeight" className="text-sm font-bold text-[#0a192f] mb-3 block uppercase tracking-wider">
                  Vehicle Weight (Tons)*
                </label>
                <motion.input
                  type="number"
                  id="vehicleWeight"
                  value={formData.vehicleWeight}
                  onChange={(e) => setFormData({ ...formData, vehicleWeight: e.target.value })}
                  placeholder="e.g., 1.5"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 outline-none"
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)" }}
                />
              </motion.div>

              {/* Pincode */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group"
              >
                <MapPin className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  maxLength={6}
                  className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                />
              </motion.div>

              {/* Name and Phone */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group">
                  <User className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 group">
                  <Phone className="w-4 h-4 text-gray-400 mr-2 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={10}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
              </motion.div>

              {/* Terms & Conditions */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <input
                  type="checkbox"
                  id="tc"
                  checked={formData.agreeTC}
                  onChange={(e) => setFormData({ ...formData, agreeTC: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer accent-emerald-600"
                />
                <label htmlFor="tc" className="text-gray-600 cursor-pointer text-sm">
                  I agree to the <Link href="/terms" className="text-emerald-600 font-medium hover:underline">Terms & Conditions</Link>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!formData.agreeTC}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="w-full bg-[#0a192f] hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-base relative overflow-hidden group"
                whileHover={{ scale: formData.agreeTC ? 1.02 : 1 }}
                whileTap={{ scale: formData.agreeTC ? 0.98 : 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FileText className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Get My Free Quote</span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
