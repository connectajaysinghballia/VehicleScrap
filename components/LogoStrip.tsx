"use client"

import { motion } from "framer-motion"

export default function LogoStrip() {
  const benefits = [
    { title: "Certificate of Deposit", icon: "📋" },
    { title: "25% Rebate Tax", icon: "💰" },
    { title: "Registration Tax Waiver", icon: "✓" },
    { title: "Tax Deduction on EV", icon: "🔋" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative h-48 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-green-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-green-500/20">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                  {benefit.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
