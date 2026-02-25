"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Settings, Save, AlertCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
    const { toast } = useToast()
    const [scrapPrice, setScrapPrice] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        fetchScrapPrice()
    }, [])

    const fetchScrapPrice = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/settings/scrapRates")
            if (res.ok) {
                const data = await res.json()
                setScrapPrice(data.scrapPricePerKg.toString())
            }
        } catch (error) {
            console.error("Failed to fetch scrap price", error)
            toast({
                title: "Error",
                description: "Failed to load current scrap price settings.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        const price = parseFloat(scrapPrice)
        if (isNaN(price) || price <= 0) {
            toast({
                title: "Invalid Input",
                description: "Please enter a valid price greater than 0.",
                variant: "destructive"
            })
            return
        }

        setIsSaving(true)
        try {
            const res = await fetch("/api/settings/scrapRates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scrapPricePerKg: price })
            })

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Scrap price updated successfully.",
                    className: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400"
                })
            } else {
                throw new Error("Failed to update")
            }
        } catch (error) {
            console.error("Failed to save scrap price", error)
            toast({
                title: "Error",
                description: "Failed to save the new scrap price.",
                variant: "destructive"
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Settings className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Global Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage platform-wide configurations</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#0E192D] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden"
            >
                <div className="bg-gray-50/50 dark:bg-slate-900/50 px-6 py-4 border-b border-gray-100 dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                        Scrap Pricing Configuration
                    </h2>
                </div>

                <div className="p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12 text-gray-400 dark:text-slate-500">
                            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                            Loading configuration...
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-6 max-w-md">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Scrap Price per KG (₹)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        required
                                        value={scrapPrice}
                                        onChange={(e) => setScrapPrice(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/20 outline-none transition-all font-medium text-gray-900 dark:text-white"
                                        placeholder="e.g. 25.50"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1">
                                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400" />
                                    This rate will be used to calculate all new "Get Free Quote" estimates dynamically based on the vehicle weight explicitly provided by the user.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Configuration
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
