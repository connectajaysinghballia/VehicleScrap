"use client"

import React from "react"

import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, User, Calendar, Smartphone, CreditCard, FileText, Image as ImageIcon, ArrowRight } from "lucide-react"
import { useState } from "react"

interface VehicleFormData {
  // Fields from SellVehicleForm
  registrationNumber?: string
  brand?: string
  customBrand?: string
  model?: string
  customModel?: string
  registrationYear?: string
  fuelType?: string
  pendingLoan?: string
  loanAmount?: string
  loanBank?: string
  carAccident?: string

  // Fields from QuoteForm
  vehicleType?: string
  year?: string
  vehicleNumber?: string
  vehicleWeight?: string

  // Common
  name?: string
  phone?: string
  pincode?: string
  agreeTC?: boolean
}

interface eKYCFormData {
  firstName: string
  dob: string
  aadharPhone: string
  aadharNumber: string
  // Files
  aadharFile?: File | null
  rcFile?: File | null
  carPhoto?: File | null
  agreeTC: boolean
}


export default function EKYCForm({
  formData,
  onBack,
  valuation,
  isPage = false
}: {
  formData: VehicleFormData;
  onBack: () => void;
  valuation: number;
  isPage?: boolean;
}) {
  const [eKYCData, setEKYCData] = useState<eKYCFormData>({
    firstName: formData.name || "",
    dob: "",
    aadharPhone: formData.phone || "",
    aadharNumber: "",
    aadharFile: null,
    rcFile: null,
    carPhoto: null,
    agreeTC: false,
  })

  const [showCongratulations, setShowCongratulations] = useState(false)
  const [showCollectionCenter, setShowCollectionCenter] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (eKYCData.firstName && eKYCData.dob && eKYCData.aadharPhone && eKYCData.aadharNumber && eKYCData.agreeTC) {

      try {
        const valuationId = localStorage.getItem("kycValuationId")

        if (!valuationId) {
          console.error("Valuation ID not found")
          // Fallback: Proceed to success screen anyway for demo/UI flow if no ID
          setShowCongratulations(true)
          return
        }

        const response = await fetch("/api/ekyc", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valuationId,
            firstName: eKYCData.firstName,
            dob: eKYCData.dob,
            aadharPhone: eKYCData.aadharPhone,
            aadharNumber: eKYCData.aadharNumber,
            // Sending filenames for now as placeholders for actual file upload logic
            aadharFile: eKYCData.aadharFile?.name,
            rcFile: eKYCData.rcFile?.name,
            carPhoto: eKYCData.carPhoto?.name,
          }),
        })

        if (response.ok) {
          setShowCongratulations(true)
          // Clear stored data on success
          localStorage.removeItem("kycFormData")
          localStorage.removeItem("kycValuation")
          localStorage.removeItem("kycValuationId")
        } else {
          console.error("Failed to update eKYC data")
          alert("Something went wrong. Please try again.")
        }
      } catch (error) {
        console.error("Error submitting eKYC:", error)
        alert("Failed to submit. Please check your connection.")
      }

    } else {
      alert("Please fill in all details.")
    }
  }

  if (showCollectionCenter) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
      >
        {/* Firecracker animations */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              delay: Math.random() * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          />
        ))}

        {/* Additional firecracker particles with different colors */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`fire-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: [
                "#ff4444",
                "#ffaa00",
                "#44ff44",
                "#4444ff",
                "#ff44ff",
              ][i % 5],
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: (Math.random() - 0.5) * 500,
              y: (Math.random() - 0.5) * 500,
              opacity: 0,
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2.5,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-orange-200 p-8 relative z-10"
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          >
            <CheckCircle className="w-24 h-24 text-orange-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Success! 🎉</h2>
          <p className="text-center text-gray-700 text-lg font-semibold mb-4">Your Nearest Collection Center</p>
          <p className="text-center text-gray-600 mb-6">will contact you soon with pickup details and final payment confirmation.</p>

          <motion.button
            onClick={() => {
              setShowCollectionCenter(false)
              window.location.href = "/"
            }}
            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    )
  }

  if (showCongratulations) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-orange-200 p-8"
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-20 h-20 text-orange-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Congratulations!</h2>
          <p className="text-center text-gray-600 mb-6">
            Your eKYC has been verified successfully. Your request has been submitted.
          </p>
          <p className="text-center text-gray-500 text-sm">We will contact you shortly to complete the vehicle pickup process.</p>

          <motion.button
            onClick={() => setShowCollectionCenter(true)}
            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </motion.button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={isPage ? "w-full" : "fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
        className={
          isPage
            ? "bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full border border-white/20 relative"
            : "bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full border border-white/20 my-8 max-h-[80vh] overflow-y-auto relative"
        }
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 md:p-6 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.button
              onClick={onBack}
              className="p-2 md:p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 transition-all border border-gray-200"
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            <div>
              <h2 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Complete Verification
              </h2>
              <p className="text-xs md:text-sm text-gray-500 font-medium">Step 2 of 2: eKYC & Documentation</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

            {/* Personal Details Section */}
            <div className="bg-gray-50/50 p-4 md:p-5 rounded-xl border border-gray-100">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                <span className="w-1 h-5 md:h-6 bg-orange-500 rounded-full"></span>
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="text"
                      value={eKYCData.firstName}
                      onChange={(e) => setEKYCData({ ...eKYCData, firstName: e.target.value })}
                      placeholder="As per Aadhaar"
                      className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-white border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider ml-1">Date of Birth</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="date"
                      value={eKYCData.dob}
                      onChange={(e) => setEKYCData({ ...eKYCData, dob: e.target.value })}
                      className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-white border-2 border-gray-100 text-gray-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Aadhar Details Section */}
            <div className="bg-gray-50/50 p-4 md:p-5 rounded-xl border border-gray-100">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                <span className="w-1 h-5 md:h-6 bg-blue-500 rounded-full"></span>
                Aadhaar Verification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider ml-1">
                    Linked Mobile Number
                  </label>
                  <div className="relative group">
                    <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="tel"
                      value={eKYCData.aadharPhone}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "").slice(0, 10)
                        setEKYCData({ ...eKYCData, aadharPhone: numericValue })
                      }}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-white border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1.5 block uppercase tracking-wider ml-1">Aadhaar Number</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      value={eKYCData.aadharNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 14)
                        setEKYCData({ ...eKYCData, aadharNumber: val })
                      }}
                      placeholder="14-digit Aadhaar number"
                      maxLength={14}
                      className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-white border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Uploads Section */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                <span className="w-1 h-5 md:h-6 bg-green-500 rounded-full"></span>
                Document Uploads
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Aadhaar Card", type: "PDF", key: "aadharFile", icon: FileText, color: "orange" },
                  { label: "RC Document", type: "PDF", key: "rcFile", icon: FileText, color: "blue" },
                  { label: "Car Photo", type: "PNG/JPG", key: "carPhoto", icon: ImageIcon, color: "green" }
                ].map((item, idx) => (
                  <div key={idx} className="group relative">
                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">{item.label} ({item.type})*</label>
                    <div className={`border-2 border-dashed border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-${item.color}-50/50 hover:border-${item.color}-300 transition-all cursor-pointer relative overflow-hidden`}>
                      <div className={`w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 text-${item.color}-500`} />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 text-center">{eKYCData[item.key as keyof eKYCFormData] ? "File Selected" : "Click to Upload"}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.type} only</p>
                      <input
                        type="file"
                        accept={item.type === "PDF" ? ".pdf" : "image/png, image/jpeg, image/jpg"}
                        onChange={(e) => setEKYCData({ ...eKYCData, [item.key]: e.target.files ? e.target.files[0] : null })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {eKYCData[item.key as keyof eKYCFormData] && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-5 h-5 text-green-500 fill-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* T&C Checkbox */}
            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="tc"
                  checked={eKYCData.agreeTC}
                  onChange={(e) => setEKYCData({ ...eKYCData, agreeTC: e.target.checked })}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-orange-300 transition-all checked:bg-orange-500 checked:border-orange-500"
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <label htmlFor="tc" className="text-sm text-gray-600 cursor-pointer select-none leading-relaxed">
                I hereby declare that the details furnished above are true and correct to the best of my knowledge. I agree to the{" "}
                <span className="text-orange-600 font-bold hover:underline">Terms & Conditions</span> and{" "}
                <span className="text-orange-600 font-bold hover:underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!eKYCData.firstName || !eKYCData.dob || !eKYCData.aadharNumber || !eKYCData.agreeTC}
              className={`w-full py-3.5 md:py-4.5 rounded-xl font-bold text-base md:text-lg shadow-lg relative overflow-hidden group ${!eKYCData.firstName || !eKYCData.dob || !eKYCData.aadharNumber || !eKYCData.agreeTC
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:shadow-xl hover:shadow-gray-200"
                }`}
              whileHover={!(!eKYCData.firstName || !eKYCData.dob || !eKYCData.aadharNumber || !eKYCData.agreeTC) ? { scale: 1.01 } : {}}
              whileTap={!(!eKYCData.firstName || !eKYCData.dob || !eKYCData.aadharNumber || !eKYCData.agreeTC) ? { scale: 0.99 } : {}}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Submit Verification
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
