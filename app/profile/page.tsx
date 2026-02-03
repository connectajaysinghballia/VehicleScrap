import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import { User, Package, Clock, Calendar, CheckCircle, Car } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    await connectToDatabase()

    // Fetch only this user's valuations
    const valuations = await Valuation.find({ userId: (session.user as any).id }).sort({ createdAt: -1 })

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
                            <a href="/" className="inline-block mt-4 text-orange-600 font-semibold hover:underline">
                                Get a Quote
                            </a>
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
