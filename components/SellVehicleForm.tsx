"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Zap, Leaf } from "lucide-react"
import EKYCForm from "./eKYCForm"
import { useRouter } from "next/navigation"

interface SellVehicleFormProps {
  onClose: () => void
}

interface FormData {
  registrationNumber: string
  brand: string
  customBrand: string
  model: string
  customModel: string
  registrationYear: string
  fuelType: string
  pendingLoan: string
  loanAmount?: string
  loanBank?: string
  name?: string
  phone?: string
  pincode?: string
  insuranceFile?: File
}

export default function SellVehicleForm({ onClose }: SellVehicleFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    registrationNumber: "",
    brand: "",
    customBrand: "",
    model: "",
    customModel: "",
    registrationYear: "",
    fuelType: "",
    pendingLoan: "no",
    loanAmount: "",
    loanBank: "",
    name: "",
    phone: "",
    pincode: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showEKYC, setShowEKYC] = useState(false)
  const [showIntermediateModal, setShowIntermediateModal] = useState(false)
  const [valuation, setValuation] = useState(0)

  const benefits = [
    {
      icon: Zap,
      title: "Fair and Transparent Valuation",
      description: "Get accurate market-based pricing for your vehicle with complete transparency",
    },
    {
      icon: CheckCircle,
      title: "Paperwork & Pickup Handled",
      description: "We handle all documentation and provide free vehicle pickup at your convenience",
    },
    {
      icon: Leaf,
      title: "Full Legal Compliance",
      description: "Eco-friendly benefits and CD certificate provided for responsible vehicle disposal",
    },
  ]

  const fuelTypes = ["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"]
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
  const brands = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Skoda", "Nissan", "BMW", "Audi"]
  const models = ["Sedan", "SUV", "Hatchback", "MUV", "Coupe", "Convertible", "Wagon"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should not exceed 2MB")
        e.target.value = "" // Reset input
        return
      }
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file")
        e.target.value = "" // Reset input
        return
      }
      setFormData((prev) => ({
        ...prev,
        insuranceFile: file,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const brandValue = formData.brand === "other" ? formData.customBrand : formData.brand
    const modelValue = formData.model === "other" ? formData.customModel : formData.model

    const requiredFields = [
      formData.registrationNumber,
      brandValue,
      modelValue,
      formData.registrationYear,
      formData.fuelType,
      formData.pendingLoan,
    ]

    if (formData.pendingLoan === "yes" && (!formData.loanAmount || !formData.loanBank)) {
      alert("Please fill in loan details")
      return
    }

    if (!formData.insuranceFile) {
      alert("Please upload Car Insurance PDF")
      return
    }

    if (requiredFields.every((field) => field !== "")) {
      console.log("Form submitted:", formData)
      // Calculate random valuation (in real app, this would be based on vehicle details)
      const randomValuation = Math.floor(Math.random() * (500000 - 50000) + 50000)
      setValuation(randomValuation)
      setShowIntermediateModal(true)
    } else {
      alert("Please fill in all required fields.")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
      {/* Benefits Section - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Us?</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 border border-orange-200 hover:border-orange-400 transition-all duration-300 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10">
                      <IconComponent className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg p-4 border border-orange-500/20 mt-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="text-orange-600 font-semibold">Eco-Friendly Benefits:</span> When you scrap your vehicle with us, you'll receive a CD certificate confirming legal and environmentally responsible disposal.
          </p>
        </div>
      </motion.div>

      {/* Form Section - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Registration Number */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Vehicle Registration Number*</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="e.g., MH 02 AB 1234"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Vehicle Brand*</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
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
          {formData.brand === "other" && (
            <div>
              <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Enter Brand Name*</label>
              <input
                type="text"
                name="customBrand"
                value={formData.customBrand}
                onChange={handleChange}
                placeholder="e.g., Tesla"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                required={formData.brand === "other"}
              />
            </div>
          )}

          {/* Model */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Vehicle Model*</label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
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
          {formData.model === "other" && (
            <div>
              <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Enter Model Name*</label>
              <input
                type="text"
                name="customModel"
                value={formData.customModel}
                onChange={handleChange}
                placeholder="e.g., Model S"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                required={formData.model === "other"}
              />
            </div>
          )}

          {/* Registration Year */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Registration Year*</label>
            <select
              name="registrationYear"
              value={formData.registrationYear}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
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

          {/* Pending Loan */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Do you have pending loan on this vehicle?*</label>
            <select
              name="pendingLoan"
              value={formData.pendingLoan}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Loan Details - Conditional */}
          {formData.pendingLoan === "yes" && (
            <>
              <div>
                <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Loan Amount*</label>
                <input
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="e.g., 500000"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  required={formData.pendingLoan === "yes"}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Bank Name*</label>
                <input
                  type="text"
                  name="loanBank"
                  value={formData.loanBank}
                  onChange={handleChange}
                  placeholder="e.g., HDFC Bank"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  required={formData.pendingLoan === "yes"}
                />
              </div>
            </>
          )}

          {/* Car Insurance Upload */}
          <div>
            <label className="text-sm font-bold text-orange-600 mb-2 block uppercase tracking-wider">Car Insurance (PDF)*</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-300 rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF (MAX. 2MB)</p>
                </div>
                <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} required />
              </label>
            </div>
            {formData.insuranceFile && (
              <p className="mt-2 text-sm text-green-600 font-medium">Selected: {formData.insuranceFile.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-300 mt-6"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Get Valuation
          </motion.button>
        </form>
      </motion.div>

      {/* Intermediate CC Modal */}
      <AnimatePresence>
        {showIntermediateModal && (
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
                  {/* Using CheckCircle here or maybe something else? Using checkcircle for now as implicit success of form submit */}
                  <CheckCircle className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Request Submitted!</h2>
              <div className="text-center mb-8">
                <p className="font-bold text-gray-900 text-lg mb-1">Our CC will contact you soon</p>
                <p className="text-sm text-gray-500">Please complete the final step to process your request.</p>
              </div>

              <button
                onClick={() => {
                  setShowIntermediateModal(false)
                  setShowEKYC(true)
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                Complete eKYC
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* eKYC Form Modal */}
      <AnimatePresence>
        {showEKYC && (
          <EKYCForm
            formData={formData}
            onBack={() => setShowEKYC(false)}
            valuation={valuation}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
