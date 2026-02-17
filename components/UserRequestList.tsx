"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Car,
    Calendar,
    Clock,
    CheckCircle,
    X,
    Smartphone,
    MapPin,
    Scale,
    User as UserIcon,
    ChevronRight,
    FileText,
    RefreshCw,
    ShoppingCart,
    Tag,
    Hash,
    Fuel,
    DollarSign,
    Box
} from "lucide-react"

interface BaseRequest {
    _id: string
    type: 'valuation' | 'sell' | 'exchange' | 'buy'
    status: string
    createdAt: string
}

interface UserRequestListProps {
    requests: any[]
}

export default function UserRequestList({ requests }: UserRequestListProps) {
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                        <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                )
            case "contacted":
            case "reviewed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        <Calendar className="w-3.5 h-3.5" /> Reviewing
                    </span>
                )
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                    </span>
                )
            case "approved":
                return (
                    <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border-2 border-emerald-300">
                            <CheckCircle className="w-4 h-4" />
                            Your request was moved to CC soon we reach you
                        </span>
                        <span className="text-xs font-medium text-gray-700 italic">Thank you for your patience! 🙏</span>
                    </div>
                )
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                        <X className="w-3.5 h-3.5" /> Rejected
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                        {status}
                    </span>
                )
        }
    }

    const getTypeDisplayName = (type: string) => {
        switch (type) {
            case 'valuation': return "Get Free Quote"
            case 'sell': return "Sell Old Vehicle"
            case 'exchange': return "Exchange Vehicle"
            case 'buy': return "Buy New Vehicle"
            default: return "Vehicle Request"
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'valuation': return <Scale className="w-5 h-5" />
            case 'sell': return <Tag className="w-5 h-5" />
            case 'exchange': return <RefreshCw className="w-5 h-5" />
            case 'buy': return <ShoppingCart className="w-5 h-5" />
            default: return <FileText className="w-5 h-5" />
        }
    }

    const getRequestTitle = (req: any) => {
        if (req.type === 'buy') return `${req.vehicleBrand} ${req.vehicleModel}`
        if (req.type === 'valuation') return `${req.brand} ${req.model}`
        if (req.type === 'sell') return `${req.brand} ${req.model}`
        if (req.type === 'exchange') return `${req.oldVehicleBrand} ${req.oldVehicleModel}`
        return "Vehicle Request"
    }

    const getRequestSubtitle = (req: any) => {
        if (req.type === 'valuation') return req.vehicleNumber || req.vehicleType
        if (req.type === 'sell') return req.registrationNumber
        if (req.type === 'exchange') return req.oldVehicleRegistration
        if (req.type === 'buy') return `${req.budgetRange} Budget`
        return ""
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                {requests.map((req) => (
                    <motion.div
                        key={req._id}
                        layoutId={req._id}
                        onClick={() => setSelectedRequest(req)}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors text-gray-500 group-hover:text-orange-600">
                                    {getTypeIcon(req.type)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        {getRequestTitle(req)}
                                        <span className="text-[10px] uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-black">
                                            {getTypeDisplayName(req.type)}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-500 font-mono mt-0.5">{getRequestSubtitle(req)}</p>
                                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {mounted ? new Date(req.createdAt).toLocaleDateString() : "Loading..."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                {getStatusBadge(req.status)}
                                <div className="text-orange-600 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Details <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            {/* Modal Header */}
                            <div className="bg-orange-600 p-8 text-white">
                                <div className="flex items-center gap-3 mb-2 text-orange-200">
                                    {getTypeIcon(selectedRequest.type)}
                                    <span className="text-sm font-bold uppercase tracking-wider">{getTypeDisplayName(selectedRequest.type)}</span>
                                </div>
                                <h2 className="text-3xl font-black">{getRequestTitle(selectedRequest)}</h2>
                                <p className="text-orange-100 mt-1 font-medium italic opacity-80">{getRequestSubtitle(selectedRequest)}</p>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                                {/* Status Section */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Status</span>
                                    {getStatusBadge(selectedRequest.status)}
                                </div>

                                {/* Details Grid - Dynamic based on type */}
                                <div className="grid grid-cols-2 gap-6">
                                    {selectedRequest.type === 'valuation' && (
                                        <>
                                            <DetailItem icon={<Car />} label="Vehicle Type" value={selectedRequest.vehicleType} />
                                            <DetailItem icon={<Calendar />} label="Model Year" value={selectedRequest.year} />
                                            <DetailItem icon={<Scale />} label="Approx Weight" value={`${selectedRequest.vehicleWeight} Tons`} />
                                            <DetailItem icon={<MapPin />} label="Pincode" value={selectedRequest.address?.pincode} />
                                        </>
                                    )}

                                    {selectedRequest.type === 'sell' && (
                                        <>
                                            <DetailItem icon={<Hash />} label="Reg. Number" value={selectedRequest.registrationNumber} />
                                            <DetailItem icon={<Calendar />} label="Reg. Year" value={selectedRequest.registrationYear} />
                                            <DetailItem icon={<Fuel />} label="Fuel Type" value={selectedRequest.fuelType} />
                                            <DetailItem icon={<DollarSign />} label="Pending Loan" value={selectedRequest.pendingLoan} />
                                            <DetailItem icon={<MapPin />} label="Location" value={`${selectedRequest.city}, ${selectedRequest.state}`} />
                                            <DetailItem icon={<MapPin />} label="Pincode" value={selectedRequest.pincode} />
                                        </>
                                    )}

                                    {selectedRequest.type === 'exchange' && (
                                        <>
                                            <DetailItem icon={<Hash />} label="Old Reg. No" value={selectedRequest.oldVehicleRegistration} />
                                            <DetailItem icon={<Calendar />} label="Old Year" value={selectedRequest.oldVehicleYear} />
                                            <DetailItem icon={<Fuel />} label="Old Fuel" value={selectedRequest.oldVehicleFuelType} />
                                            <DetailItem icon={<ShoppingCart />} label="New Brand" value={selectedRequest.newVehicleBrand} />
                                            <DetailItem icon={<Box />} label="New Model" value={selectedRequest.newVehicleModel} />
                                            <DetailItem icon={<MapPin />} label="Location" value={`${selectedRequest.city}, ${selectedRequest.state}`} />
                                        </>
                                    )}

                                    {selectedRequest.type === 'buy' && (
                                        <>
                                            <DetailItem icon={<DollarSign />} label="Budget" value={selectedRequest.budgetRange} />
                                            <DetailItem icon={<Fuel />} label="Fuel Preference" value={selectedRequest.fuelType} />
                                            <DetailItem icon={<MapPin />} label="Location" value={`${selectedRequest.city}, ${selectedRequest.state}`} />
                                            <DetailItem icon={<MapPin />} label="Pincode" value={selectedRequest.pincode} />
                                        </>
                                    )}
                                </div>

                                {/* Contact Information */}
                                <div className="pt-6 border-t border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Contact Information</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-600">
                                                <UserIcon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400">Name</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {selectedRequest.type === 'valuation' ? selectedRequest.contact?.name : selectedRequest.name || selectedRequest.customerName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-600">
                                                <Smartphone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400">Phone</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {selectedRequest.type === 'valuation' ? selectedRequest.contact?.phone : selectedRequest.phone || selectedRequest.customerPhone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="pt-4 text-center">
                                    <p className="text-xs text-gray-400 italic">Submitted on {mounted ? new Date(selectedRequest.createdAt).toLocaleString() : "..."}</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | undefined }) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                {icon} {label}
            </p>
            <p className="text-sm font-bold text-gray-900">{value || "N/A"}</p>
        </div>
    )
}
