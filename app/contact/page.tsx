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
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react"
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
    // Allowing wider range of formats or just basic check
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
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
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-12 sm:pt-32 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center w-full max-w-lg"
          >
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-blue-400 to-green-400"></div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>

              <p className="text-gray-600 mb-8 text-lg">
                Thank you for reaching out. We will get back to you shortly.
              </p>

              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Another Message
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10">

        {/* Intro Section */}
        <div className="pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">We'd love to hear from you</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have any questions or need assistance? Our team is ready to help you with all your vehicle scrapping needs.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Info Cards */}
              <div className="grid gap-6">

                {/* Address */}
                <Card className="border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-0 flex">
                    <div className="w-2 bg-orange-500"></div>
                    <div className="p-6 flex items-start gap-5">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Our Office</h3>
                        <p className="text-gray-600 leading-relaxed">
                          133/306, Transport Nagar, T. P. Nagar,<br />
                          Kanpur – 208023, Uttar Pradesh, India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-0 flex">
                    <div className="w-2 bg-blue-500"></div>
                    <div className="p-6 flex items-start gap-5">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                        <div className="space-y-1">
                          <p className="text-gray-600 font-medium">+91 90053 33587</p>
                          <p className="text-gray-600 font-medium">+91 94154 80154</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-0 flex">
                    <div className="w-2 bg-green-500"></div>
                    <div className="p-6 flex items-start gap-5">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 font-medium break-all">
                          service.desk@novalytixtechservices.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Map Embed */}
              <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-white bg-white h-64 sm:h-80 relative">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14285.632231362098!2d80.34440263690623!3d26.435773289053995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c475069279503%3A0xc392de483015694a!2sTransport%20Nagar%2C%20Kanpur%2C%20Uttar%20Pradesh%20208023!5e0!3m2!1sen!2sin!4v1709650000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white border-none shadow-2xl rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MessageSquare className="w-40 h-40 text-blue-600" />
                </div>

                <CardContent className="p-8 sm:p-10 relative z-10">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                    <p className="text-gray-500">Fill out the form below and we'll reply as soon as possible.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl ${errors.name ? "border-red-500" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}`}
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl ${errors.phone ? "border-red-500" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}`}
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl ${errors.email ? "border-red-500" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}`}
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl ${errors.subject ? "border-red-500" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}`}
                          placeholder="Inquiry about..."
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                        />
                      </div>
                      {errors.subject && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                      <Textarea
                        className={`bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl min-h-[120px] ${errors.message ? "border-red-500" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}`}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                      />
                      {errors.message && <p className="text-xs text-red-500 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  )
}
