"use client"

import Navbar from "@/components/Navbar"
import SellVehicleForm from "@/components/SellVehicleForm"
import Footer from "@/components/Footer" // Added import for Footer
import { motion } from "framer-motion"
import { CheckCircle, Clock, DollarSign, Headphones } from "lucide-react"
import Link from "next/link"

export default function SellVehiclePage() {
  const features = [
    {
      icon: DollarSign,
      title: "Best Market Price",
      description: "Get the highest valuation based on current market rates",
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Sell your vehicle in just 3 simple steps",
    },
    {
      icon: CheckCircle,
      title: "Instant Verification",
      description: "Complete eKYC verification in minutes",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support throughout the process",
    },
  ]

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-gray-900">
              Sell Your <span className="text-orange-600">Old Vehicle</span>
            </h1>
            <p className="text-xl text-gray-600 text-balance">
              Get the best price for your vehicle with EcoScrap India. Fast, secure, and hassle-free process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section - Direct Display */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-12 overflow-hidden shadow-xl">
            <SellVehicleForm onClose={() => { }} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 rounded-xl border border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
