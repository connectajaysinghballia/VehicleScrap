"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function ChatWidget() {
  const [showMessage, setShowMessage] = useState(false)
  const [hasShownMessage, setHasShownMessage] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show message only once after 5 seconds
    const timeout = setTimeout(() => {
      if (!hasShownMessage) {
        setShowMessage(true)
        setHasShownMessage(true)
        // Hide after 2 seconds
        const hideTimeout = setTimeout(() => {
          setShowMessage(false)
        }, 2000)
        return () => clearTimeout(hideTimeout)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [hasShownMessage])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Message Bubble - appears only once */}
      <AnimatePresence>
        {showMessage && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium"
          >
            Want help?
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/30 rounded-lg shadow-2xl w-80 p-5 backdrop-blur-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h3 className="text-lg font-bold text-white mb-1">Need Help?</h3>
            <p className="text-gray-400 text-sm mb-5">Get instant assistance with your vehicle inquiry</p>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                  <p className="text-white text-sm font-medium">+91 80090 60158</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p className="text-white text-sm font-medium">info@ecoscrapindia.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                  <p className="text-white text-sm font-medium">123 Business Street, Mumbai</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-800/50 rounded-lg p-3 mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Hours</p>
              <p className="text-white text-sm font-medium">Mon-Sat: 9:00 AM - 8:00 PM</p>
            </div>

            {/* Contact Us Button */}
            <Link href="/contact" className="block">
              <motion.button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Icon Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  )
}
