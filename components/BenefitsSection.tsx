"use client"

import { motion } from "framer-motion"
import { Award, DollarSign, FileText, Zap } from "lucide-react"

const benefits = [
  {
    icon: Award,
    title: "Certificate of Deposit",
    description: "Secure and reliable investment options with guaranteed returns",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: DollarSign,
    title: "25% Rebate Tax",
    description: "Enjoy significant tax savings with our exclusive rebate scheme",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FileText,
    title: "Registration Tax Waiver",
    description: "Complete exemption from registration taxes on qualifying purchases",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "Tax Deduction on EV",
    description: "Maximum tax benefits for electric vehicle purchases and investments",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/10",
  },
]

export default function BenefitsSection() {
  return (
    <section className="relative bg-black overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Exclusive <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Benefits</span> for You
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Unlock powerful advantages designed to maximize your financial growth and savings
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Card Background */}
                <div className={`absolute inset-0 ${benefit.bgColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100`}></div>

                {/* Card */}
                <div className="relative h-full bg-black border border-green-500/20 rounded-2xl p-8 hover:border-green-500/40 transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} ${benefit.bgColor} flex items-center justify-center mb-6`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{benefit.description}</p>

                    {/* Bottom accent */}
                    <div className="h-1 w-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full group-hover:w-full transition-all duration-300"></div>
                  </div>

                  {/* Border animation */}
                  <div className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
