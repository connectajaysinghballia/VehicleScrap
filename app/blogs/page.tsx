"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function BlogsPage() {
    const blogs = [
        {
            id: 1,
            title: "The Future of Vehicle Scrapping in India",
            excerpt: "How the new vehicle scrappage policy is transforming the automotive industry and promoting sustainability across the nation.",
            date: "Feb 5, 2026",
            author: "Rahul Sharma",
            category: "Policy",
            image: "/blog-1.jpg", // Placeholder - normally this would be a real image
        },
        {
            id: 2,
            title: "Understanding the Green Tax Benefits",
            excerpt: "Unlock financial incentives for scrapping your old vehicle. A comprehensive guide to tax rebates and discounts on new cars.",
            date: "Jan 28, 2026",
            author: "Priya Singh",
            category: "Finance",
            image: "/blog-2.jpg",
        },
        {
            id: 3,
            title: "Top 5 Signals Your Car Needs Scrapping",
            excerpt: "Is your car costing more to repair than it's worth? Check these 5 critical signs that indicate it's time to say goodbye.",
            date: "Jan 15, 2026",
            author: "Amit Patel",
            category: "Maintenance",
            image: "/blog-3.jpg",
        },
        {
            id: 4,
            title: "How AutoScrap Recycles 99% of Materials",
            excerpt: "An inside look at our advanced recycling facility where we responsibly extract metals, fluids, and plastics for reuse.",
            date: "Dec 10, 2025",
            author: "Vikram Malhotra",
            category: "Technology",
            image: "/blog-4.jpg",
        },
        {
            id: 5,
            title: "Electric Vehicles Disposal: Challenges & Solutions",
            excerpt: "Safely recycling EV batteries is crucial for the environment. Learn how we handle high-voltage components safely.",
            date: "Nov 22, 2025",
            author: "Neha Gupta",
            category: "EVs",
            image: "/blog-5.jpg",
        },
        {
            id: 6,
            title: "Simplified Guide to Deregistration Process",
            excerpt: "Navigating RTO paperwork can be tricky. We simplify the steps to get your Certificate of Deposit (CD) hassle-free.",
            date: "Oct 05, 2025",
            author: "Sanjay Kumar",
            category: "Guide",
            image: "/blog-6.jpg",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-16 px-4 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-transparent pointer-events-none"></div>
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6">
                            Knowledge Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Latest <span className="text-orange-600">Insights</span> & News
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Stay updated with the latest trends in vehicle scrapping, government policies, and eco-friendly practices.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                {/* Image Placeholder */}
                                <div className="relative h-60 bg-gray-200 overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                        <span className="text-lg font-medium">Image Placeholder</span>
                                    </div>
                                    {/* In a real app, use next/image here */}
                                    {/* <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> */}

                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wide flex items-center gap-1 shadow-sm">
                                        <Tag className="w-3 h-3" /> {blog.category}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {blog.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" /> {blog.author}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <Link href="#" className="inline-flex items-center text-orange-600 font-semibold text-sm hover:gap-2 transition-all">
                                        Read Full Article <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
