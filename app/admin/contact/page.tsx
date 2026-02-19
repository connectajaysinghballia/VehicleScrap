import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db"
import Contact from "@/models/Contact"
import { Mail, Phone, Calendar, MessageSquare, CheckCircle, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

async function getContacts() {
    await connectToDatabase()
    // lean() returns plain JS objects, easier to serialize
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean()
    // Convert _id and dates to strings/numbers to avoid serialization issues
    return contacts.map((contact: any) => ({
        ...contact,
        _id: contact._id.toString(),
        createdAt: contact.createdAt.toISOString(),
    }))
}

export default async function AdminContactPage() {
    const session = await getServerSession(authOptions)

    // Role Check
    if (!session || (session.user as any).role !== "admin") {
        redirect("/login")
    }

    const contacts = await getContacts()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Contact Requests</h1>
                <p className="text-gray-500 mt-2">Manage inquiries from the contact form.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">User</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Message Details</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        No contact requests found.
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((contact: any) => (
                                    <tr key={contact._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 align-top">
                                            <div className="space-y-1">
                                                <p className="font-bold text-gray-900">{contact.name}</p>
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                                                    {contact.email}
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                                                    {contact.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 align-top max-w-md">
                                            <div className="space-y-1">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    {contact.subject}
                                                </span>
                                                <p className="text-gray-700 text-sm leading-relaxed mt-1">
                                                    {contact.message}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 align-top">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {contact.status === 'resolved' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                                                    contact.status === 'read' ? <MessageSquare className="w-3 h-3 mr-1" /> :
                                                        <Clock className="w-3 h-3 mr-1" />}
                                                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 align-top whitespace-nowrap">
                                            <div className="flex items-center text-gray-500 text-sm" suppressHydrationWarning>
                                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                {new Date(contact.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1 ml-5" suppressHydrationWarning>
                                                {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
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
