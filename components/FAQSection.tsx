"use client"

import { motion } from "framer-motion"
import { ArrowRight, Recycle, ShoppingCart, Banknote, Repeat } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
    const faqs = [
        {
            id: "scrapping",
            question: "Process of scrapping my vehicle?",
            answer: "Get the best scrap value for your old car with instant payment and free pickup. We ensure eco-friendly recycling and provide an official Certificate of Deposit.",
            icon: Recycle,
            link: "/guide#scrapping"
        },
        {
            id: "buying",
            question: "Process of buying a used vehicle?",
            answer: "Choose from our wide range of quality verified refurbished cars. Enjoy transparent pricing, warranty benefits, and hassle-free documentation transfer.",
            icon: ShoppingCart,
            link: "/guide#buying"
        },
        {
            id: "selling",
            question: "Process of selling my vehicle?",
            answer: "Sell your car in minutes at the best market price. We offer free home inspection, instant bank transfer, and handle all the paperwork for you.",
            icon: Banknote,
            link: "/guide#selling"
        },
        {
            id: "exchange",
            question: "Process of exchanging my vehicle?",
            answer: "Upgrade to a better car by exchanging your old one. Get a great exchange bonus and pay only the difference amount for your new ride.",
            icon: Repeat,
            link: "/guide#exchange"
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Everything You Need to <span className="text-orange-600">Know</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500"
                    >
                        Common questions about our services and processes.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-orange-50/50 rounded-3xl p-8 hover:bg-orange-50 transition-colors border border-orange-100/50 group"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                                    <faq.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 pt-2">{faq.question}</h3>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-6 pl-16">
                                {faq.answer}
                            </p>

                            <div className="pl-16">
                                <Link
                                    href={faq.link}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group-hover:gap-3"
                                >
                                    Explore steps
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
