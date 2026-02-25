
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import { FileText, Car, Smartphone, MapPin, Clock, Calendar, CheckCircle, ChevronLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function QuoteValuationsPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "admin") {
        redirect("/")
    }

    await connectToDatabase()
    const valuations = await Valuation.find({ status: { $ne: "approved" } }).sort({ createdAt: -1 })

    function getStatusBadge(status: string) {
        switch (status) {
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50">
                        <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                )
            case "reviewed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                        <Calendar className="w-3.5 h-3.5" /> Reviewed
                    </span>
                )
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-900/50">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                    </span>
                )
            default:
                return <span className="px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 text-xs">{status}</span>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        Get Free Quote Requests
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 mt-1">Manage standard valuation inquiries.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0E192D] rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-slate-900/50 text-gray-700 dark:text-slate-300 font-semibold border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                                <th className="px-6 py-4 whitespace-nowrap">Customer</th>
                                <th className="px-6 py-4 whitespace-nowrap">Vehicle Details</th>
                                <th className="px-6 py-4 whitespace-nowrap">Location</th>
                                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {valuations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-slate-500">
                                        No quote requests found.
                                    </td>
                                </tr>
                            ) : (
                                valuations.map((val: any) => (
                                    <tr key={val._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-500 dark:text-slate-400 whitespace-nowrap">
                                            {new Date(val.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                    {(val.contact?.name || "U")[0]}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{val.contact?.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-slate-400">{val.contact?.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900 dark:text-white">{val.brand} {val.model}</p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">{val.year} • {val.vehicleNumber}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {val.address?.city || val.address?.state ? (
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 dark:text-white font-medium text-sm">
                                                        {[val.address?.city, val.address?.state].filter(Boolean).join(", ")}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-slate-400">
                                                        {val.address?.pincode}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-600 dark:text-slate-400">{val.address?.pincode || "N/A"}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(val.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/valuations/quote/${val._id}`} target="_blank" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

