"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Building2,
    Search,
    Package,
    Car,
    Calendar,
    Clock,
    MapPin,
    AlertCircle,
    RefreshCcw,
    ArrowRight,
    Filter,
    TrendingUp,
    Eye,
    X,
    User,
    Phone,
    Hash
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function B2BMarketplace() {
    const { data: session, status } = useSession()
    const [valuations, setValuations] = useState<any[]>([])
    const [filteredValuations, setFilteredValuations] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
    const [showFilters, setShowFilters] = useState(false)

    // Filter states
    const [filterState, setFilterState] = useState("")
    const [filterCity, setFilterCity] = useState("")
    const [filterPincode, setFilterPincode] = useState("")

    const { toast } = useToast()
    const router = useRouter()

    const fetchOpportunities = async () => {
        setIsLoading(true)
        setError(null)
        setHasSearched(true)

        try {
            const res = await fetch("/api/valuations/marketplace")
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch opportunities")
            }

            setValuations(data.data || [])
            setFilteredValuations(data.data || [])
            toast({
                title: "Marketplace Updated",
                description: `Found ${data.data?.length || 0} new opportunities for you.`,
            })
        } catch (err: any) {
            console.error("Marketplace Fetch Error:", err)
            setError(err.message)
            toast({
                title: "Connection Error",
                description: err.message,
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Apply filters
    const applyFilters = () => {
        let filtered = [...valuations]

        if (filterState) {
            filtered = filtered.filter(val =>
                (val.address?.state || val.state || '').toLowerCase().includes(filterState.toLowerCase())
            )
        }

        if (filterCity) {
            filtered = filtered.filter(val =>
                (val.address?.city || val.city || '').toLowerCase().includes(filterCity.toLowerCase())
            )
        }

        if (filterPincode) {
            filtered = filtered.filter(val =>
                (val.address?.pincode || val.pincode || '').toString().includes(filterPincode)
            )
        }

        setFilteredValuations(filtered)
        toast({
            title: "Filters Applied",
            description: `Showing ${filtered.length} of ${valuations.length} requests`,
        })
    }

    // Clear filters
    const clearFilters = () => {
        setFilterState("")
        setFilterCity("")
        setFilterPincode("")
        setFilteredValuations(valuations)
        toast({
            title: "Filters Cleared",
            description: `Showing all ${valuations.length} requests`,
        })
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (status === "unauthenticated" || (session?.user as any)?.role !== "partner") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
                <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
                    <p className="text-gray-500">Only verified B2B partners can access the marketplace. Please sign in with your partner credentials.</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Go to Partner Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Hero Section */}
                <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                                <TrendingUp className="w-3 h-3" />
                                Partner Marketplace
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Scale Your Business with <br />
                                <span className="text-blue-400 font-extrabold italic">Premium Scrap Inventory</span>
                            </h1>
                            <p className="text-slate-400 text-lg max-w-md">
                                Access real-time vehicle scrap opportunities from across India. Verified leads, transparent weights, and instant pickup potential.
                            </p>
                            {!hasSearched && (
                                <button
                                    onClick={fetchOpportunities}
                                    disabled={isLoading}
                                    className="group relative flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-blue-500/25"
                                >
                                    {isLoading ? (
                                        <RefreshCcw className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Explore Opportunities
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        <div className="hidden md:block">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
                            >
                                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                    <span className="text-sm font-bold text-blue-300">Live Feed</span>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                    </div>
                                </div>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-4 bg-white/5 rounded-full w-full animate-pulse shadow-inner"></div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {hasSearched ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Package className="w-6 h-6 text-blue-600" />
                                    Marketplace Feed
                                    <span className="ml-2 text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {filteredValuations.length} of {valuations.length}
                                    </span>
                                </h2>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <button
                                        onClick={fetchOpportunities}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                        Refresh
                                    </button>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-colors shadow-sm ${showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        Filters
                                    </button>
                                </div>
                            </div>

                            {/* Filter Panel */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-lg overflow-hidden"
                                    >
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Filter className="w-5 h-5 text-blue-600" />
                                            Filter Requests
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                                                <select
                                                    value={filterState}
                                                    onChange={(e) => setFilterState(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                                >
                                                    <option value="">All States</option>
                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                    <option value="Assam">Assam</option>
                                                    <option value="Bihar">Bihar</option>
                                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                                    <option value="Goa">Goa</option>
                                                    <option value="Gujarat">Gujarat</option>
                                                    <option value="Haryana">Haryana</option>
                                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                    <option value="Jharkhand">Jharkhand</option>
                                                    <option value="Karnataka">Karnataka</option>
                                                    <option value="Kerala">Kerala</option>
                                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Manipur">Manipur</option>
                                                    <option value="Meghalaya">Meghalaya</option>
                                                    <option value="Mizoram">Mizoram</option>
                                                    <option value="Nagaland">Nagaland</option>
                                                    <option value="Odisha">Odisha</option>
                                                    <option value="Punjab">Punjab</option>
                                                    <option value="Rajasthan">Rajasthan</option>
                                                    <option value="Sikkim">Sikkim</option>
                                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                                    <option value="Telangana">Telangana</option>
                                                    <option value="Tripura">Tripura</option>
                                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                    <option value="Uttarakhand">Uttarakhand</option>
                                                    <option value="West Bengal">West Bengal</option>
                                                    <option value="Delhi">Delhi</option>
                                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                    <option value="Ladakh">Ladakh</option>
                                                    <option value="Puducherry">Puducherry</option>
                                                    <option value="Chandigarh">Chandigarh</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                                <input
                                                    type="text"
                                                    value={filterCity}
                                                    onChange={(e) => setFilterCity(e.target.value)}
                                                    placeholder="e.g., Mumbai"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                                                <input
                                                    type="text"
                                                    value={filterPincode}
                                                    onChange={(e) => setFilterPincode(e.target.value)}
                                                    placeholder="e.g., 400001"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={applyFilters}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md"
                                            >
                                                Apply Filters
                                            </button>
                                            <button
                                                onClick={clearFilters}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-colors"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                                    <AlertCircle className="w-12 h-12 text-red-500" />
                                    <div>
                                        <h3 className="text-lg font-bold text-red-900">Failed to load marketplace</h3>
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                    <button
                                        onClick={fetchOpportunities}
                                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="bg-white rounded-2xl p-6 h-[280px] animate-pulse border border-gray-100 shadow-sm">
                                            <div className="h-12 w-12 bg-gray-100 rounded-xl mb-4"></div>
                                            <div className="h-6 bg-gray-100 rounded-full w-2/3 mb-4"></div>
                                            <div className="space-y-3">
                                                <div className="h-4 bg-gray-50 rounded-full w-full"></div>
                                                <div className="h-4 bg-gray-50 rounded-full w-[90%]"></div>
                                                <div className="h-4 bg-gray-50 rounded-full w-[80%]"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredValuations.length === 0 ? (
                                <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching requests</h3>
                                    <p className="text-gray-500 max-w-sm mx-auto">
                                        {valuations.length > 0 ? "Try adjusting your filters to see more results." : "There are no new scrap requests available right now. Check back soon!"}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredValuations.map((val) => (
                                        <motion.div
                                            layout
                                            key={val._id}
                                            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <Car className="w-6 h-6" />
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700`}>
                                                    Approved
                                                </span>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="mb-4">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${val.type === 'valuation' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                                    val.type === 'sell' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                                        val.type === 'exchange' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                                            'bg-green-100 text-green-700 border border-green-200'
                                                    }`}>
                                                    {val.type === 'valuation' ? '📋 Get Free Quote' :
                                                        val.type === 'sell' ? '🏷️ Sell Old Vehicle' :
                                                            val.type === 'exchange' ? '🔄 Exchange Vehicle' :
                                                                '🛒 Buy New Vehicle'}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-gray-900 text-xl mb-1 truncate">
                                                {val.brand || val.vehicleBrand || val.oldVehicleBrand} {val.model || val.vehicleModel || val.oldVehicleModel}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium mb-6">
                                                {val.year || val.oldVehicleYear || val.registrationYear || 'N/A'} • {val.vehicleType || val.fuelType || 'Vehicle'}
                                            </p>

                                            <div className="space-y-3 border-t border-gray-50 pt-4 mb-6">
                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 text-blue-400" />
                                                    <span className="font-medium truncate">
                                                        {val.address?.city || val.city || 'Location'}, {val.address?.pincode || val.pincode || 'N/A'}
                                                    </span>
                                                </div>
                                                {val.vehicleWeight && (
                                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4 text-blue-400" />
                                                        <span className="font-medium">{val.vehicleWeight} Tons Estimated</span>
                                                    </div>
                                                )}
                                                {val.budgetRange && (
                                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4 text-blue-400" />
                                                        <span className="font-medium">Budget: {val.budgetRange}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-3 text-sm text-gray-400 italic">
                                                    <Calendar className="w-4 h-4" />
                                                    Listed {new Date(val.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setSelectedRequest(val)}
                                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 group-hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                            >
                                                <Eye className="w-5 h-5" />
                                                View Details
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 text-center"
                        >
                            <div className="bg-white rounded-[2rem] p-12 md:p-20 shadow-sm border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                                <Building2 className="w-16 h-16 text-blue-100 mx-auto mb-8" />
                                <h2 className="text-3xl font-black text-gray-900 mb-4">Welcome to Partner Marketplace</h2>
                                <p className="text-gray-500 max-w-lg mx-auto text-lg mb-10 leading-relaxed font-medium">
                                    Select your service area or click the button below to fetch the latest scrap disposal requests available in our ecosystem.
                                </p>
                                <button
                                    onClick={fetchOpportunities}
                                    className="bg-gray-900 hover:bg-black text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl active:scale-95 flex items-center gap-3 mx-auto"
                                >
                                    <Search className="w-6 h-6" />
                                    Find Loads Nearby
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* View Details Modal */}
                <AnimatePresence>
                    {selectedRequest && (
                        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRequest(null)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden relative flex flex-col"
                            >
                                {/* Close Button - Sticky */}
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="absolute top-4 right-4 p-2.5 bg-red-500 hover:bg-red-600 rounded-full transition-all z-30 shadow-2xl group"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>

                                {/* Modal Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-white flex-shrink-0">
                                    <div className="flex items-center gap-2 mb-3 flex-wrap pr-12">
                                        <span className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide ${selectedRequest.type === 'valuation' ? 'bg-purple-500/30 text-white border border-white/30' :
                                            selectedRequest.type === 'sell' ? 'bg-orange-500/30 text-white border border-white/30' :
                                                selectedRequest.type === 'exchange' ? 'bg-blue-500/30 text-white border border-white/30' :
                                                    'bg-green-500/30 text-white border border-white/30'
                                            }`}>
                                            {selectedRequest.type === 'valuation' ? '📋 Get Free Quote' :
                                                selectedRequest.type === 'sell' ? '🏷️ Sell Old Vehicle' :
                                                    selectedRequest.type === 'exchange' ? '🔄 Exchange Vehicle' :
                                                        '🛒 Buy New Vehicle'}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black leading-tight pr-12">
                                        {selectedRequest.brand || selectedRequest.vehicleBrand || selectedRequest.oldVehicleBrand} {selectedRequest.model || selectedRequest.vehicleModel || selectedRequest.oldVehicleModel}
                                    </h2>
                                    <p className="text-blue-100 mt-2 font-medium text-sm md:text-base">
                                        {selectedRequest.year || selectedRequest.oldVehicleYear || selectedRequest.registrationYear || 'N/A'} • {selectedRequest.vehicleType || selectedRequest.fuelType || 'Vehicle'}
                                    </p>
                                </div>

                                {/* Modal Content */}
                                <div className="p-4 md:p-8 space-y-5 md:space-y-6 max-h-[60vh] overflow-y-auto">
                                    {/* Vehicle Details */}
                                    <div>
                                        <h3 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-wider mb-3 md:mb-4">Vehicle Information</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            {selectedRequest.vehicleNumber && (
                                                <div className="flex items-start gap-2 md:gap-3 bg-gray-50 p-3 rounded-lg">
                                                    <Hash className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500">Vehicle Number</p>
                                                        <p className="font-bold text-gray-900 text-sm md:text-base truncate">{selectedRequest.vehicleNumber}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedRequest.registrationNumber && (
                                                <div className="flex items-start gap-2 md:gap-3 bg-gray-50 p-3 rounded-lg">
                                                    <Hash className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500">Registration Number</p>
                                                        <p className="font-bold text-gray-900 text-sm md:text-base truncate">{selectedRequest.registrationNumber}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedRequest.vehicleWeight && (
                                                <div className="flex items-start gap-2 md:gap-3 bg-gray-50 p-3 rounded-lg">
                                                    <Car className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500">Weight</p>
                                                        <p className="font-bold text-gray-900 text-sm md:text-base">{selectedRequest.vehicleWeight} Tons</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedRequest.budgetRange && (
                                                <div className="flex items-start gap-2 md:gap-3 bg-gray-50 p-3 rounded-lg">
                                                    <Car className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500">Budget Range</p>
                                                        <p className="font-bold text-gray-900 text-sm md:text-base">{selectedRequest.budgetRange}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <h3 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-wider mb-3 md:mb-4">Location</h3>
                                        <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
                                            <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 text-sm md:text-base">
                                                    {selectedRequest.address?.city || selectedRequest.city || 'Location'}, {selectedRequest.address?.state || selectedRequest.state || ''}
                                                </p>
                                                <p className="text-xs md:text-sm text-gray-600 mt-1">Pincode: {selectedRequest.address?.pincode || selectedRequest.pincode || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div>
                                        <h3 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-wider mb-3 md:mb-4">Contact Information</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                                <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-xs text-gray-500">Name</p>
                                                    <p className="font-bold text-gray-900 text-sm md:text-base break-words">
                                                        {selectedRequest.contact?.name || selectedRequest.name || selectedRequest.customerName || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-xs text-gray-500">Phone</p>
                                                    <p className="font-bold text-gray-900 text-sm md:text-base">
                                                        {selectedRequest.contact?.phone || selectedRequest.phone || selectedRequest.customerPhone || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="pt-4 border-t border-gray-100 text-center">
                                        <p className="text-xs text-gray-400 italic flex items-center justify-center gap-2 flex-wrap">
                                            <Calendar className="w-3 h-3" />
                                            <span>Submitted on {new Date(selectedRequest.createdAt).toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100">
                                    <button
                                        onClick={() => setSelectedRequest(null)}
                                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
