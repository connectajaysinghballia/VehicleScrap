
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import SellVehicle from "@/models/SellVehicle"
import ExchangeVehicle from "@/models/ExchangeVehicle"
import BuyVehicle from "@/models/BuyVehicle"
import { CheckCircle, FileText, ShoppingCart, RefreshCcw, Calendar } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ApprovedRequestsPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "admin") {
        redirect("/")
    }

    await connectToDatabase()

    // Fetch all approved requests from all collections
    const [quoteRequests, sellRequests, exchangeRequests, buyRequests] = await Promise.all([
        Valuation.find({ status: "approved" }).sort({ createdAt: -1 }).lean(),
        SellVehicle.find({ status: "approved" }).sort({ createdAt: -1 }).lean(),
        ExchangeVehicle.find({ status: "approved" }).sort({ createdAt: -1 }).lean(),
        BuyVehicle.find({ status: "approved" }).sort({ createdAt: -1 }).lean()
    ])

    // Combine all requests with type information
    const allRequests = [
        ...quoteRequests.map((req: any) => ({ ...req, type: "quote", typeName: "Get Free Quote", color: "blue" })),
        ...sellRequests.map((req: any) => ({ ...req, type: "sell", typeName: "Sell Old Vehicle", color: "green" })),
        ...exchangeRequests.map((req: any) => ({ ...req, type: "exchange", typeName: "Exchange Vehicle", color: "purple" })),
        ...buyRequests.map((req: any) => ({ ...req, type: "buy", typeName: "Buy New Vehicle", color: "orange" }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    function getCustomerInfo(req: any) {
        if (req.type === "quote") {
            return {
                name: req.contact?.name || "N/A",
                phone: req.contact?.phone || "N/A"
            }
        } else if (req.type === "sell") {
            return {
                name: req.name || "N/A",
                phone: req.phone || "N/A"
            }
        } else if (req.type === "exchange" || req.type === "buy") {
            return {
                name: req.customerName || "N/A",
                phone: req.customerPhone || "N/A"
            }
        }
        return { name: "N/A", phone: "N/A" }
    }

    function getVehicleInfo(req: any) {
        if (req.type === "quote") {
            return `${req.brand} ${req.model} (${req.year})`
        } else if (req.type === "sell") {
            return `${req.brand} ${req.model} (${req.registrationYear})`
        } else if (req.type === "exchange") {
            return `${req.oldVehicleBrand} ${req.oldVehicleModel} → ${req.newVehicleBrand}`
        } else if (req.type === "buy") {
            return `${req.vehicleBrand} ${req.vehicleModel}`
        }
        return "N/A"
    }

    function getTypeBadge(type: string, typeName: string, color: string) {
        const colorClasses: any = {
            blue: "bg-blue-100 text-blue-800 border-blue-200",
            green: "bg-green-100 text-green-800 border-green-200",
            purple: "bg-purple-100 text-purple-800 border-purple-200",
            orange: "bg-orange-100 text-orange-800 border-orange-200"
        }
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]}`}>
                {typeName}
            </span>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        Approved Requests
                    </h1>
                    <p className="text-gray-500 mt-1">All approved requests from all categories.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold">{allRequests.length}</span>
                    <span>Total Approved</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                                <th className="px-6 py-4 whitespace-nowrap">Type</th>
                                <th className="px-6 py-4 whitespace-nowrap">Customer</th>
                                <th className="px-6 py-4 whitespace-nowrap">Details</th>
                                <th className="px-6 py-4 whitespace-nowrap">Approved On</th>
                                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No approved requests found.
                                    </td>
                                </tr>
                            ) : (
                                allRequests.map((req: any) => {
                                    const customer = getCustomerInfo(req)
                                    const vehicle = getVehicleInfo(req)
                                    return (
                                        <tr key={`${req.type}-${req._id}`} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getTypeBadge(req.type, req.typeName, req.color)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full bg-${req.color}-50 flex items-center justify-center text-${req.color}-600 font-bold text-xs`}>
                                                        {customer.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{customer.name}</p>
                                                        <p className="text-xs text-gray-500">{customer.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{vehicle}</p>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                {new Date(req.updatedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/valuations/${req.type}/${req._id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
