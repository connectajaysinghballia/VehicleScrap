"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    Car,
    RefreshCcw,
    ShoppingCart,
    Users,
    UploadCloud,
    Key,
    LogOut,
    Home,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Shield,
    CheckCircle
} from "lucide-react"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isValuationsOpen, setIsValuationsOpen] = useState(true)
    const pathname = usePathname()

    // Helper to check if a link is active
    const isActive = (path: string) => pathname === path || pathname?.startsWith(path)

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isSidebarOpen ? 0 : "-100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-xl lg:shadow-none flex flex-col h-screen w-72"
            >
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-6 border-b border-gray-100 bg-white justify-between">
                    <div className="flex items-center">
                        <Shield className="w-8 h-8 text-red-600 mr-2" />
                        <span className="text-xl font-black text-gray-900 tracking-tight">AutoScrap</span>
                    </div>
                    {/* Toggle Button in Sidebar (Desktop) */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    {/* Close button for Mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-hide">

                    {/* Dashboard */}
                    <Link href="/admin" className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive('/admin') && pathname === '/admin' ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        {isActive('/admin') && pathname === '/admin' && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 rounded-r-full" />
                        )}
                        <LayoutDashboard className={`w-5 h-5 mr-3.5 transition-colors ${isActive('/admin') && pathname === '/admin' ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className="font-semibold">Dashboard</span>
                    </Link>

                    {/* Valuations Dropdown */}
                    <div className="space-y-1 pt-1">
                        <button
                            onClick={() => setIsValuationsOpen(!isValuationsOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                        >
                            <div className="flex items-center">
                                <FileText className="w-5 h-5 mr-3.5 text-gray-400 group-hover:text-gray-600" />
                                <span className="font-semibold">Valuations</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isValuationsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isValuationsOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden space-y-1"
                                >
                                    {[
                                        { href: "/admin/valuations/quote", label: "Get Free Quote", color: "blue" },
                                        { href: "/admin/valuations/sell", label: "Sell Old Vehicle", color: "green" },
                                        { href: "/admin/valuations/exchange", label: "Exchange Vehicle", color: "purple" },
                                        { href: "/admin/valuations/buy", label: "Buy New Vehicle", color: "orange" }
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center pl-12 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(item.href) ? `bg-${item.color}-50 text-${item.color}-700` : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                                        >
                                            <div className={`w-2 h-2 rounded-full mr-3 ${isActive(item.href) ? `bg-${item.color}-500` : 'bg-gray-300'}`} />
                                            {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Approved Requests */}
                    <Link href="/admin/approved-requests" className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive('/admin/approved-requests') ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        {isActive('/admin/approved-requests') && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600 rounded-r-full" />
                        )}
                        <CheckCircle className={`w-5 h-5 mr-3.5 transition-colors ${isActive('/admin/approved-requests') ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className="font-semibold">Approved Requests</span>
                    </Link>

                    <div className="pt-6 mt-2">
                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Management</p>
                        <div className="space-y-1.5">
                            <Link href="/admin/partners" className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive('/admin/partners') ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                                {isActive('/admin/partners') && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 rounded-r-full" />
                                )}
                                <Users className={`w-5 h-5 mr-3.5 transition-colors ${isActive('/admin/partners') ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                <span className="font-semibold">B2B Partners</span>
                            </Link>
                            <Link href="/admin/blogs/upload" className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive('/admin/blogs') ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                                {isActive('/admin/blogs') && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 rounded-r-full" />
                                )}
                                <UploadCloud className={`w-5 h-5 mr-3.5 transition-colors ${isActive('/admin/blogs') ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                <span className="font-semibold">Upload Blogs</span>
                            </Link>
                            <Link href="/admin/b2b-generator" className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive('/admin/b2b-generator') ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                                {isActive('/admin/b2b-generator') && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 rounded-r-full" />
                                )}
                                <Key className={`w-5 h-5 mr-3.5 transition-colors ${isActive('/admin/b2b-generator') ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                <span className="font-semibold">B2B Generator</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <Link href="/" className="flex items-center px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all mb-2 group">
                        <Home className="w-5 h-5 mr-3.5 text-gray-400 group-hover:text-gray-600" />
                        <span className="font-semibold">Back to Home</span>
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 hover:shadow-sm transition-all group"
                    >
                        <LogOut className="w-5 h-5 mr-3.5 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Sign Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : ''}`}>
                {/* Desktop/Mobile Header Toggle */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between z-30 sticky top-0">
                    <div className="flex items-center">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -ml-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                        <span className={`ml-3 text-lg font-bold text-gray-900 ${isSidebarOpen ? 'lg:invisible' : ''}`}>Admin Panel</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Administrator</span>
                            <span className="text-sm font-semibold text-gray-900">AutoScrap Control</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
