"use client"

import Navbar from "@/components/Navbar"
import SellVehicleForm from "@/components/SellVehicleForm"
import { motion } from "framer-motion"

import Link from "next/link"

export default function SellVehiclePage() {


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


    </div>
  )
}
