"use client"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Trash2, Repeat2, Car, ShoppingCart, X } from "lucide-react"
import { useRouter } from "next/navigation"
import SellVehicleForm from "./SellVehicleForm"
import ExchangeVehicleForm from "./ExchangeVehicleForm"
import BuyNewVehicleForm from "./BuyNewVehicleForm"

export default function ServicesSection() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const [showSellVehicleModal, setShowSellVehicleModal] = useState(false)
  const [showExchangeModal, setShowExchangeModal] = useState(false)
  const [showBuyNewModal, setShowBuyNewModal] = useState(false)

  const services = [
    {
      id: 1,
      title: "Sell Old Vehicle",
      description: "Get the best scrap value for your end-of-life vehicle.",
      borderColor: "border-t-4 border-t-green-500",
      accentColor: "text-green-600",
      bgGradient: "from-white to-gray-50",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      shadowColor: "shadow-green-500/20",
      hoverShadow: "hover:shadow-xl hover:shadow-green-500/10",
      icon: Trash2,
    },
    {
      id: 2,
      title: "Exchange",
      description: "Scrap your old vehicle and get benefits on a new purchase.",
      borderColor: "border-t-4 border-t-sky-500",
      accentColor: "text-sky-600",
      bgGradient: "from-white to-gray-50",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      shadowColor: "shadow-sky-500/20",
      hoverShadow: "hover:shadow-xl hover:shadow-sky-500/10",
      icon: Repeat2,
    },
    {
      id: 3,
      title: "Buy New",
      description: "Purchase a new vehicle with exclusive facility benefits.",
      borderColor: "border-t-4 border-t-orange-500",
      accentColor: "text-orange-600",
      bgGradient: "from-white to-gray-50",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      shadowColor: "shadow-orange-500/20",
      hoverShadow: "hover:shadow-xl hover:shadow-orange-500/10",
      icon: Car,
    },
  ]

  return (
    <section id="services" className="bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Explore <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Services</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the perfect service option for your needs
          </motion.p>
        </div>

        {/* Services Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                className={`group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl ${service.hoverShadow} transition-all duration-500`}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 10 }}
                transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 50 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Premium gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Top Border Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.id === 1 ? 'from-green-400 to-green-600' : service.id === 2 ? 'from-sky-400 to-sky-600' : 'from-orange-400 to-orange-600'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                {/* Animated accent light */}
                <motion.div
                  className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${service.id === 1 ? 'from-green-500/20' : service.id === 2 ? 'from-sky-500/20' : 'from-orange-500/20'} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Icon container */}
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 ${service.iconBg} rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300`}></div>
                    <motion.div
                      className={`relative w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center shadow-sm border border-white/50`}
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-black transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow group-hover:text-gray-800 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Button */}
                  <motion.button
                    onClick={() => {
                      if (service.id === 1) router.push("/services/sell-vehicle")
                      if (service.id === 2) setShowExchangeModal(true)
                      if (service.id === 3) router.push("/services/buy-vehicle")
                    }}
                    className={`mt-auto w-full py-3.5 rounded-xl font-bold bg-gray-50 text-gray-800 hover:text-white group-hover:shadow-lg transition-all duration-300 relative overflow-hidden group/btn`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.id === 1 ? 'from-green-500 to-green-600' : service.id === 2 ? 'from-sky-500 to-sky-600' : 'from-orange-500 to-orange-600'} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Sell Vehicle Modal */}
      <AnimatePresence>
        {showSellVehicleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSellVehicleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-6xl border border-orange-200"
            >
              <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-orange-100 z-10">
                <h2 className="text-2xl font-bold text-gray-900">Sell Your Old Vehicle</h2>
                <motion.button
                  onClick={() => setShowSellVehicleModal(false)}
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <SellVehicleForm onClose={() => setShowSellVehicleModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exchange Vehicle Modal */}
      <AnimatePresence>
        {showExchangeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExchangeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-6xl border border-orange-200"
            >
              <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-orange-100 z-10">
                <h2 className="text-2xl font-bold text-gray-900">Exchange Your Vehicle</h2>
                <motion.button
                  onClick={() => setShowExchangeModal(false)}
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <ExchangeVehicleForm onClose={() => setShowExchangeModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy New Vehicle Modal */}
      <AnimatePresence>
        {showBuyNewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBuyNewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-6xl border border-orange-200"
            >
              <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-orange-100 z-10">
                <h2 className="text-2xl font-bold text-gray-900">Buy New Vehicle</h2>
                <motion.button
                  onClick={() => setShowBuyNewModal(false)}
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <BuyNewVehicleForm onClose={() => setShowBuyNewModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
