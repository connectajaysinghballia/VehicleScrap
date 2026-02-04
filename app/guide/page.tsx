"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"

import { motion } from "framer-motion"
import { CheckCircle2, Recycle, ShoppingCart, Car, Repeat } from "lucide-react"
import Link from "next/link"

export default function GuidePage() {
    const [activeSection, setActiveSection] = useState(0)
    const [activeStep, setActiveStep] = useState(0)

    const sections = [
        {
            id: "scrapping",
            title: "Process of Scrapping My Vehicle",
            icon: Recycle,
            steps: [
                {
                    title: "Submit Details",
                    description: "Enter your vehicle details (Make, Model, Year) on our website or app.",
                },
                {
                    title: "Get a Quote",
                    description: "Receive an instant, fair valuation based on current market scrap rates.",
                },
                {
                    title: "Schedule Pickup",
                    description: "Choose a convenient time for our team to pick up your vehicle from your location.",
                },
                {
                    title: "Inspection & Payment",
                    description: "Our experts inspect the vehicle on-site and transfer the payment immediately.",
                },
                {
                    title: "Certificate of Deposit",
                    description: "Receive your official Certificate of Deposit to deregister your vehicle.",
                },
            ],
        },
        {
            id: "buying",
            title: "Process of Buying a Used Vehicle",
            icon: ShoppingCart,
            steps: [
                {
                    title: "Browse Inventory",
                    description: "Explore our wide range of refurbished and verified used vehicles online.",
                },
                {
                    title: "Book a Test Drive",
                    description: "Schedule a visit to inspect the car and take it for a spin.",
                },
                {
                    title: "Document Verification",
                    description: "We handle all RTO transfers and paperwork for a hassle-free experience.",
                },
                {
                    title: "Secure Payment",
                    description: "Pay securely via our platform or explore financing options.",
                },
                {
                    title: "Drive Away",
                    description: "Get the keys to your new ride with a warranty and service assurance.",
                },
            ],
        },
        {
            id: "selling",
            title: "Process of Selling My Vehicle",
            icon: Car,
            steps: [
                {
                    title: "Online Evaluation",
                    description: "Provide your car's details and photos to get an estimated price range.",
                },
                {
                    title: "Physical Inspection",
                    description: "Visit our center or book a home inspection for a precise valuation.",
                },
                {
                    title: "Best Price Offer",
                    description: "We offer the best market price with no hidden commissions.",
                },
                {
                    title: "Instant Transfer",
                    description: "Get paid instantly and let us handle the RC transfer process.",
                },
            ],
        },
        {
            id: "exchange",
            title: "Process of Exchanging My Vehicle",
            icon: Repeat,
            steps: [
                {
                    title: "Choose Your New Car",
                    description: "Select the vehicle you want to buy from our inventory.",
                },
                {
                    title: "Evaluate Old Car",
                    description: "We assess your current vehicle to determine its exchange value.",
                },
                {
                    title: "Pay Difference",
                    description: "Pay only the difference amount between the new car and your old car's value.",
                },
                {
                    title: "Seamless Swap",
                    description: "Hand over your old keys and drive off in your upgraded vehicle on the same day.",
                },
            ],
        },
    ]

    // Auto-advance highlight
    // Auto-advance highlight with GSAP Timeline
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1 }) // Loop indefinitely

            sections.forEach((section, secIdx) => {
                section.steps.forEach((_, stepIdx) => {
                    tl.call(() => {
                        setActiveSection(secIdx)
                        setActiveStep(stepIdx)
                    })
                        .to({}, { duration: 3 }) // Wait 3 seconds for each step
                })
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-6"
                    >
                        User Guides
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
                    >
                        How It <span className="text-orange-600">Works</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 leading-relaxed"
                    >
                        Detailed step-by-step guides for all our services. We make every process simple, transparent, and efficient.
                    </motion.p>
                </div>

                <div className="grid gap-20">
                    {sections.map((section, sectionIdx) => (
                        <motion.div
                            key={section.id}
                            id={section.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="scroll-mt-32"
                        >
                            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-orange-900/5 border border-orange-100 relative overflow-hidden">
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 text-white shrink-0">
                                        <section.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            {section.title}
                                        </h2>
                                        <p className="text-gray-500 mt-2">Follow these simple steps</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                    {section.steps.map((step, stepIdx) => {
                                        const isActive = activeSection === sectionIdx && activeStep === stepIdx
                                        const isCompleted = activeSection === sectionIdx && activeStep > stepIdx

                                        return (
                                            <motion.div
                                                key={step.title}
                                                animate={{
                                                    scale: isActive ? 1.05 : 1,
                                                    y: isActive ? -5 : 0,
                                                    opacity: (activeSection === sectionIdx) ? (isActive ? 1 : 0.7) : 1
                                                }}
                                                className={`relative p-6 rounded-2xl border transition-all duration-500 ${isActive
                                                    ? "bg-orange-50 border-orange-200 shadow-md ring-1 ring-orange-200"
                                                    : "bg-gray-50 border-gray-100 hover:bg-white hover:shadow-sm"
                                                    }`}
                                            >
                                                {/* Step Number Badge */}
                                                <div className={`absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-sm transition-colors duration-300 ${isActive || isCompleted ? "bg-orange-600 text-white" : "bg-white text-gray-400 border border-gray-200"
                                                    }`}>
                                                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepIdx + 1}
                                                </div>

                                                <h3 className={`text-lg font-bold mb-3 transition-colors ${isActive ? "text-orange-700" : "text-gray-900"}`}>
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {step.description}
                                                </p>

                                                {/* Progress Bar for active step */}
                                                {isActive && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-100 rounded-b-2xl overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 3, ease: "linear" }}
                                                            className="h-full bg-orange-500"
                                                        />
                                                    </div>
                                                )}
                                            </motion.div>
                                        )
                                    })}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    )
}
