"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import ExchangeVehicleForm from "@/components/ExchangeVehicleForm"
import { motion, AnimatePresence } from "framer-motion"
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
    <div className="bg-[#020617] min-h-screen text-white selection:bg-emerald-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/10 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full"
          />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Valuation & Easy Upgrades</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white leading-[1.1]">
              Exchange Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Vehicle</span>
            </h1>
            <p className="text-xl text-gray-400 text-balance max-w-2xl mx-auto leading-relaxed">
              Trade in your old vehicle for the best market value and upgrade to your dream ride seamlessly with our premium exchange program.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Split Layout Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Benefits Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white tracking-tight">Why Choose Our <span className="text-emerald-400">Exchange?</span></h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                <p className="text-gray-400 text-lg leading-relaxed">Experience a hassle-free exchange process with complete transparency and top-tier support.</p>
              </div>

              <div className="grid sm:grid-cols-1 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex gap-6 p-8 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-xl mb-2">{benefit.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Form Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group lg:sticky lg:top-32"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="mb-8 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Exchange Details</h3>
                    <p className="text-gray-500 text-sm">Tell us about your vehicle to get started</p>
                  </div>
                  <ExchangeVehicleForm onClose={() => { }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
