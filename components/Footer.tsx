"use client"

import { motion } from "framer-motion"
import { Car, Truck, Bike, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Footer() {
  // Generate random positions and delays for the raining icons
  // Reduced quantity (20 -> 12), Increased size (20-40 -> 60-100)
  const [rainIcons, setRainIcons] = useState<{ id: number; Icon: any; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    setRainIcons(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      Icon: i % 3 === 0 ? Car : i % 3 === 1 ? Truck : Bike,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 10,
      size: 60 + Math.random() * 40,
    })));
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-white to-sky-50 text-gray-800 overflow-hidden pt-20 pb-10 border-t border-orange-100">
      {/* Raining Icons Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        {rainIcons.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: -120, x: item.left, opacity: 0 }}
            animate={{
              y: ["-10%", "60%"], // Stop around middle (60%)
              opacity: [0, 1, 0] // Fade in then out
            }}
            transition={{
              duration: item.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: item.delay,
              ease: "linear",
            }}
            className="absolute text-gray-800"
            style={{ left: item.left }}
          >
            <item.Icon size={item.size} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-orange-600 tracking-tight">
              AutoScrap<span className="text-sky-600">.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Your trusted partner for responsible vehicle recycling. We turn your old vehicles into cash while protecting the environment.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-600 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-gray-900 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Sell Your Car", href: "/services/sell-vehicle" },
                { label: "Buy Used Parts", href: "/services/buy-vehicle" },
                { label: "Exchange Vehicle", href: "/services/exchange-vehicle" },
                { label: "Instant Valuation", href: "/quote" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-600 font-medium hover:text-orange-600 transition-all flex items-center gap-2 group w-fit">
                    <span className="w-2 h-2 rounded-full bg-orange-200 group-hover:bg-orange-600 group-hover:scale-125 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-gray-900 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact Support", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-600 font-medium hover:text-sky-600 transition-all flex items-center gap-2 group w-fit">
                    <span className="w-2 h-2 rounded-full bg-sky-200 group-hover:bg-sky-600 group-hover:scale-125 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-gray-900 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Visit Us</p>
                  <p className="text-gray-600 text-sm">123 Recycling Hub, Industrial Area, Noida, UP - 201301</p>
                </div>
              </li>
              <li className="flex items-center gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-sky-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600 text-sm font-medium">+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-center gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Email Us</p>
                  <p className="text-gray-600 text-sm">support@autoscrap.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} AutoScrap. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
            Made with <span className="text-red-500 animate-pulse">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  )
}
