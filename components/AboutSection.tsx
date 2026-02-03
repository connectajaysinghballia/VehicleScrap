"use client"

import { motion } from "framer-motion"
import { Calendar, Users, CheckCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  const stats = [
    { icon: Calendar, value: "8+", label: "Years Experience" },
    { icon: Users, value: "130+", label: "Team" },
    { icon: CheckCircle, value: "700+", label: "Project Done" },
    { icon: MapPin, value: "3+", label: "Global Offices" },
  ]

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const missionText =
    "The company was started to meet the growing demand for digital transformation in the Indian business world. Riveyra helps companies improve their processes through smart and innovative solutions. It acts as a strong technical partner for long-term growth."

  const visionText =
    "Apart from software development, Riveyra offers services like Digital Marketing, SEO, PHP Development, Website Development, and Reputation Management. Its wide range of services supports clients from various industries. The company focuses on quality, performance, and client satisfaction."

  const missionWords = missionText.split(" ")
  const visionWords = visionText.split(" ")

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-emerald-900/10"></div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="text-center mb-16 scroll-animate">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Us</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We are a leading design company, transforming the way businesses create and innovate. With cutting-edge
            technology and creative expertise, we help you bring your vision to life.
          </motion.p>

          {/* Company Description */}
          <motion.p
            className="text-gray-400 text-base max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Riveyra Infotech is a well-known software development company based in Kanpur with over 5 years of
            experience. It is trusted for delivering reliable and efficient services to clients across India.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="scroll-animate"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Mission Heading */}
            <motion.h3
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h3>

            {/* Animated Mission Text - Word by Word */}
            <motion.div
              className="text-gray-300 text-lg leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {missionWords.map((word, i) => (
                <motion.span key={i} custom={i} variants={wordVariants} className="inline-block mr-1">
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated Vision Text - Smooth Fade In */}
            <motion.div
              className="text-gray-300 text-lg leading-relaxed mb-8"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {visionWords.map((word, i) => (
                <motion.span key={i} custom={i} variants={wordVariants} className="inline-block mr-1">
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated Button */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
  href="https://youtu.be/lXt6ua6vig8?si=R8y6zH_JNrtManrM"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300">
    Watch Our Introduction
  </Button>
</a>

            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 text-center hover:bg-gray-800/50 transition-all duration-500 scroll-animate group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <stat.icon className="w-6 h-6 text-black" />
                </motion.div>

                {/* Animated Counter */}
                <motion.div
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>

                {/* Animated Label */}
                <motion.div
                  className="text-gray-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.7 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
