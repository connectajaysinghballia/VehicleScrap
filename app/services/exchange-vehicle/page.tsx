"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ExchangeVehicleForm from "@/components/ExchangeVehicleForm"
import { motion } from "framer-motion"
import { TrendingUp, Zap, Shield, Award } from "lucide-react"

export default function ExchangeVehiclePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Upgrade Your Ride",
      description: "Trade your old vehicle for a better one with top-up payment",
    },
    {
      icon: Zap,
      title: "Instant Valuation",
      description: "Get real-time price for your current vehicle",
    },
    {
      icon: Shield,
      title: "Secure Deal",
      description: "Safe and transparent exchange process",
    },
    {
      icon: Award,
      title: "Best Market Value",
      description: "Receive maximum value for your vehicle",
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-gray-900">
              Exchange Your <span className="text-orange-600">Vehicle</span>
            </h1>
            <p className="text-xl text-gray-600 text-balance">
              Trade in your old vehicle and get the best value. Upgrade to your dream car with our exchange program.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Split Layout Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Benefits Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Exchange?</h2>
                <p className="text-gray-600 text-lg">Hassle-free exchange process with transparent pricing</p>
              </div>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex gap-6 p-6 rounded-xl border border-orange-200 bg-white hover:border-orange-400 hover:shadow-md transition-all"
                      whileHover={{ x: 8, y: -2 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Form Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 overflow-hidden shadow-xl"
            >
              {/* Directly embed the form instead of conditional rendering */}
              <ExchangeVehicleForm onClose={() => { }} />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
