"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BuyNewVehicleForm from "@/components/BuyNewVehicleForm"
import { motion } from "framer-motion"
import { Gift, DollarSign, Zap, Clock } from "lucide-react"

export default function BuyVehiclePage() {
  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description: "Get special pricing and offers for EcoScrap registered buyers",
    },
    {
      icon: DollarSign,
      title: "Flexible Financing",
      description: "Easy EMI and loan options available with quick approval",
    },
    {
      icon: Zap,
      title: "Quick Processing",
      description: "Fast vehicle delivery with complete documentation",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dedicated customer support for all your queries",
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
              Buy Your <span className="text-orange-600">Next Vehicle</span>
            </h1>
            <p className="text-xl text-gray-600 text-balance">
              Explore our collection of quality vehicles with best prices and flexible financing options.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form & Benefits Side by Side */}
      <section className="py-20 px-4 bg-gray-50">
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
                <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Benefits</h2>
                <p className="text-gray-600 text-lg">Why choose us for your next vehicle purchase</p>
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
              <BuyNewVehicleForm onClose={() => { }} />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
