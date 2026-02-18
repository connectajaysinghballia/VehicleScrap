"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Car, User, MapPin, Calendar, ChevronLeft, CheckCircle, Trash2, Phone, Hash, Weight, Image as ImageIcon, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { toast } = useToast()
    const [request, setRequest] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRequest()
    }, [params.id])

    const fetchRequest = async () => {
        try {
            const res = await fetch(`/api/admin/valuations/quote/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setRequest(data)

                // Auto-update status from pending to reviewed
                if (data.status === "pending") {
                    await fetch("/api/admin/requests/approve", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: params.id, type: "quote", status: "reviewed" })
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
                body: JSON.stringify({ id: params.id, type: "quote" })
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
            const res = await fetch(`/api/admin/requests/delete?id=${params.id}&type=quote`, {
                method: "DELETE"
            })

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Request deleted successfully"
                })
                router.push("/admin/valuations/quote")
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
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">Pending</span>
            case "reviewed":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">Reviewed</span>
            case "completed":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Completed</span>
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
                    <Link href="/admin/valuations/quote" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            Quote Request Details
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
                {/* Vehicle Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Car className="w-5 h-5 text-blue-600" />
                        Vehicle Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Type:</span>
                            <span className="text-gray-900 font-semibold">{request.vehicleType}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Brand:</span>
                            <span className="text-gray-900 font-semibold">{request.brand}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Model:</span>
                            <span className="text-gray-900 font-semibold">{request.model}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Year:</span>
                            <span className="text-gray-900 font-semibold">{request.year}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><Hash className="w-4 h-4" />Vehicle Number:</span>
                            <span className="text-gray-900 font-semibold font-mono">{request.vehicleNumber}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><Weight className="w-4 h-4" />Weight:</span>
                            <span className="text-gray-900 font-semibold">{request.vehicleWeight}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Contact Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Name:</span>
                            <span className="text-gray-900 font-semibold">{request.contact?.name || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><Phone className="w-4 h-4" />Phone:</span>
                            <span className="text-gray-900 font-semibold">{request.contact?.phone || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500 font-medium flex items-center gap-2"><MapPin className="w-4 h-4" />Pincode:</span>
                            <span className="text-gray-900 font-semibold">{request.address?.pincode || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* eKYC Information */}
                {(request.firstName || request.aadharNumber) && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                            eKYC Information
                        </h2>
                        <div className="space-y-3">
                            {request.firstName && (
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">First Name:</span>
                                    <span className="text-gray-900 font-semibold">{request.firstName}</span>
                                </div>
                            )}
                            {request.dob && (
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Date of Birth:</span>
                                    <span className="text-gray-900 font-semibold">{request.dob}</span>
                                </div>
                            )}
                            {request.aadharPhone && (
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 font-medium">Aadhar Phone:</span>
                                    <span className="text-gray-900 font-semibold">{request.aadharPhone}</span>
                                </div>
                            )}
                            {request.aadharNumber && (
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500 font-medium">Aadhar Number:</span>
                                    <span className="text-gray-900 font-semibold font-mono">{request.aadharNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* WhatsApp Logs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        WhatsApp Logs
                    </h2>
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                        <div className="p-4 bg-green-50 rounded-full">
                            <MessageCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Connect via WhatsApp</h3>
                            <p className="text-sm text-gray-500 max-w-[250px] mx-auto mt-1">
                                Click below to open a direct WhatsApp chat with the client
                            </p>
                        </div>
                        <a
                            href={`https://wa.me/${request.contact?.phone?.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 group"
                        >
                            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors"></div>
                            <MessageCircle className="w-6 h-6" />
                            <span>Chat on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            {(request.aadharFile || request.rcFile || request.carPhoto) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                        Uploaded Documents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {request.aadharFile && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Aadhar Card</p>
                                <a href={request.aadharFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View Document</a>
                            </div>
                        )}
                        {request.rcFile && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">RC Document</p>
                                <a href={request.rcFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View Document</a>
                            </div>
                        )}
                        {request.carPhoto && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Car Photo</p>
                                <a href={request.carPhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View Photo</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
