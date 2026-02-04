"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Truck, BadgeCheck, Leaf, Coins } from "lucide-react"



export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "100% Secure Transaction",
      description: "Your data and payments are protected with enterprise-grade security.",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Instant Payment",
      description: "Get paid instantly via bank transfer or UPI upon vehicle pickup.",
      color: "green",
    },
    {
      icon: Truck,
      title: "Free Doorstep Pickup",
      description: "We pick up your vehicle from your location at no extra cost.",
      color: "sky",
    },
    {
      icon: BadgeCheck,
      title: "RTO Form Handling",
      description: "We handle all necessary RTO paperwork and documentation for you.",
      color: "indigo",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Recycling",
      description: "Your vehicle is recycled in an environmentally responsible manner.",
      color: "emerald",
    },
    {
      icon: Coins,
      title: "Best Market Price",
      description: "Get the highest scrap value for your vehicle with our algorithms.",
      color: "cyan",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string; hoverBg: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "group-hover:border-blue-200", hoverBg: "group-hover:bg-blue-100" },
      green: { bg: "bg-green-50", text: "text-green-600", border: "group-hover:border-green-200", hoverBg: "group-hover:bg-green-100" },
      sky: { bg: "bg-sky-50", text: "text-sky-600", border: "group-hover:border-sky-200", hoverBg: "group-hover:bg-sky-100" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "group-hover:border-indigo-200", hoverBg: "group-hover:bg-indigo-100" },
      emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "group-hover:border-emerald-200", hoverBg: "group-hover:bg-emerald-100" },
      cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "group-hover:border-cyan-200", hoverBg: "group-hover:bg-cyan-100" },
    }
    return colors[color] || colors.blue
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-bold uppercase tracking-wider mb-2 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Premium Service Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience a hassle-free car scrapping process with our top-notch services designed for your convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const colorClass = getColorClasses(feature.color)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 group ${colorClass.border} hover:shadow-xl`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${colorClass.bg} ${colorClass.hoverBg}`}>
                  <IconComponent className={`w-7 h-7 ${colorClass.text}`} />
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors group-hover:${colorClass.text}`}>
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
