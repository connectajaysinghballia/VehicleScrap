"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Car, User, MapPin, Calendar, ChevronLeft, CheckCircle, Trash2, Phone, Mail, DollarSign } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function BuyDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { toast } = useToast()
    const [request, setRequest] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRequest()
    }, [params.id])

    const fetchRequest = async () => {
        try {
            const res = await fetch(`/api/admin/valuations/buy/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setRequest(data)

                // Auto-update status from pending to reviewed
                if (data.status === "pending") {
                    await fetch("/api/admin/requests/approve", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: params.id, type: "buy", status: "reviewed" })
                    })
                    // Update local state to reflect the change
                    setRequest({ ...data, status: "reviewed" })
                }
            } else {
                toast({
                    title: "Error",
                    description: "Failed to load request details",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async () => {
        if (!confirm("Are you sure you want to approve this request?")) return

        try {
            const res = await fetch("/api/admin/requests/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: params.id, type: "buy" })
            })

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Request approved successfully"
                })
                fetchRequest()
            } else {
                toast({
                    title: "Error",
                    description: "Failed to approve request",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this request? This action cannot be undone.")) return

        try {
            const res = await fetch(`/api/admin/requests/delete?id=${params.id}&type=buy`, {
                method: "DELETE"
            })

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Request deleted successfully"
                })
                router.push("/admin/valuations/buy")
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete request",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

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
            case "approved":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200"><CheckCircle className="w-3.5 h-3.5" />Approved</span>
            default:
                return <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">{status}</span>
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading...</div>
            </div>
        )
    }

    if (!request) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Request not found</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/valuations/buy" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6 text-orange-600" />
                            Buy Vehicle Request Details
                        </h1>
                        <p className="text-gray-500 mt-1">Request ID: {request._id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {getStatusBadge(request.status)}
                    {request.status !== "approved" && (
                        <button
                            onClick={handleApprove}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vehicle Preferences */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Car className="w-5 h-5 text-orange-600" />
                        Vehicle Preferences
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Brand:</span>
                            <span className="text-gray-900 font-semibold">{request.customBrand || request.vehicleBrand}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Model:</span>
                            <span className="text-gray-900 font-semibold">{request.customModel || request.vehicleModel}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Fuel Type:</span>
                            <span className="text-gray-900 font-semibold">{request.fuelType}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><DollarSign className="w-4 h-4" />Budget Range:</span>
                            <span className="text-gray-900 font-semibold">{request.budgetRange}</span>
                        </div>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-orange-600" />
                        Customer Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Name:</span>
                            <span className="text-gray-900 font-semibold">{request.customerName}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><Phone className="w-4 h-4" />Phone:</span>
                            <span className="text-gray-900 font-semibold">{request.customerPhone}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><Mail className="w-4 h-4" />Email:</span>
                            <span className="text-gray-900 font-semibold">{request.customerEmail}</span>
                        </div>
                    </div>
                </div>

                {/* Location Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        Location
                    </h2>
                    <div className="space-y-3">
                        {request.state && (
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500 font-medium">State:</span>
                                <span className="text-gray-900 font-semibold">{request.state}</span>
                            </div>
                        )}
                        {(request.city || request.customCity) && (
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500 font-medium">City:</span>
                                <span className="text-gray-900 font-semibold">{request.customCity || request.city}</span>
                            </div>
                        )}
                        {request.pincode && (
                            <div className="flex justify-between py-2">
                                <span className="text-gray-500 font-medium">Pincode:</span>
                                <span className="text-gray-900 font-semibold">{request.pincode}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Timestamps */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        Timeline
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Created:</span>
                            <span className="text-gray-900 font-semibold">{new Date(request.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500 font-medium">Last Updated:</span>
                            <span className="text-gray-900 font-semibold">{new Date(request.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
