"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, ArrowRight, Activity, MapPin, Download, Mail } from "lucide-react"
import Link from "next/link"

interface SubcontractingFeedProps {
    initialData: any[]
}

const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 }
    })
}

export default function SubcontractingFeed({ initialData }: SubcontractingFeedProps) {
    const [filterType, setFilterType] = useState<string>("all")

    const filteredData = initialData.filter((item) => {
        const matchesType = filterType === "all" || item.type === filterType

        return matchesType
    })

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'quote': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
            case 'sell': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
            case 'exchange': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400'
            case 'buy': return 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'quote': return 'Scrap / Get Quote'
            case 'sell': return 'Sell Old Vehicle'
            case 'exchange': return 'Exchange Vehicle'
            case 'buy': return 'Buy New Vehicle'
            default: return type
        }
    }

    const getLinkHref = (type: string, id: string) => {
        switch (type) {
            case 'quote': return `/admin/valuations/quote/${id}`
            case 'sell': return `/admin/valuations/sell/${id}`
            case 'exchange': return `/admin/valuations/exchange/${id}`
            case 'buy': return `/admin/valuations/buy/${id}`
            default: return '#'
        }
    }

    const generateCSV = (data: any[]) => {
        const headers = ["Type", "Customer Name", "Phone Number", "Vehicle Info", "Location", "Request Date"];

        const rows = data.map(item => {
            const reqDate = new Date(item.createdAt).toLocaleString('en-IN');

            return [
                `"${getTypeLabel(item.type)}"`,
                `"${(item.customerName || 'N/A').replace(/"/g, '""')}"`,
                `"${(item.customerPhone || 'N/A').replace(/"/g, '""')}"`,
                `"${(item.vehicleInfo || "").replace(/"/g, '""')}"`,
                `"${(item.location || "").replace(/"/g, '""')}"`,
                `"${reqDate}"`
            ].join(",");
        });

        return [headers.join(","), ...rows].join("\n");
    };

    const handleDownloadExcel = () => {
        if (filteredData.length === 0) return;

        const csvString = generateCSV(filteredData);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `subcontracting_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportCSV = () => {
        if (filteredData.length === 0) return;

        // Trigger the download automatically first so they have the file
        handleDownloadExcel();

        // Open Gmail explicitly in a new tab instead of generic mailto handler
        const subject = encodeURIComponent("Subcontracting Requests Export");
        const bodyText = `Please find the latest filtered subcontracting requests attached to this email.\n\nNote: The file "subcontracting_export_${new Date().toISOString().split('T')[0]}.csv" has been automatically downloaded to your computer. Please attach it manually to this email as browser security restricts automatic attachments.`;
        const body = encodeURIComponent(bodyText);

        // Gmail web compose URL pattern
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
    };

    return (
        <div className="bg-white dark:bg-[#0E192D] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* Header / Filters */}
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col lg:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-[#0E192D]">
                <div className="flex items-center gap-2 w-full lg:w-auto">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="flex-1 lg:flex-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-700 dark:text-gray-300 transition-all cursor-pointer"
                    >
                        <option value="all">All Types</option>
                        <option value="quote">Scrap Quotes</option>
                        <option value="sell">Sell Requests</option>
                        <option value="exchange">Exchange Requests</option>
                        <option value="buy">Buy Requests</option>
                    </select>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0 justify-end">
                    <button
                        onClick={handleDownloadExcel}
                        disabled={filteredData.length === 0}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-500 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-emerald-500/20 active:scale-[0.98]"
                    >
                        <Download className="w-4 h-4" />
                        Download Excel
                    </button>

                    <button
                        onClick={handleExportCSV}
                        disabled={filteredData.length === 0}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white hover:bg-amber-600 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                    >
                        <Mail className="w-4 h-4" />
                        Export to Email
                    </button>
                </div>
            </div>

            {/* Empty State */}
            {filteredData.length === 0 && (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                    <Activity className="w-12 h-12 text-gray-300 dark:text-slate-600 mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Subcontracting Requests Found</p>
                    <p className="text-sm">Try adjusting your filters or search terms.</p>
                </div>
            )}

            {/* Table */}
            {filteredData.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-800 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                                <th className="p-4 pl-6">Req Details</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Request Date</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
                            <AnimatePresence>
                                {filteredData.map((item, index) => (
                                    <motion.tr
                                        key={item._id}
                                        custom={index}
                                        variants={tableRowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        layout
                                        className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                                    >
                                        <td className="p-4 pl-6 align-top">
                                            <div className="flex flex-col gap-1.5">
                                                <div className={`self-start inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getTypeColor(item.type)}`}>
                                                    {getTypeLabel(item.type)}
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                    {item.vehicleInfo}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-4 align-top">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.customerName}</p>
                                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{item.customerPhone}</p>
                                            </div>
                                        </td>

                                        <td className="p-4 align-top">
                                            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                                {item.location}
                                            </div>
                                        </td>

                                        <td className="p-4 align-top">
                                            <p className="text-sm text-gray-600 dark:text-slate-300 font-medium">
                                                {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                                                {new Date(item.createdAt).toLocaleTimeString('en-IN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </td>

                                        <td className="p-4 pr-6 align-top text-right">
                                            <Link href={getLinkHref(item.type, item._id)}>
                                                <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-400 transition-colors group-hover:scale-110">
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
