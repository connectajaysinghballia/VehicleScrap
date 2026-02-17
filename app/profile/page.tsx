import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import SellVehicle from "@/models/SellVehicle"
import ExchangeVehicle from "@/models/ExchangeVehicle"
import BuyVehicle from "@/models/BuyVehicle"
import B2BRegistration from "@/models/B2BRegistration"
import B2BPartner from "@/models/B2BPartner"
import { User, Package, Clock, Calendar, CheckCircle, Car, Building2, AlertCircle, RefreshCw, ShoppingCart, Tag } from "lucide-react"
import Link from "next/link"
import UserRequestList from "@/components/UserRequestList"
import mongoose from "mongoose"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    // Check for Partner Role
    if ((session.user as any).role === "partner") {
        redirect("/b2b") // Redirect partners to their dedicated marketplace
    }

    // Standard User Logic
    await connectToDatabase()
    const userId = (session.user as any).id

    let allRequests: any[] = []
    let registration: any = null
    let partner: any = null
    let error: boolean = false

    try {
        // Fetch all types of requests for this user
        // Using $or to match userId as either String or ObjectId for maximum compatibility
        const query = {
            $or: [
                { userId: userId },
                { userId: mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null }
            ].filter(q => q.userId !== null)
        }

        const [valuations, sellRequests, exchangeRequests, buyRequests, latestRegistration, existingPartner] = await Promise.all([
            Valuation.find(query).sort({ createdAt: -1 }),
            SellVehicle.find(query).sort({ createdAt: -1 }),
            ExchangeVehicle.find(query).sort({ createdAt: -1 }),
            BuyVehicle.find(query).sort({ createdAt: -1 }),
            B2BRegistration.findOne({ userId }).sort({ createdAt: -1 }),
            B2BPartner.findOne({ originalUserId: userId })
        ])

        // Merge and add types for identification
        allRequests = [
            ...valuations.map(v => ({ ...v.toObject(), type: 'valuation' })),
            ...sellRequests.map(s => ({ ...s.toObject(), type: 'sell' })),
            ...exchangeRequests.map(e => ({ ...e.toObject(), type: 'exchange' })),
            ...buyRequests.map(b => ({ ...b.toObject(), type: 'buy' })),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        registration = latestRegistration
        partner = existingPartner
    } catch (e) {
        console.error("Profile Data Fetch Error:", e)
        error = true
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                {error ? (
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-red-100 text-center space-y-6">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto">
                            <AlertCircle className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
                            <p className="text-gray-500 mt-2">We couldn't load your profile information. Please try refreshing the page.</p>
                        </div>
                        <Link
                            href="/profile"
                            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                        >
                            <RefreshCw className="mr-2 h-5 w-5" /> Retry Now
                        </Link>
                    </div>
                ) : (
                    <>

                        {/* User Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                <User className="w-10 h-10" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{session.user?.name}</h1>
                                <p className="text-gray-500">{session.user?.email}</p>
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {allRequests.length} Total Requests
                                </div>
                            </div>
                        </div>

                        {/* B2B Status Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">B2B Partner Status</h2>
                                </div>
                            </div>

                            {partner ? (
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="font-bold text-green-900">Verified Partner</p>
                                            <p className="text-sm text-green-700">{partner.businessName} (ID: {partner.userId})</p>
                                        </div>
                                    </div>
                                    <Link href="/b2b" className="text-sm font-bold text-green-600 hover:underline">
                                        Go to Marketplace
                                    </Link>
                                </div>
                            ) : registration ? (
                                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {registration.status === 'pending' ? (
                                            <Clock className="w-5 h-5 text-yellow-600" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <div>
                                            <p className="font-bold text-yellow-900 capitalize">Registration {registration.status}</p>
                                            <p className="text-sm text-yellow-700">We'll notify you once our team reviews your application.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 text-center border border-dashed border-gray-200 rounded-xl">
                                    <p className="text-gray-500 mb-4">Want to become a B2B partner and access our marketplace?</p>
                                    <Link
                                        href="/b2b-register"
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Register Now
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

                            {allRequests.length === 0 ? (
                                <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">You haven't submitted any requests yet.</p>
                                    <Link href="/" className="inline-block mt-4 text-orange-600 font-semibold hover:underline">
                                        Get Started
                                    </Link>
                                </div>
                            ) : (
                                <UserRequestList requests={JSON.parse(JSON.stringify(allRequests))} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
