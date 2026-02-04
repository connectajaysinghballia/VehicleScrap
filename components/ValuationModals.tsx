"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Shield, Sparkles, Smartphone, Award, FileText, ArrowRight, Home } from "lucide-react"
import confetti from "canvas-confetti"
import Link from "next/link"

interface ValuationModalsProps {
    formData: any
    valuationId: string | null
    onClose: () => void
}

export default function ValuationModals({ formData, valuationId, onClose }: ValuationModalsProps) {
    const router = useRouter()
    const [step, setStep] = useState<1 | 2 | 3>(1)

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Calculate estimated value (Mock logic: Weight * Rate based on type)
    const ratePerTon = formData.vehicleType === "Car" ? 25000 : formData.vehicleType === "Bike" ? 15000 : 35000
    const weight = parseFloat(formData.vehicleWeight) || 0
    const estimatedValue = (weight * ratePerTon).toLocaleString("en-IN")



    const handleCompleteKYC = () => {
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setStep(3)
            setIsSubmitting(false)
            triggerConfetti()
        }, 1500)
    }

    const triggerConfetti = () => {
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#f97316', '#3b82f6', '#ffffff']
            })
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#f97316', '#3b82f6', '#ffffff']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }
        frame()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">

                {/* Step 1: Valuation Result */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden relative"
                    >
                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 md:p-8 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Build Your Quote</h2>
                            <p className="opacity-90 text-xs md:text-base">Based on your {formData.vehicleType} details</p>

                            <div className="mt-4 md:mt-8 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-6 border border-white/20 inline-block w-full max-w-[250px] md:max-w-sm mx-auto">
                                <p className="text-[10px] md:text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Estimated Valuation</p>
                                <div className="text-2xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm break-words">
                                    ₹{estimatedValue}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-8 bg-white">
                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
                                {[
                                    { icon: Shield, title: "Certificate of Deposit", desc: "Secure investment options" },
                                    { icon: Sparkles, title: "25% Tax Rebate", desc: "Save big on new purchases" },
                                    { icon: Award, title: "Registration Waiver", desc: "Complete fee exemption" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center hover:bg-blue-100 transition-colors flex flex-col items-center justify-center">
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center mb-1 md:mb-3 shadow-sm text-blue-600">
                                            <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-[10px] md:text-sm leading-tight mb-0 md:mb-1">{item.title}</h3>
                                        <p className="hidden md:block text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-row items-center gap-3 p-3 md:p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg shadow-sm mb-4 md:mb-8 relative overflow-hidden text-left">
                                <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none hidden md:block">
                                    <Smartphone className="w-24 h-24 text-orange-600" />
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md animate-pulse shrink-0">
                                    <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-extrabold text-gray-900 text-sm md:text-lg leading-tight">Our CC will contact you soon</p>
                                    <p className="text-xs md:text-sm font-bold text-orange-700">Support available 24/7</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.setItem("kycFormData", JSON.stringify(formData))
                                    localStorage.setItem("kycValuation", estimatedValue.replace(/,/g, ""))
                                    if (valuationId) localStorage.setItem("kycValuationId", valuationId)
                                    router.push("/ekyc")
                                }}
                                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 md:py-4 rounded-xl shadow-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                                Final Step eKYC
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: eKYC Form */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Complete eKYC</h2>
                            <p className="text-gray-500">Verify your identity to claim benefits</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input type="text" defaultValue={formData.name} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none" placeholder="As per Aadhaar" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Aadhaar Number</label>
                                    <input type="text" maxLength={12} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none" placeholder="XXXX XXXX XXXX" />
                                </div>
                            </div>

                            {/* File Uploads */}
                            <div className="space-y-4 pt-2">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Aadhaar Card (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Upload RC (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Car Photo (PNG/JPG)</label>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Aadhaar Registered Mobile</label>
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        defaultValue={formData.phone}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 outline-none"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <input type="checkbox" className="w-4 h-4 text-green-600 rounded" defaultChecked />
                                <span className="text-xs text-gray-500">I agree to eKYC terms & conditions</span>
                            </div>

                            <button
                                onClick={handleCompleteKYC}
                                disabled={isSubmitting}
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? "Verifying..." : "Submit & Complete eKYC"}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Success Celebration */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>

                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-6">
                            Your valuation request and eKYC have been submitted successfully.
                        </p>

                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8">
                            <p className="font-medium text-gray-900 mb-1">What's Next?</p>
                            <p className="text-sm text-gray-600">
                                Our Collection Center (CC) executive will contact you within <span className="font-bold text-orange-600">24 hours</span> regarding pickup.
                            </p>
                        </div>

                        <Link href="/" className="block w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                            <Home className="w-5 h-5" />
                            Return to Home
                        </Link>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
