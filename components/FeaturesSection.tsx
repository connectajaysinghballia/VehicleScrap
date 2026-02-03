"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Truck, BadgeCheck, Leaf, Coins } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Secure Transaction",
    description: "Your data and payments are protected with enterprise-grade security.",
  },
  {
    icon: Zap,
    title: "Instant Payment",
    description: "Get paid instantly via bank transfer or UPI upon vehicle pickup.",
  },
  {
    icon: Truck,
    title: "Free Doorstep Pickup",
    description: "We pick up your vehicle from your location at no extra cost.",
  },
  {
    icon: BadgeCheck,
    title: "RTO Form Handling",
    description: "We handle all necessary RTO paperwork and documentation for you.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Recycling",
    description: "Your vehicle is recycled in an environmentally responsible manner.",
  },
  {
    icon: Coins,
    title: "Best Market Price",
    description: "Get the highest scrap value for your vehicle with our algorithms.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-orange-500 font-bold uppercase tracking-wider mb-2 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Premium Service Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience a hassle-free car scrapping process with our top-notch services designed for your convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                  <IconComponent className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
