import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import B2BRegistration from "@/models/B2BRegistration"
import B2BPartner from "@/models/B2BPartner"
import { User, Package, Clock, Calendar, CheckCircle, Car, Building2, AlertCircle } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    // Check for Partner Role
    if ((session.user as any).role === "partner") {
        // Fetch ALL valuations for partner marketplace view
        const allValuations = await Valuation.find().sort({ createdAt: -1 })

        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Partner Header */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <Building2 className="w-10 h-10" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{session.user?.name}</h1>
                                <p className="text-gray-500">{session.user?.email}</p>
                                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Verified Partner
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Marketplace / All Valuations */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <Package className="w-5 h-5 text-orange-600" />
                            Marketplace Opportunities
                        </h2>

                        {allValuations.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No valuation requests available at the moment.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allValuations.map((val) => (
                                    <div key={val._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                                <Car className="w-6 h-6 text-gray-700" />
                                            </div>
                                            {getStatusBadge(val.status)}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                                            {val.brand} {val.model}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">{val.year} • {val.vehicleNumber}</p>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(val.createdAt).toLocaleDateString()}
                                            </div>
                                            {/* Add more details if available in Valuation model */}
                                        </div>

                                        <button className="w-full mt-6 bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Standard User Logic
    await connectToDatabase()

    // Fetch only this user's valuations
    const valuations = await Valuation.find({ userId: (session.user as any).id }).sort({ createdAt: -1 })

    // Fetch B2B Status
    // 1. Check if there's a registration (sort by newest)
    const registration = await B2BRegistration.findOne({ userId: (session.user as any).id }).sort({ createdAt: -1 })

    // 2. Check if already a partner
    const partner = await B2BPartner.findOne({ originalUserId: (session.user as any).id })

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* User Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{session.user?.name}</h1>
                        <p className="text-gray-500">{session.user?.email}</p>
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {valuations.length} Valuation Requests
                        </div>
                    </div>
                </div>

                {/* B2B Status Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        Partner Status
                    </h2>

                    {partner ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-bold text-green-900">You are a Verified Partner!</h3>
                                <p className="text-green-700 mt-1">
                                    Your business <strong>{partner.businessName}</strong> is registered.
                                    Partner ID: <span className="font-mono bg-green-200 px-2 py-0.5 rounded text-sm">{partner.userId}</span>
                                </p>
                            </div>
                        </div>
                    ) : registration ? (
                        registration.status === "rejected" ? (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                                    <AlertCircle className="h-8 w-8 text-red-600" />
                                </div>
                                <div className="text-center sm:text-left w-full">
                                    <h3 className="text-lg font-bold text-red-900">Application Rejected</h3>
                                    <p className="text-red-700 mt-1 mb-4">
                                        Your application for <strong>{registration.name}</strong> submitted on {new Date(registration.createdAt).toLocaleDateString()} was not approved.
                                    </p>
                                    <Link
                                        href="/partner-register"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
                                    >
                                        Apply Again
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                                <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                                    <Clock className="h-8 w-8 text-yellow-600" />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-yellow-900">Application Under Review</h3>
                                    <p className="text-yellow-700 mt-1">
                                        Your application for <strong>{registration.name}</strong> was submitted on {new Date(registration.createdAt).toLocaleDateString()}.
                                        Our team is reviewing your details.
                                    </p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Become a B2B Partner</h3>
                            <p className="text-gray-500 max-w-md mx-auto mt-2 mb-6">
                                Join our network of certified scrap dealers and unlock exclusive benefits for your business.
                            </p>
                            <Link
                                href="/partner-register"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Apply for B2B Registration
                            </Link>
                        </div>
                    )}
                </div>

                {/* History */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        Request History
                    </h2>

                    {valuations.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">You haven't submitted any valuation requests yet.</p>
                            <Link href="/" className="inline-block mt-4 text-orange-600 font-semibold hover:underline">
                                Get a Quote
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {valuations.map((val) => (
                                <div key={val._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <Car className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">
                                                    {val.brand} {val.model} <span className="text-gray-400 font-normal">({val.year})</span>
                                                </h3>
                                                <p className="text-sm text-gray-500 font-mono mt-1">{val.vehicleNumber}</p>
                                                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(val.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            {getStatusBadge(val.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function getStatusBadge(status: string) {
    switch (status) {
        case "pending":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                    Pending
                </span>
            )
        case "reviewed":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    Reviewed
                </span>
            )
        case "completed":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    Completed
                </span>
            )
        default:
            return <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">{status}</span>
    }
}
