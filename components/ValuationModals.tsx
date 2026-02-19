"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Shield, Sparkles, Smartphone, Award, FileText, Home } from "lucide-react"
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

    // Calculate estimated value
    const ratePerTon = formData.vehicleType === "Car" ? 25000 : formData.vehicleType === "Bike" ? 15000 : 35000
    const weight = parseFloat(formData.vehicleWeight) || 0
    const estimatedValue = (weight * ratePerTon).toLocaleString("en-IN")

    // Pre-generate confetti pieces (stable across renders)
    const confettiPieces = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
        id: i,
        color: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#ffffff"][i % 8],
        x: (Math.random() - 0.5) * 120,
        y: -(30 + Math.random() * 80),
        rotate: Math.random() * 720,
        delay: Math.random() * 0.8,
        duration: 1.8 + Math.random() * 1.2,
        size: 6 + Math.random() * 8,
        shape: i % 3,
    })), [])

    const valuationConfetti = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
        id: i,
        color: ["#10b981", "#3b82f6", "#f59e0b", "#ffffff", "#06b6d4"][i % 5],
        x: (Math.random() - 0.5) * 100,
        y: -(20 + Math.random() * 60),
        rotate: Math.random() * 540,
        delay: Math.random() * 0.6,
        duration: 1.5 + Math.random() * 1,
        size: 5 + Math.random() * 6,
        shape: i % 2,
    })), [])

    const handleCompleteKYC = () => {
        setIsSubmitting(true)
        setTimeout(() => {
            setStep(3)
            setIsSubmitting(false)
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm overflow-hidden">
            {/* Confetti on Step 1 */}
            {step === 1 && valuationConfetti.map((piece) => (
                <motion.div
                    key={`vc-${piece.id}`}
                    className="absolute pointer-events-none"
                    style={{
                        width: piece.size,
                        height: piece.shape === 1 ? piece.size * 0.4 : piece.size,
                        backgroundColor: piece.color,
                        borderRadius: piece.shape === 0 ? "50%" : "2px",
                        left: "50%",
                        top: "50%",
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: `${piece.x}vw`, y: `${piece.y}vh`, opacity: [1, 1, 0], rotate: piece.rotate }}
                    transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
                />
            ))}

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
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 text-white backdrop-blur-sm">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="bg-[#0E192D] p-4 md:p-8 text-center text-white relative overflow-hidden">
                            {/* Background Effects */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

                            <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 relative z-10">Build Your Quote</h2>
                            <p className="opacity-90 text-xs md:text-base text-emerald-100 relative z-10">Based on your {formData.vehicleType} details</p>

                            <div className="mt-4 md:mt-8 bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-6 border border-emerald-500/30 inline-block w-full max-w-[250px] md:max-w-sm mx-auto relative z-10">
                                <p className="text-[10px] md:text-sm font-medium text-emerald-400 uppercase tracking-widest mb-1">Estimated Valuation</p>
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
                                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl p-2 md:p-4 text-center hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 flex flex-col items-center justify-center group">
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center mb-1 md:mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                                        </div>
                                        <h3 className="font-bold text-[#0E192D] text-[10px] md:text-sm leading-tight mb-0 md:mb-1">{item.title}</h3>
                                        <p className="hidden md:block text-xs text-gray-500 group-hover:text-emerald-700/70 transition-colors">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-row items-center gap-3 p-3 md:p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg shadow-sm mb-4 md:mb-8 relative overflow-hidden text-left">
                                <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none hidden md:block">
                                    <Smartphone className="w-24 h-24 text-emerald-800" />
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md animate-pulse shrink-0">
                                    <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-extrabold text-[#0E192D] text-sm md:text-lg leading-tight">Our CC will contact you soon</p>
                                    <p className="text-xs md:text-sm font-bold text-emerald-700">Support available 24/7</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.setItem("kycFormData", JSON.stringify(formData))
                                    localStorage.setItem("kycValuation", estimatedValue.replace(/,/g, ""))
                                    if (valuationId) localStorage.setItem("kycValuationId", valuationId)
                                    router.push("/ekyc/get-quote")
                                }}
                                className="w-full bg-[#0E192D] hover:bg-emerald-600 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transform transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 group-hover:text-white" />
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
                        <div className="absolute top-4 right-4">
                            <button onClick={() => setStep(1)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#0E192D]">Complete eKYC</h2>
                            <p className="text-gray-500">Verify your identity to claim benefits</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#0E192D] mb-1">Full Name</label>
                                <input type="text" defaultValue={formData.name} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none transition-colors" placeholder="As per Aadhaar" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#0E192D] mb-1">Date of Birth</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#0E192D] mb-1">Aadhaar Number</label>
                                    <input type="text" maxLength={12} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none transition-colors" placeholder="XXXX XXXX XXXX" />
                                </div>
                            </div>

                            {/* File Uploads */}
                            <div className="space-y-4 pt-2">
                                <div>
                                    <label className="block text-sm font-semibold text-[#0E192D] mb-1">Upload Aadhaar Card (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#0E192D] mb-1">Upload RC (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#0E192D] mb-1">Upload Car Photo (PNG/JPG)</label>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-semibold text-[#0E192D] mb-1">Aadhaar Registered Mobile</label>
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        defaultValue={formData.phone}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" defaultChecked />
                                <span className="text-xs text-gray-500">I agree to eKYC terms & conditions</span>
                            </div>

                            <button
                                onClick={handleCompleteKYC}
                                disabled={isSubmitting}
                                className="w-full mt-6 bg-[#0E192D] hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? "Verifying..." : "Submit & Complete eKYC"}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Success Celebration */}
                {step === 3 && (
                    <>
                        {/* Full confetti on success */}
                        {confettiPieces.map((piece) => (
                            <motion.div
                                key={`sc-${piece.id}`}
                                className="absolute pointer-events-none z-50"
                                style={{
                                    width: piece.size,
                                    height: piece.shape === 1 ? piece.size * 0.4 : piece.size,
                                    backgroundColor: piece.color,
                                    borderRadius: piece.shape === 0 ? "50%" : "2px",
                                    left: "50%",
                                    top: "50%",
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                                animate={{ x: `${piece.x}vw`, y: `${piece.y}vh`, opacity: [1, 1, 0], rotate: piece.rotate, scale: [1, 1.2, 0.5] }}
                                transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut", repeat: Infinity, repeatDelay: 1.5 }}
                            />
                        ))}
                        {/* Floating emoji */}
                        {["🎉", "🎊", "✨", "🏆", "🎈", "⭐"].map((emoji, i) => (
                            <motion.div
                                key={`emoji-${i}`}
                                className="absolute text-2xl pointer-events-none select-none z-50"
                                style={{ left: `${10 + i * 15}%`, bottom: "-5%" }}
                                animate={{ y: ["-0vh", "-120vh"], opacity: [0, 1, 1, 0], rotate: [0, i % 2 === 0 ? 30 : -30] }}
                                transition={{ duration: 3 + i * 0.4, delay: i * 0.3, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
                            >
                                {emoji}
                            </motion.div>
                        ))}
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.5, y: 60 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", duration: 0.7, bounce: 0.4 }}
                            className="w-full max-w-md bg-[#0E192D] rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden z-10 border border-emerald-500/30"
                        >
                            {/* Glow blobs */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="absolute top-4 right-4 z-20">
                                <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="relative z-10">
                                <motion.div
                                    className="flex justify-center mb-6"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", duration: 0.8, bounce: 0.5, delay: 0.2 }}
                                >
                                    <motion.div
                                        className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500/40"
                                        animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 rgba(16,185,129,0.4)", "0 0 0 20px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <CheckCircle className="w-12 h-12 text-emerald-400" />
                                    </motion.div>
                                </motion.div>

                                <motion.h2 className="text-4xl font-black text-white mb-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                    You&apos;re All Set! <span className="text-2xl">🎉</span>
                                </motion.h2>
                                <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto my-3" />

                                <motion.p className="text-emerald-400 font-bold text-lg mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                    eKYC Completed Successfully!
                                </motion.p>
                                <motion.p className="text-gray-400 text-sm mb-6 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                                    Your identity has been verified. Our team will reach out within <span className="text-emerald-400 font-bold">24 hours</span>.
                                </motion.p>

                                <motion.div className="grid grid-cols-3 gap-3 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                                    {[
                                        { label: "Verified", icon: "✅", color: "text-emerald-400" },
                                        { label: "Submitted", icon: "📤", color: "text-blue-400" },
                                        { label: "Processing", icon: "⚡", color: "text-yellow-400" },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                                            <div className="text-2xl mb-1">{item.icon}</div>
                                            <div className={`text-xs font-bold ${item.color}`}>{item.label}</div>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                                    <Link href="/" className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 text-lg flex items-center justify-center gap-2">
                                        <Home className="w-5 h-5" />
                                        Back to Home 🏠
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}

            </AnimatePresence>
        </div>
    )
}

