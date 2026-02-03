"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Building2, User } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<"standard" | "b2b">("standard")
    const [isLogin, setIsLogin] = useState(true)

    // Standard (User/Admin) State
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (!isLogin) {
                // Registration Flow
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                })

                if (!res.ok) {
                    const data = await res.json()
                    alert(data.message || "Registration failed")
                    setIsLoading(false)
                    return
                }
                // If registration successful, proceed to login automatically
            }

            // Login Flow
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setIsLoading(false)
                alert("Invalid credentials. Please check your email and password.")
            } else {
                // Successful login
                window.location.href = "/dashboard"
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            alert("An error occurred. Please try again.")
        }
    }



    const handleGoogleLogin = (callbackUrl = "/") => {
        setIsLoading(true)
        signIn("google", { callbackUrl })
    }

    return (
        <div className="min-h-screen flex items-stretch bg-gray-50 overflow-hidden font-sans pt-20 lg:pt-0">
            {/* Left Side - Image Background & Branding */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex flex-col justify-between w-1/2 relative bg-sky-50 overflow-hidden px-16 py-12"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white blur-3xl opacity-60"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-200 blur-3xl opacity-40"></div>
                </div>

                {/* Logo Removed */}

                {/* Illustration Image */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-8">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative w-full max-w-lg aspect-[4/3]"
                    >
                        <img
                            src="/login-illustration.png"
                            alt="Vehicle Scrapping Illustration"
                            className="w-full h-full object-contain drop-shadow-xl"
                        />
                    </motion.div>
                </div>

                {/* Main Text */}
                <div className="relative z-10 space-y-6 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-orange-200 text-orange-700 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4 text-orange-600" />
                            <span>#1 Trusted Scrap Service</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                            Turn Your Old Car Into <br />
                            <span className="text-orange-600">Instant Cash</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                            Join thousands of satisfied customers. Instant valuation, free pickup, and guaranteed payment.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex items-center lg:items-start justify-center px-6 sm:px-12 lg:px-20 relative bg-white lg:pt-24"
            >
                <div className="w-full max-w-md space-y-5">
                    {/* Header */}
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                            {activeTab === "standard" ? (isLogin ? "Welcome Back" : "Create Account") : "Partner Portal"}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {activeTab === "standard"
                                ? (isLogin ? "Please enter your details to sign in." : "Join us to get the best value for your scrap.")
                                : "Access for registered corporate partners."}
                        </p>
                    </div>

                    {/* Custom Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button
                            onClick={() => setActiveTab("standard")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === "standard"
                                ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <User className="w-4 h-4" />
                            User / Admin
                        </button>
                        <button
                            onClick={() => setActiveTab("b2b")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === "b2b"
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            B2B Partner
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "standard" ? (
                            <motion.div
                                key={isLogin ? "login" : "register"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Standard Auth Form */}
                                <form onSubmit={handleAuth} className="space-y-5">
                                    {!isLogin && (
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                            <div className="relative group transition-all">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                        <div className="relative group transition-all">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-sm font-semibold text-gray-700">Password</label>
                                            {isLogin && <a href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-700">Forgot?</a>}
                                        </div>
                                        <div className="relative group transition-all">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-900/10 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                {isLogin ? "Sign In" : "Create Account"}
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {isLogin && (
                                    <>
                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleGoogleLogin("/")}
                                            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group"
                                        >
                                            <img
                                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                alt="Google"
                                                className="w-6 h-6 group-hover:scale-110 transition-transform"
                                            />
                                            <span>Google Account</span>
                                        </button>
                                    </>
                                )}



                                <p className="text-center text-sm text-gray-500 mt-6">
                                    {isLogin ? "New to EcoScrap?" : "Already have an account?"}
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="font-bold text-gray-900 hover:text-orange-600 ml-1 transition-colors"
                                    >
                                        {isLogin ? "Create an account" : "Sign in"}
                                    </button>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="b2b"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                        <Building2 className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">B2B Partner Portal</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Exclusive access for registered corporate partners and scrap dealers.
                                        </p>
                                    </div>
                                    <div className="pt-2">

                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">
                                        Want to become a partner?
                                        <Link href="/contact" className="font-bold text-blue-600 hover:text-blue-700 ml-1">
                                            Contact Sales
                                        </Link>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
