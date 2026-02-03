"use client"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, ChevronDown, Sparkles, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link" // Import Link for navigation
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const { data: session } = useSession()

  const navItems = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "/about", hasDropdown: false },
    { name: "Services", href: "#", hasDropdown: true },
    { name: "Resources", href: "#", hasDropdown: true },
    { name: "Contact Us", href: "/contact", hasDropdown: false },
  ]

  const servicesDropdown = [
    { name: "Sell Old Vehicle", href: "/services/sell-vehicle" },
    { name: "Exchange Vehicle", href: "/services/exchange-vehicle" },
    { name: "Buy New Vehicle", href: "/services/buy-vehicle" },
  ]

  const resourcesDropdown = [
    { name: "Blogs", href: "/blogs" },
    { name: "Guides", href: "/guides" },
  ]

  useEffect(() => {
    // Faster initial navbar animation
    gsap.fromTo(".navbar", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: "power3.out" })

    // Logo icon animation with scale and rotation
    gsap.fromTo(
      ".logo-icon",
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.7, delay: 0.4, ease: "back.out(1.7)" },
    )

    // Logo text animation
    gsap.fromTo(
      ".logo-text",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.6, ease: "power3.out" },
    )

    // Faster nav items stagger animation
    gsap.fromTo(
      ".nav-item",
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.4,
        ease: "power2.out",
      },
    )

    // Faster CTA button animation
    gsap.fromTo(
      ".cta-button",
      { scale: 0, rotation: 360 },
      { scale: 1, rotation: 0, duration: 0.5, delay: 0.6, ease: "elastic.out(1, 0.5)" },
    )

    // Scroll-based navbar background and visibility
    let lastScrollY = 0
    ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      onUpdate: (self) => {
        const currentScrollY = self.scroll()

        // Handle navbar background
        if (self.direction === 1) {
          setIsScrolled(true)
        } else if (self.progress < 0.1) {
          setIsScrolled(false)
        }

        // Handle navbar visibility based on scroll direction
        if (currentScrollY > 100) {
          // Only hide after scrolling past 100px
          if (self.direction === 1 && currentScrollY > lastScrollY + 10) {
            // Scrolling down - hide navbar
            gsap.to(".navbar", {
              y: -100,
              duration: 0.3,
              ease: "power2.out",
            })
          } else if (self.direction === -1 && currentScrollY < lastScrollY - 10) {
            // Scrolling up - show navbar
            gsap.to(".navbar", {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        } else {
          // Always show navbar when near top
          gsap.to(".navbar", {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        // Only update lastScrollY if there's significant movement
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          lastScrollY = currentScrollY
        }
      },
    })

    // Faster floating animation for logo
    gsap.to(".logo-icon", {
      y: -3,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    if (href === "/") {
      window.location.href = "/"
    } else if (href.startsWith("#")) {
      if (window.location.pathname === "/") {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        window.location.href = "/" + href
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-orange-500/5"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="logo flex items-center cursor-pointer space-x-2" onClick={() => handleNavClick("/")}>
            <motion.div
              className="logo-icon"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Image
                src="/logo.png"
                alt="ScrapCenter India Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </motion.div>
            <div className="hidden sm:flex flex-col logo-text">
              <span className="text-sm md:text-base font-bold">
                <span className="text-gray-900">ScrapCenter</span>
                <span className="text-orange-500">india</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className="nav-item relative text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium flex items-center gap-1"
                  onClick={() => !item.hasDropdown && handleNavClick(item.href)}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-sky-400 group-hover:w-full transition-all duration-200"></div>
                </button>

                {/* Services Dropdown Menu */}
                {item.name === "Services" && item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-lg border border-orange-200 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]"
                  >
                    {servicesDropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="block w-full px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 text-left font-medium whitespace-nowrap"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Resources Dropdown Menu */}
                {item.name === "Resources" && item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-lg border border-orange-200 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]"
                  >
                    {resourcesDropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className="block w-full px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 text-left font-medium whitespace-nowrap"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <motion.div
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/quote" passHref>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-2 rounded-lg font-semibold shadow-lg shadow-orange-500/25 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <motion.span
                    className="relative z-10 flex items-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Get Free Quote
                  </motion.span>
                </Button>
              </Link>

            </motion.div>

            {/* Login/User Button */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
                    <span className="text-orange-600 font-bold text-sm">{(session.user?.name || "U")[0]}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* User Dropdown */}
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-sm font-bold text-gray-900 truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                  {(session.user as any).role === "admin" && (
                    <Link
                      href="/admin-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 font-medium">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-orange-500 transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden absolute top-full left-0 right-0"
          >
            <div className="py-4 bg-white/95 backdrop-blur-lg border border-orange-500/20 max-h-[80vh] overflow-y-auto mx-2 my-2 rounded-lg shadow-xl">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-lg flex items-center justify-between"
                    onClick={() => {
                      if (item.hasDropdown) {
                        if (item.name === "Services") {
                          setIsServicesOpen(!isServicesOpen)
                        } else {
                          setIsResourcesOpen(!isResourcesOpen)
                        }
                      } else {
                        handleNavClick(item.href)
                        setIsOpen(false)
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <motion.div
                        animate={{
                          rotate:
                            item.name === "Services" ? (isServicesOpen ? 180 : 0) : isResourcesOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>

                  {/* Mobile Services Dropdown */}
                  {item.name === "Services" && item.hasDropdown && isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 bg-gray-800/30 border-l-2 border-green-500/30"
                    >
                      {servicesDropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => {
                            handleNavClick(dropdownItem.href)
                            setIsOpen(false)
                            setIsServicesOpen(false)
                          }}
                          className="block w-full text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-green-500/10 transition-all duration-200 rounded text-sm"
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Mobile Resources Dropdown */}
                  {item.name === "Resources" && item.hasDropdown && isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 bg-gray-800/30 border-l-2 border-green-500/30"
                    >
                      {resourcesDropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => {
                            handleNavClick(dropdownItem.href)
                            setIsOpen(false)
                            setIsResourcesOpen(false)
                          }}
                          className="block w-full text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-green-500/10 transition-all duration-200 rounded text-sm"
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="px-2 pt-2">
                <Link href="/quote" passHref>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black py-3 rounded-lg font-semibold shadow-lg shadow-green-500/25"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Get Free Quote
                  </Button>
                </Link>
                {session ? (
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-red-600 hover:bg-red-50 justify-start"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" className="w-full mt-2 text-gray-600 hover:bg-orange-50 justify-start">
                      <User className="w-4 h-4 mr-2" /> Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
    </nav >
  )
}
