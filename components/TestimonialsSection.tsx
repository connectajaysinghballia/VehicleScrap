"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, Tech Startup",
    content: "Riveya InfoTech delivered an exceptional Android app that transformed our business operations. Their technical expertise and attention to detail were outstanding.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, E-commerce",
    content: "The team's professionalism and dedication to excellence made all the difference. They understood our vision and brought it to life beautifully.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, SaaS Company",
    content: "Working with Riveya InfoTech was a game-changer. Their innovative solutions and responsive support exceeded all our expectations.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trusted by leading companies worldwide to deliver exceptional results
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-lg p-8 hover:border-green-500/40 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-green-400 text-green-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border border-green-500/30"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
