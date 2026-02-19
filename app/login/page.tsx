"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Building2, User } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<"standard" | "b2b">("standard")
    const [isLogin, setIsLogin] = useState(true)
    const { toast } = useToast()

    // Standard (User/Admin) State
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // B2B State
    const [b2bUserId, setB2BUserId] = useState("")
    const [b2bPassword, setB2BPassword] = useState("")

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
                    toast({
                        title: "Registration Failed",
                        description: data.message || "Something went wrong. Please try again.",
                        variant: "destructive"
                    })
                    setIsLoading(false)
                    return
                }
                toast({
                    title: "Account Created",
                    description: "You've successfully registered. Signing you in...",
                })
            }

            // Login Flow
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setIsLoading(false)
                toast({
                    title: "Login Failed",
                    description: "Invalid credentials. Please check your email and password.",
                    variant: "destructive"
                })
            } else {
                // Successful login
                toast({
                    title: "Success",
                    description: "Welcome back!",
                })
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive"
            })
        }
    }

    const handleB2BLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signIn("b2b-credentials", {
                userId: b2bUserId,
                password: b2bPassword,
                redirect: false,
            })

            if (result?.error) {
                setIsLoading(false)
                toast({
                    title: "B2B Login Failed",
                    description: "Invalid Partner ID or Password. Please check your credentials.",
                    variant: "destructive"
                })
            } else {
                toast({
                    title: "Welcome Partner",
                    description: "Redirecting to your marketplace...",
                })
                window.location.href = "/b2b" // Redirect to dedicated B2B marketplace
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
        <div className="h-screen flex items-stretch bg-white overflow-hidden font-sans pt-16 lg:pt-20">
            {/* Left Side - Image Background & Branding */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-6"
            >
                {/* Illustration Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative w-[98%] h-[95%] bg-white rounded-3xl overflow-hidden flex items-center justify-center p-2"
                    >
                        <img
                            src="/login.jpeg"
                            alt="Login Visual"
                            className="w-full h-full object-contain rounded-2xl"
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 lg:px-20 relative bg-white"
            >
                <div className="w-full max-w-md space-y-6">
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
                    <div className="flex p-1.5 bg-gray-100 rounded-xl">
                        <button
                            onClick={() => setActiveTab("standard")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === "standard"
                                ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <User className="w-4 h-4" />
                            User
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
                                className="space-y-5"
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
                                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
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
                                                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-sm font-semibold text-gray-700">Password</label>
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
                                                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-xl shadow-gray-900/10 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base"
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
                                                <span className="px-4 bg-white text-gray-500 font-medium">Or</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleGoogleLogin("/")}
                                            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group"
                                        >
                                            <img
                                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                alt="Google"
                                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                            />
                                            <span className="text-sm">Continue with Google</span>
                                        </button>
                                    </>
                                )}



                                <p className="text-center text-sm text-gray-500 mt-6">
                                    {isLogin ? "New to ScrapCenter?" : "Already have an account?"}
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
                                <form onSubmit={handleB2BLogin} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">User ID</label>
                                        <div className="relative group transition-all">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                value={b2bUserId}
                                                onChange={(e) => setB2BUserId(e.target.value)}
                                                placeholder="Enter Partner ID"
                                                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                                        <div className="relative group transition-all">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={b2bPassword}
                                                onChange={(e) => setB2BPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-blue-600/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Partner Sign In
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500 font-medium">New Partner?</span>
                                    </div>
                                </div>

                                <Link href="/partner-register" className="block">
                                    <button
                                        type="button"
                                        className="w-full bg-white border-2 border-blue-600 text-blue-700 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                    >
                                        <Building2 className="w-5 h-5" />
                                        Be Our Partner
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
