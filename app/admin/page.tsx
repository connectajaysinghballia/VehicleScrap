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
    let b2bCount = 0
    try {
        await connectToDatabase()
        b2bCount = await B2BRegistration.countDocuments()
    } catch (error) {
        console.error("Error fetching B2B count:", error)
        // Fallback to 0 is already set
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
                        <Shield className="w-8 h-8 text-sky-600" />
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage valuation requests and platform overview.</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/admin/valuations" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-sky-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                        <FileText className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Recent Valuation</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">View latest requests</p>
                    </div>
                </Link>

                <Link href="/admin/partners" className="relative group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-sky-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4">
                    {b2bCount > 0 && (
                        <span className="absolute top-4 right-4 bg-sky-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-bounce shadow-md shadow-sky-200">
                            {b2bCount} New
                        </span>
                    )}
                    <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                        <Users className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">B2B Partners</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Manage corporate accounts</p>
                    </div>
                </Link>

                <Link href="/admin/blogs/upload" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-sky-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                        <UploadCloud className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Upload Blogs</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Publish new content</p>
                    </div>
                </Link>

                <Link href="/admin/b2b-generator" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-sky-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                        <Key className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">B2B Generator</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Generate access keys</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
