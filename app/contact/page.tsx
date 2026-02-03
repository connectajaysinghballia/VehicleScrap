"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  Loader2,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-()]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative">
        {/* Full Page Background Image */}
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>

        <div className="relative z-10">
         
          <div className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center relative w-full max-w-md sm:max-w-lg"
            >
              {/* Success Animation Background */}
              <div className="absolute inset-0 -m-4 sm:-m-8">
                <div className="w-full h-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
              </div>

              <div className="relative z-10 bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg"
                >
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
                >
                  Message Sent Successfully!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed"
                >
                  Thank you for reaching out! We've received your message and will get back to you within 24 hours.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Send Another Message
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Full Page Background Image */}
      <div className="absolute inset-0">
        <img
          src="/bgcontact.jpg"
          alt="Contact Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-20">
       

        {/* Hero Section */}
        <div className="pt-16 sm:pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
              {/* Left Side - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 sm:space-y-8 order-2 lg:order-1"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center mb-3 sm:mb-4"
                  >
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400 mr-2 sm:mr-3" />
                    <span className="text-green-400 font-semibold text-base sm:text-lg">Get In Touch</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                  >
                    Let's Create Something{" "}
                    <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                      Amazing Together
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed"
                  >
                    Ready to transform your ideas into reality? Our expert team is here to help you every step of the
                    way.
                  </motion.p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Visit Us */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-black/70 backdrop-blur-xl border border-green-500/30 hover:border-green-400/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-500/20">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-green-400 font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                              VISIT US
                            </h3>
                            <p className="text-white font-medium leading-relaxed text-sm sm:text-base break-words">
                              STP1, 8th Floor, A-1/4 UPSIDC Complex, Lakhanpur, Kanpur, Uttar Pradesh 208024
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Opening Hours */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-black/70 backdrop-blur-xl border border-green-500/30 hover:border-green-400/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-500/20">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-green-400 font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                              OPENING HOURS
                            </h3>
                            <p className="text-white font-medium text-sm sm:text-base">Mon-Sat: 10:00am-06:30pm</p>
                            <p className="text-white font-medium text-sm sm:text-base">
                              Sunday: <span className="text-gray-400 font-semibold">Closed</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-black/70 backdrop-blur-xl border border-green-500/30 hover:border-green-400/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-500/20">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-green-400 font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                              EMAIL
                            </h3>
                            <p className="text-white font-medium text-sm sm:text-base break-all">
                              sales@riveyrainfotch.com
                            </p>
                            <p className="text-white font-medium text-sm sm:text-base break-all">
                              hr@riveyrainfotch.com
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-black/70 backdrop-blur-xl border border-green-500/30 hover:border-green-400/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-500/20">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-600 to-green-700 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-green-400 font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                              PHONE NO.
                            </h3>
                            <p className="text-white font-medium text-sm sm:text-base">+91-9919888269</p>
                            <p className="text-white font-medium text-sm sm:text-base">+91-9219934954</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Enhanced Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative order-1 lg:order-2"
              >
                {/* Form Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>

                <Card className="relative bg-black/70 backdrop-blur-xl border border-green-500/30 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 sm:p-6 lg:p-8 border-b border-green-500/20">
                    <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Send us a Message</h3>
                        <p className="text-gray-300 text-sm sm:text-base">We'd love to hear from you</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      {/* Name and Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="relative group"
                        >
                          <label className="block text-gray-300 text-sm font-semibold mb-2 sm:mb-3 flex items-center">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Full Name *
                          </label>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              className={`
                                bg-black/40 border-2 transition-all duration-300 text-white placeholder-gray-400 h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm sm:text-base
                                ${
                                  errors.name
                                    ? "border-red-500 focus:border-red-400"
                                    : focusedField === "name"
                                      ? "border-green-400 focus:border-green-300 shadow-lg shadow-green-500/25"
                                      : "border-green-500/30 hover:border-green-500/50 focus:border-green-400"
                                }
                              `}
                            />
                            {focusedField === "name" && (
                              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl -z-10 blur-sm"></div>
                            )}
                          </div>
                          {errors.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center mt-1 sm:mt-2 text-red-400 text-xs sm:text-sm"
                            >
                              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {errors.name}
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="relative group"
                        >
                          <label className="block text-gray-300 text-sm font-semibold mb-2 sm:mb-3 flex items-center">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Email Address *
                          </label>
                          <div className="relative">
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              className={`
                                bg-black/40 border-2 transition-all duration-300 text-white placeholder-gray-400 h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm sm:text-base
                                ${
                                  errors.email
                                    ? "border-red-500 focus:border-red-400"
                                    : focusedField === "email"
                                      ? "border-green-400 focus:border-green-300 shadow-lg shadow-green-500/25"
                                      : "border-green-500/30 hover:border-green-500/50 focus:border-green-400"
                                }
                              `}
                            />
                            {focusedField === "email" && (
                              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl -z-10 blur-sm"></div>
                            )}
                          </div>
                          {errors.email && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center mt-1 sm:mt-2 text-red-400 text-xs sm:text-sm"
                            >
                              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {errors.email}
                            </motion.div>
                          )}
                        </motion.div>
                      </div>

                      {/* Phone and Subject Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="relative group"
                        >
                          <label className="block text-gray-300 text-sm font-semibold mb-2 sm:mb-3 flex items-center">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              className={`
                                bg-black/40 border-2 transition-all duration-300 text-white placeholder-gray-400 h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm sm:text-base
                                ${
                                  errors.phone
                                    ? "border-red-500 focus:border-red-400"
                                    : focusedField === "phone"
                                      ? "border-green-400 focus:border-green-300 shadow-lg shadow-green-500/25"
                                      : "border-green-500/30 hover:border-green-500/50 focus:border-green-400"
                                }
                              `}
                            />
                            {focusedField === "phone" && (
                              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl -z-10 blur-sm"></div>
                            )}
                          </div>
                          {errors.phone && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center mt-1 sm:mt-2 text-red-400 text-xs sm:text-sm"
                            >
                              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {errors.phone}
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="relative group"
                        >
                          <label className="block text-gray-300 text-sm font-semibold mb-2 sm:mb-3 flex items-center">
                            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Subject *
                          </label>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="What's this about?"
                              value={formData.subject}
                              onChange={(e) => handleInputChange("subject", e.target.value)}
                              onFocus={() => setFocusedField("subject")}
                              onBlur={() => setFocusedField(null)}
                              className={`
                                bg-black/40 border-2 transition-all duration-300 text-white placeholder-gray-400 h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm sm:text-base
                                ${
                                  errors.subject
                                    ? "border-red-500 focus:border-red-400"
                                    : focusedField === "subject"
                                      ? "border-green-400 focus:border-green-300 shadow-lg shadow-green-500/25"
                                      : "border-green-500/30 hover:border-green-500/50 focus:border-green-400"
                                }
                              `}
                            />
                            {focusedField === "subject" && (
                              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl -z-10 blur-sm"></div>
                            )}
                          </div>
                          {errors.subject && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center mt-1 sm:mt-2 text-red-400 text-xs sm:text-sm"
                            >
                              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {errors.subject}
                            </motion.div>
                          )}
                        </motion.div>
                      </div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="relative group"
                      >
                        <label className="block text-gray-300 text-sm font-semibold mb-2 sm:mb-3 flex items-center">
                          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Your Message *
                        </label>
                        <div className="relative">
                          <Textarea
                            placeholder="Tell us about your project, ideas, or any questions you have..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                            className={`
                              bg-black/40 border-2 transition-all duration-300 text-white placeholder-gray-400 rounded-lg sm:rounded-xl resize-none text-sm sm:text-base
                              ${
                                errors.message
                                  ? "border-red-500 focus:border-red-400"
                                  : focusedField === "message"
                                    ? "border-green-400 focus:border-green-300 shadow-lg shadow-green-500/25"
                                    : "border-green-500/30 hover:border-green-500/50 focus:border-green-400"
                              }
                            `}
                          />
                          {focusedField === "message" && (
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl -z-10 blur-sm"></div>
                          )}
                        </div>
                        {errors.message && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center mt-1 sm:mt-2 text-red-400 text-xs sm:text-sm"
                          >
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {errors.message}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="pt-2 sm:pt-4"
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-[1.02] rounded-lg sm:rounded-xl border border-green-500/50 relative overflow-hidden group"
                        >
                          {/* Button Background Animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          <div className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                                <span>Sending your message...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                                <span>Send Message</span>
                              </>
                            )}
                          </div>
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 sm:py-16 lg:py-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
              >
                Find Us on{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  the Map
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
              >
                Visit our office for face-to-face consultation and collaboration. We're always excited to meet new
                clients!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Map Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>

              {/* Map Container */}
              <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-green-500/30">
                <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.4234567890123!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47d4ede73fd7%3A0x4187b9ccd2e42c7!2sUPSIDC%20Complex%2C%20Lakhanpur%2C%20Kanpur%2C%20Uttar%20Pradesh%20208024!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl sm:rounded-2xl"
                  ></iframe>

                  {/* Company Info Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6 bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 max-w-xs sm:max-w-sm border border-green-500/20"
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg mb-1">
                          Riveyra Infotech
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 break-words">
                          8th Floor, UPSIDC Ltd, STP1, Lakhanpur, Khyora, Kanpur, Uttar Pradesh 208024
                        </p>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2 font-medium">
                            5.0 (6 reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

       
      </div>
    </div>
  )
}
