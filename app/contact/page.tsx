"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  ExternalLink,
} from "lucide-react"

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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      {/* Navbar Placeholder */}
      <div className="h-20"></div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col lg:flex-row w-full max-w-6xl min-h-[600px]"
        >
          {/* Left Panel: Image */}
          <div className="lg:w-1/2 bg-[#FFF8F0] relative flex items-center justify-center p-8 overflow-hidden">
            {/* blob decoration behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-200/20 rounded-full blur-3xl"></div>

            {/* The Image */}
            <img
              src="/contact-image.png"
              alt="Customer Support"
              className="relative z-10 w-full h-auto max-w-[500px] object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-orange-100');
              }}
            />
            <div className="absolute bottom-8 left-0 w-full text-center px-6">
              <p className="text-orange-800/60 font-medium text-sm">We're here to help!</p>
            </div>
          </div>

          {/* Right Panel: Form + Small Info */}
          <div className="lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center relative">

            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-500">How can we help you today?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide ml-1">Full Name</label>
                  <Input
                    className={`h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${errors.name ? "border-red-500 bg-red-50" : ""}`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide ml-1">Phone</label>
                  <Input
                    className={`h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${errors.phone ? "border-red-500 bg-red-50" : ""}`}
                    placeholder="+91"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide ml-1">Email</label>
                <Input
                  className={`h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${errors.email ? "border-red-500 bg-red-50" : ""}`}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide ml-1">Subject</label>
                <Input
                  className={`h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${errors.subject ? "border-red-500 bg-red-50" : ""}`}
                  placeholder="Inquiry..."
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                />
                {errors.subject && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide ml-1">Message</label>
                <Textarea
                  className={`min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none ${errors.message ? "border-red-500 bg-red-50" : ""}`}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Small Contact Info Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                    <Phone className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Call</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">+91 90053 33587</p>
                </div>

                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <Mail className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5 truncate w-full px-2">service.desk@...</p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-100 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Visit</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5 flex items-center justify-center gap-1">
                        Map <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] w-[800px] max-h-[90vh] p-0 overflow-hidden rounded-2xl">
                    <DialogHeader className="p-4 sm:p-6 pb-0 absolute top-0 left-0 z-10 bg-white/90 backdrop-blur-sm w-full border-b border-gray-100/50">
                      <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        Visit Our Center
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-[500px]">
                      <iframe
                        title="Google Map Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14285.632231362098!2d80.34440263690623!3d26.435773289053995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c475069279503%3A0xc392de483015694a!2sTransport%20Nagar%2C%20Kanpur%2C%20Uttar%20Pradesh%20208023!5e0!3m2!1sen!2sin!4v1709650000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
