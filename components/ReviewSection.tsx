"use client"

import React from "react"
import styles from "./ReviewSection.module.css" // Import the CSS module
import { User, Star } from "lucide-react"

export default function ReviewSection() {
    const reviews = [
        {
            id: 1,
            name: "Rajesh Kumar",
            text: "Best price for my old Alto. Very smooth process!",
            rating: 5,
            bg: "linear-gradient(to right, #ff7e5f, #feb47b)",
        },
        {
            id: 2,
            name: "Priya Singh",
            text: "Picked up my car in 2 hours. Amazing service.",
            rating: 5,
            bg: "linear-gradient(to right, #6a11cb, #2575fc)",
        },
        {
            id: 3,
            name: "Amit Patel",
            text: "Hassle-free documentation. Highly recommended.",
            rating: 4,
            bg: "linear-gradient(to right, #00c6ff, #0072ff)",
        },
        {
            id: 4,
            name: "Sneha Reddy",
            text: "Instant payment and polite staff. Great job!",
            rating: 5,
            bg: "linear-gradient(to right, #ff512f, #dd2476)",
        },
    ]

    const quantity = reviews.length

    return (
        <section className="py-20 bg-orange-50 overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                    What Our <span className="text-orange-600">Customers Say</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Trusted by thousands of vehicle owners across India.
                </p>
            </div>

            <div
                className={styles.slider}
                style={
                    {
                        "--width": "330px",
                        "--height": "370px",
                        "--quantity": quantity,
                    } as React.CSSProperties
                }
            >
                <div className={styles.list}>
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={styles.item}
                            style={{ "--position": index + 1 } as React.CSSProperties}
                        >
                            {/* Neumorphic Card */}
                            <div className="w-[330px] min-h-[370px] p-5 rounded-[20px] bg-[#e8e8e8] transition-all duration-400 hover:-translate-y-2.5 mx-auto relative group"
                                style={{
                                    boxShadow: "5px 5px 6px #dadada, -5px -5px 6px #f6f6f6"
                                }}>

                                {/* Card Image Area (Neumorphic Inset) */}
                                <div className="min-h-[170px] bg-[#c9c9c9] rounded-[15px] mb-4 flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        boxShadow: "inset 8px 8px 10px #c3c3c3, inset -8px -8px 10px #cfcfcf"
                                    }}>
                                    {/* User Avatar Placeholder */}
                                    {/* If you have user images, replace this icon with a Next.js Image */}
                                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center shadow-inner">
                                        <User className="w-10 h-10 text-gray-500" />
                                    </div>
                                    {/* Star Rating Overlay */}
                                    <div className="absolute top-3 right-3 flex gap-0.5 bg-white/40 backdrop-blur-sm px-2 py-1 rounded-full">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                                        ))}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <p className="text-[18px] font-semibold text-[#2e54a7] mt-4 ml-2.5">
                                    {review.name}
                                </p>

                                <p className="text-[#1f1f1f] text-[15px] mt-3 ml-2.5 leading-relaxed">
                                    {review.text}
                                </p>

                                {/* Footer */}
                                <div className="mt-7 ml-4 text-[13px] text-[#636363] flex justify-end items-center gap-1">
                                    <span className="font-normal">Rated</span>
                                    <span className="font-bold text-[#2e54a7]">5.0/5.0</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
