
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import SellVehicle from "@/models/SellVehicle"
import { ShoppingCart, Calendar, CheckCircle, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function SellValuationsPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "admin") {
        redirect("/")
    }

    await connectToDatabase()
    // Explicitly casting to any to avoid TS errors with lean() or older mongoose types if strict
    const requests = await SellVehicle.find({}).sort({ createdAt: -1 })

    function getStatusBadge(status: string) {
        switch (status) {
            case "pending":
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">Pending</span>
            case "contacted":
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">Contacted</span>
            case "completed":
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Completed</span>
            case "rejected":
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">Rejected</span>
            default:
                return <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">{status}</span>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6 text-green-600" />
                        Sell Old Vehicle Requests
                    </h1>
                    <p className="text-gray-500 mt-1">Direct requests from users wanting to sell/scrap vehicles.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                                <th className="px-6 py-4 whitespace-nowrap">Owner Details</th>
                                <th className="px-6 py-4 whitespace-nowrap">Vehicle Info</th>
                                <th className="px-6 py-4 whitespace-nowrap">Registration</th>
                                <th className="px-6 py-4 whitespace-nowrap">Loan Status</th>
                                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No sell requests found.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req: any) => (
                                    <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs">
                                                    {(req.name || "U")[0]}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{req.name}</p>
                                                    <p className="text-xs text-gray-500">{req.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{req.brand} {req.model}</p>
                                            <p className="text-xs text-gray-500">{req.fuelType} • {req.registrationYear}</p>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-600">
                                            {req.registrationNumber}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {req.pendingLoan === "yes" ? (
                                                <span className="text-red-600 font-medium text-xs">Yes ({req.loanAmount})</span>
                                            ) : (
                                                <span className="text-green-600 font-medium text-xs">No Loan</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(req.status)}
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
