"use client"

import type React from "react"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import {
  ExternalLink,
  TrendingUp,
  Eye,
  Code,
  Zap,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  FileText,
  Users,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isAutoSliding, setIsAutoSliding] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const userInteractionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const categories = [
    { id: "all", name: "All Projects", icon: Eye },
    { id: "web", name: "Web Development", icon: Code },
    { id: "healthcare", name: "Healthcare", icon: Zap },
    { id: "app", name: "App Development", icon: Smartphone },
    { id: "erp", name: "Enterprise Solutions", icon: TrendingUp },
  ]

  const projects = [
    {
      id: 1,
      title: "DGFASLI - Riveyra Infotech Website Redesign",
      category: "web",
      images: [
        "images/projectimg/pro_1.1.jpg",
        "images/projectimg/pro_1.2.jpg",
        "images/projectimg/pro_1.3.jpg",
      ],
      description:
        "Riveyra Infotech, a web development agency, has redesigned their website. Our goal was to create a user-friendly and responsive online platform to enhance the organization's online presence, ensuring accessibility on all devices, including mobile phones and laptops, for round-the-clock operations.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      duration: "3 months",
      team: "5 members",
      results: [
        { metric: "+75%", label: "Traffic" },
        { metric: "+45%", label: "Conversion" },
        { metric: "24/7", label: "Operations" },
      ],
      testimonial:
        "Very much impressed by the website's seamless responsiveness and user-friendly design. A top-notch online experience!",
    },
    {
      id: 2,
      title: "SDRF File Management System",
      category: "erp",
      images: [
        "images/projectimg/pro_2.1.png",
        "images/projectimg/pro_2.2.png",
        "images/projectimg/pro_2.3.png",
      ],
      description:
        "Don't hassle with paper records instead experience the convenience of our state-of-the-art File Management System and ERPs. Retrieve all your records effortlessly with a single click, while enjoying smooth operations and robust security measures for a seamless and secure data management experience.",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap"],
      duration: "4 months",
      team: "7 members",
      results: [
        { metric: "100%", label: "Digital Records" },
        { metric: "1-Click", label: "Retrieval" },
        { metric: "Enterprise", label: "Security" },
      ],
      testimonial:
        "Exceptional experience with the SDRF website! The user-friendly interface, coupled with comprehensive and up-to-date information, made navigating and researching a breeze",
    },
    {
      id: 3,
      title: "NIEDO - Innovative Website Solutions",
      category: "web",
      images: [
        "images/projectimg/pro_3.1.png",
        "images/projectimg/pro_3.2.png",
        "images/projectimg/pro_3.3.png",
      ],
      description:
        "Transforming User Engagement Round-the-Clock through Innovative Website Solutions. Our developed websites are renowned for their reliability, user-friendliness, and seamless responsiveness across all devices.",
      technologies: ["React", "Express.js", "PostgreSQL", "CSS3"],
      duration: "5 months",
      team: "6 members",
      results: [
        { metric: "24/7", label: "Engagement" },
        { metric: "99.9%", label: "Reliability" },
        { metric: "100%", label: "Responsive" },
      ],
      testimonial:
        "This website stands out with its enhanced structure, fostering a seamless user experience. The UI/UX not only captivates but also makes navigating much easier. They are setting a new standard for excellence in website development.",
    },
    {
      id: 4,
      title: "Skin Miracle Kanpur - Doctor Appointment Platform",
      category: "healthcare",
      images: [
        "images/projectimg/pro_4.1.png",
        "images/projectimg/pro_4.2.png",
        "images/projectimg/pro_4.3.png",
      ],
      description:
        "Revolutionize how patients discover and book appointments with doctors. Explore nearby clinics effortlessly, and say goodbye to the hassle of early visits for appointments. Discover curated clinics, read reviews, and make informed choices. Our user-friendly website facilitates seamless appointment booking.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      duration: "5 months",
      team: "8 members",
      results: [
        { metric: "10K+", label: "Bookings" },
        { metric: "500+", label: "Clinics" },
        { metric: "4.8/5", label: "Rating" },
      ],
      testimonial:
        "It is really easy to use! I had no trouble booking an appointment and talking to the doctor. Not all websites are this easy, so it made everything simple and quick.",
    },
    {
      id: 5,
      title: "Mangalam Studio - Photography Booking Platform",
      category: "web",
      images: [
        "images/projectimg/pro_5.1.jpg",
        "images/projectimg/pro_5.2.jpg",
        "images/projectimg/pro_5.3.jpg",
      ],
      description:
        "Booking, reviewing testimonials and reaching out to book a photographer for either of your need be it your wedding, birthday or anniversary has never been so easy. But simplify this tedious process through our user-friendly website.",
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
      duration: "4 months",
      team: "6 members",
      results: [
        { metric: "1000+", label: "Bookings" },
        { metric: "50+", label: "Photographers" },
        { metric: "4.9/5", label: "Reviews" },
      ],
      testimonial:
        "I really like using this website to book photographers! It's so simple to find one for my wedding, birthday, or anniversary. Being able to read reviews and reach out through testimonials is a great feature. I highly recommend it!",
    },
    {
      id: 6,
      title: "Yashraj College of Nursing Website And ERP",
      category: "web",
      images: [
        "images/projectimg/pro_6.1.png",
        "images/projectimg/pro_6.2.png",
        "images/projectimg/pro_6.3.png",
      ],
      description:
        "We designed a modern, responsive website for Yashraj College to effectively showcase their Nursing and Pharmacy programs. The platform ensures easy access to information for students, parents, and aspiring professionals.",
      technologies: ["Laravel", "Bootstrap 5", "MySQL", "HTML5", "CSS3", "JavaScript"],
      duration: "4 months",
      team: "6 members",
      results: [
        { metric: "2000+", label: "Students" },
        { metric: "95%", label: "Satisfaction" },
        { metric: "+70%", label: "Enrollment" },
      ],
      testimonial: "Excellent platform for accessing college information and managing academic processes efficiently.",
    },
    {
      id: 7,
      title: "Chhattisgarh Samvad - Outdoor Media Monitoring",
      category: "app",
      images: [
        "images/projectimg/pro_7.1.png",
        "images/projectimg/pro_7.2.png",
        "images/projectimg/pro_7.3.png",
      ],
      description:
        "We developed a user-friendly Outdoor Media Monitoring App to efficiently manage and track advertising campaigns. The platform enables real-time hoarding ID management, image capturing, and campaign verification, ensuring complete control and transparency.",
      technologies: ["Laravel", "Bootstrap 5", "MySQL", "HTML5", "CSS3", "JavaScript"],
      duration: "5 months",
      team: "7 members",
      results: [
        { metric: "Real-time", label: "Monitoring" },
        { metric: "100%", label: "Transparency" },
        { metric: "Efficient", label: "Management" },
      ],
      testimonial: "Outstanding solution for outdoor media campaign management with excellent tracking capabilities.",
    },
    {
      id: 8,
      title: "Directorate General of Human Resource Development",
      category: "web",
      images: [
        "images/projectimg/pro_8.1.png",
        "images/projectimg/pro_8.2.png",
        "images/projectimg/pro_8.3.png",
      ],
      description:
        "We designed an informative and structured website for the Directorate of Human Resource Development, CBIC. The platform highlights their role in workforce development and infrastructure growth, supporting CBIC's mission of efficient tax administration and optimized revenue collection.",
      technologies: ["Laravel", "Bootstrap 5", "MySQL", "HTML5", "CSS3", "JavaScript"],
      duration: "5 months",
      team: "8 members",
      results: [
        { metric: "Government", label: "Grade Portal" },
        { metric: "99.8%", label: "Uptime" },
        { metric: "+65%", label: "User Engagement" },
      ],
      testimonial:
        "Professional and comprehensive platform that effectively serves the government's HR development needs.",
    },
    {
      id: 9,
      title: "Findure - Your Gateway to Local Service Discovery",
      category: "app",
      images: [
        "images/projectimg/pro_9.1.jgp",
        "images/projectimg/pro_9.2.jpg",
        "images/projectimg/pro_9.3.jpg",
      ],
      description:
        "Smart and scalable location-based service discovery app built using the MERN Stack. Search begins from a 3km radius and expands to 15km if needed. Covers everything from restaurants, salons, pest control, AC repair to hospitals and emergency services with real-time geolocation filtering.",
      technologies: ["React Native", "Node.js", "MongoDB", "Express.js"],
      duration: "6 months",
      team: "8 members",
      results: [
        { metric: "15km", label: "Search Radius" },
        { metric: "50+", label: "Categories" },
        { metric: "Real-time", label: "Geolocation" },
      ],
      testimonial:
        "Innovative solution for local service discovery with excellent geolocation features and comprehensive service coverage.",
    },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  // Auto slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current)
      }

      if (isAutoSliding && !userInteracted) {
        autoSlideTimerRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % filteredProjects.length)
          setAnimationComplete(false)
        }, 15000) // Change slide every 15 seconds
      }
    }

    startAutoSlide()

    // Cleanup on unmount
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current)
      }
      if (userInteractionTimerRef.current) {
        clearTimeout(userInteractionTimerRef.current)
      }
    }
  }, [isAutoSliding, userInteracted, filteredProjects.length])

  // Image auto-slide functionality
  useEffect(() => {
    const imageSlideTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3) // Cycle through 3 images
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(imageSlideTimer)
  }, [])

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentSlide])

  // Reset user interaction after a period of inactivity
  const resetUserInteraction = () => {
    if (userInteractionTimerRef.current) {
      clearTimeout(userInteractionTimerRef.current)
    }

    setUserInteracted(true)

    userInteractionTimerRef.current = setTimeout(() => {
      setUserInteracted(false)
    }, 10000) // Resume auto-sliding after 10 seconds of inactivity
  }

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding)
  }

  const nextSlide = () => {
    resetUserInteraction()
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length)
    setAnimationComplete(false)
  }

  const prevSlide = (e?: React.MouseEvent) => {
    resetUserInteraction()
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
    setAnimationComplete(false)
  }

  // Reset slide when category changes
  const handleCategoryChange = (categoryId: string) => {
    resetUserInteraction()
    setSelectedCategory(categoryId)
    setCurrentSlide(0)
    setAnimationComplete(false)
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    resetUserInteraction()
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const dragEnd = e.clientX
    const dragDistance = dragStart - dragEnd
    const threshold = 50

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    resetUserInteraction()
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)

    const dragEnd = e.changedTouches[0].clientX
    const dragDistance = dragStart - dragEnd
    const threshold = 50

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetUserInteraction()
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="portfolio" className="bg-black py-8 md:py-16 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background Effects */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-green-500/8 to-emerald-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-gradient-to-r from-emerald-500/8 to-green-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-full blur-2xl"></div>

        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-32 w-3 h-3 bg-emerald-400/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-green-500/50 rounded-full animate-pulse"></div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our latest projects and see how we've helped businesses transform their digital presence.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`group relative px-3 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg shadow-green-500/25"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-green-500/20 hover:border-green-400/40"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative flex items-center space-x-2">
                <category.icon className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(" ")[0]}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Project Cards Slider - Enhanced Animations */}
          <div
            className="relative h-[800px] sm:h-[850px] md:h-[900px] lg:h-[670px] overflow-hidden cursor-grab active:cursor-grabbing"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentSlide}`}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  resetUserInteraction()
                  const swipe = Math.abs(offset.x) * velocity.x
                  if (swipe < -10000) {
                    nextSlide()
                  } else if (swipe > 10000) {
                    prevSlide()
                  }
                }}
                onAnimationComplete={() => setAnimationComplete(true)}
              >
                {/* Enhanced Portfolio Card Design with Advanced Animations */}
                <motion.div className="relative w-full max-w-5xl h-[750px] sm:h-[800px] md:h-[850px] lg:h-[620px]">
                  {/* Main Card Container */}
                  <div className="w-full h-full bg-black rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border-2 border-green-500/30 relative overflow-hidden">
                    {/* Enhanced Green Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-60"></div>

                    {/* Animated Background Particles */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-green-400/40 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-emerald-400/50 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />

                    {/* Auto-slide progress line - Full width across card */}
                    {isAutoSliding && !userInteracted && (
                      <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/30 z-20 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 shadow-lg shadow-green-400/50"
                          initial={{ x: "-100%", width: "100%" }}
                          animate={{ x: "0%" }}
                          transition={{
                            duration: 15,
                            ease: "linear",
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                        {/* Glowing sweep effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 13,
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Card Content */}
                    <div className="flex flex-col h-full relative z-10">
                      {/* Project Title - Enhanced Center to Top Animation */}
                      <motion.div className="relative mb-3 sm:mb-4 md:mb-6 overflow-hidden">
                        <motion.h3
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center border-b-2 border-green-500/30 pb-2 sm:pb-3 md:pb-4"
                          initial={{
                            opacity: 0,
                            scale: 1.8,
                            y: 150,
                            x: 0,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 100,
                            textShadow: "0 0 40px rgba(34, 197, 94, 1)",
                            filter: "blur(3px)",
                            fontSize: "1.5rem",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            x: 0,
                            position: "static",
                            transform: "none",
                            textShadow: "0 0 0px rgba(34, 197, 94, 0)",
                            filter: "blur(0px)",
                            fontSize: "inherit",
                          }}
                          transition={{
                            duration: 2.5,
                            delay: 0.5,
                            ease: [0.23, 1, 0.32, 1],
                            type: "spring",
                            stiffness: 50,
                            damping: 20,
                          }}
                        >
                          {filteredProjects[currentSlide]?.title}
                        </motion.h3>
                      </motion.div>

                      {/* Top Info Row - Project Type, Members, Time */}
                      <motion.div
                        className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-between items-center mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 2.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        {/* Left Side - Project Type */}
                        <motion.div
                          className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-900/80 border border-green-500/30 rounded-lg text-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
                          initial={{ opacity: 0, x: -30, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 0.5, delay: 2.9, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.5)" }}
                        >
                          <div className="text-xs text-gray-400 mb-1">Project Type</div>
                          <div className="text-xs sm:text-sm font-semibold text-green-400">
                            {categories.find((cat) => cat.id === filteredProjects[currentSlide]?.category)?.name}
                          </div>
                        </motion.div>

                        {/* Right Side - Members and Time */}
                        <div className="flex gap-2 sm:gap-3 md:gap-4">
                          <motion.div
                            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-900/80 border border-green-500/30 rounded-lg text-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex items-center gap-1 sm:gap-2"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 3.0, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.5)" }}
                          >
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                            <div>
                              <div className="text-xs text-gray-400">Members</div>
                              <div className="text-xs sm:text-sm font-semibold text-white">
                                {filteredProjects[currentSlide]?.team}
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-900/80 border border-green-500/30 rounded-lg text-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex items-center gap-1 sm:gap-2"
                            initial={{ opacity: 0, x: 30, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 3.1, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.5)" }}
                          >
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                            <div>
                              <div className="text-xs text-gray-400">Time Taken</div>
                              <div className="text-xs sm:text-sm font-semibold text-white">
                                {filteredProjects[currentSlide]?.duration}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Main Content Area - Image and Description Side by Side */}
                      <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
                        {/* Project Image - Enhanced with Image Slider */}
                        <motion.div
                          className="w-full lg:w-2/3 h-[200px] sm:h-[220px] md:h-[240px] lg:h-[300px]"
                          initial={{
                            opacity: 0,
                            x: 300,
                            rotate: 180,
                            scale: 0.5,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            rotate: 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: 1.2,
                            delay: 1.0,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                          }}
                        >
                          <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-green-500/30 bg-gray-900/50 relative group">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0"
                              animate={{ opacity: [0, 0.3, 0] }}
                              transition={{
                                duration: 2,
                                delay: 1.5,
                                ease: "easeInOut",
                              }}
                            />

                            {/* Image Slider Container */}
                            <div className="relative w-full h-full overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key={`${filteredProjects[currentSlide]?.id}-${currentImageIndex}`}
                                  src={
                                    filteredProjects[currentSlide]?.images?.[currentImageIndex] || "/placeholder.svg"
                                  }
                                  alt={`${filteredProjects[currentSlide]?.title} - Image ${currentImageIndex + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  initial={{ opacity: 0, x: 100 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -100 }}
                                  transition={{ duration: 0.5 }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg?height=300&width=500"
                                  }}
                                />
                              </AnimatePresence>

                              {/* Image Navigation Dots - Hidden on mobile */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 hidden md:flex">
                                {filteredProjects[currentSlide]?.images?.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                      index === currentImageIndex
                                        ? "bg-green-400 w-3 sm:w-4"
                                        : "bg-white/50 hover:bg-white/70"
                                    }`}
                                  />
                                ))}
                              </div>

                              {/* Image Counter */}
                              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                {currentImageIndex + 1} / {filteredProjects[currentSlide]?.images?.length || 1}
                              </div>
                            </div>

                            {/* Enhanced Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-4">
                              <motion.div
                                className="text-white"
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="text-xs sm:text-sm font-medium">Project Preview</p>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Project Description - Right Side */}
                        <motion.div
                          className="w-full lg:w-1/3 h-[200px] sm:h-[220px] md:h-[240px] lg:h-[300px]"
                          initial={{ opacity: 0, x: 50, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 1.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          <motion.div
                            className="w-full h-full p-3 sm:p-4 md:p-6 bg-gray-900/50 border border-green-500/30 rounded-2xl backdrop-blur-sm relative overflow-hidden"
                            whileHover={{
                              borderColor: "rgba(34, 197, 94, 0.5)",
                              boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-green-400 mb-2 sm:mb-3 md:mb-4 relative z-10">
                              Project Description
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed overflow-y-auto h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] md:h-[calc(100%-3rem)] relative z-10">
                              {filteredProjects[currentSlide]?.description}
                            </p>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Text Content - Upward Animation from Bottom */}
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        {/* Bottom Section - Tech Stack and Button */}
                        <motion.div
                          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 2.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                            {filteredProjects[currentSlide]?.technologies.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-gray-900/80 text-gray-300 text-xs font-medium rounded-full border border-green-500/30 hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.6, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 2.5 + idx * 0.1,
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                }}
                                whileHover={{
                                  y: -3,
                                  scale: 1.1,
                                  borderColor: "rgba(34, 197, 94, 0.7)",
                                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2)",
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>

                          {/* Case Study Button - Hidden on mobile */}
                          <motion.button
                            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs sm:text-sm font-semibold rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-500/25 whitespace-nowrap relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 2.8,
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                            whileHover={{
                              y: -3,
                              scale: 1.05,
                              boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
                            <span className="relative z-10">View Case Study</span>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-between mt-6 md:mt-8">
            <motion.button
              onClick={prevSlide}
              className="p-2 md:p-3 rounded-full bg-gray-900/60 border border-green-500/30 hover:bg-gray-800/60 transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-green-400 relative z-10" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="p-2 md:p-3 rounded-full bg-gray-900/60 border border-green-500/30 hover:bg-gray-800/60 transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-green-400 relative z-10" />
            </motion.button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4 md:mt-6">
            {filteredProjects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  resetUserInteraction()
                  setCurrentSlide(index)
                }}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  index === currentSlide ? "w-6 md:w-8 h-2 md:h-3 bg-green-400" : "w-2 md:w-3 h-2 md:h-3 bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.05 }}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 rounded-full shadow-sm shadow-green-400/50"
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{
                      duration: 15,
                      ease: "linear",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA Section - Hidden on mobile */}
       
      </div>
    </section>
  )
}
