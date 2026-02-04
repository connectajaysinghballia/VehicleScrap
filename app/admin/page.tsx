
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Shield, Clock, CheckCircle, Smartphone, MapPin, Car, Calendar, DollarSign, Users, FileText, Key, UploadCloud, ChevronRight } from "lucide-react"
import Link from "next/link"
import connectToDatabase from "@/lib/db"
import B2BRegistration from "@/models/B2BRegistration"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    // Role Check
    if (!session || (session.user as any).role !== "admin") {
        redirect("/")
    }

    // Fetch B2B Requests Count
    await connectToDatabase()
    const b2bCount = await B2BRegistration.countDocuments()

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-orange-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">Manage valuation requests and platform overview.</p>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/admin/valuations" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Recent Valuation</h3>
                            <p className="text-sm text-gray-500 mt-1">View latest requests</p>
                        </div>
                    </Link>

                    <Link href="/admin/partners" className="relative group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
                        {b2bCount > 0 && (
                            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                {b2bCount} New
                            </span>
                        )}
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">B2B Partners</h3>
                            <p className="text-sm text-gray-500 mt-1">Manage corporate accounts</p>
                        </div>
                    </Link>

                    <Link href="/admin/blogs/upload" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Upload Blogs</h3>
                            <p className="text-sm text-gray-500 mt-1">Publish new content</p>
                        </div>
                    </Link>

                    <Link href="/admin/b2b-generator" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">B2B Generator</h3>
                            <p className="text-sm text-gray-500 mt-1">Generate access keys</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
