"use client"

import Navbar from "@/components/Navbar"
import SellVehicleForm from "@/components/SellVehicleForm"
import { motion } from "framer-motion"
import Image from "next/image"
import AuthGuard from "@/components/AuthGuard"

export default function SellVehiclePage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <AuthGuard />
      <Navbar />

      {/* Background effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 pt-44 pb-16 relative z-10">

        {/* Header Section */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-12 text-center min-h-[350px] flex flex-col justify-center px-4 border border-slate-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/selloldvehicle/sellheadingbg.webp"
              alt="Sell Vehicle Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#0E192D]/90 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg tracking-tight"
            >
              Sell Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Old Vehicle</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Get the best price for your vehicle with EcoScrap India. Fast, secure, and hassle-free process.
            </motion.p>
          </div>
        </motion.div>

        {/* Form Section */}
        <div className="max-w-7xl mx-auto">
          <SellVehicleForm onClose={() => { }} />
        </div>
      </div>
    </div>
  )
}

