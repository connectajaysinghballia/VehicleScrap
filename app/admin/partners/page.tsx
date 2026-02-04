"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, XCircle, Search, Phone, Mail, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function B2BPartnersPage() {
    const [registrations, setRegistrations] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchRegistrations()
    }, [])

    const fetchRegistrations = async () => {
        try {
            const res = await fetch("/api/b2b-register")
            const data = await res.json()
            if (data.data) {
                setRegistrations(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch registrations", error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredRegistrations = registrations.filter(reg =>
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.city.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Users className="w-8 h-8 text-blue-600" />
                            B2B Partners Management
                        </h1>
                        <p className="text-gray-500 mt-2">Manage your partnership network and review new applications.</p>
                    </div>
                </div>

                <Tabs defaultValue="requests" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
                        <TabsTrigger value="partners">Our Partners</TabsTrigger>
                        <TabsTrigger value="requests" className="relative">
                            Requests Submitted
                            {registrations.length > 0 && (
                                <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                    {registrations.length}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="partners" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Partners</CardTitle>
                                <CardDescription>List of currently active B2B partners.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
                                <p>No active partners yet.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="requests" className="mt-0">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <CardTitle>New Requests</CardTitle>
                                        <CardDescription>Review applications from potential partners.</CardDescription>
                                    </div>
                                    <div className="relative w-full md:w-64">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            placeholder="Search applicants..."
                                            className="pl-8"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="text-center py-10">Loading requests...</div>
                                ) : filteredRegistrations.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500">No requests found.</div>
                                ) : (
                                    <div className="grid gap-6">
                                        {filteredRegistrations.map((reg) => (
                                            <div key={reg._id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow relative group">
                                                <div className="flex flex-col md:flex-row gap-6 justify-between">
                                                    <div className="space-y-4 flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg uppercase">
                                                                {reg.name.substring(0, 2)}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-gray-900 text-lg">{reg.name}</h3>
                                                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                                                    <ClockIcon date={reg.createdAt} />
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                            <div className="flex items-start gap-2 text-gray-600">
                                                                <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                                                                <span>{reg.address}, {reg.city}, {reg.state} - {reg.pincode}</span>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                                    <a href={`tel:${reg.contactNumber}`} className="hover:text-blue-600">{reg.contactNumber}</a>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                                    <a href={`mailto:${reg.email}`} className="hover:text-blue-600">{reg.email}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row md:flex-col gap-3 justify-end border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 min-w-[200px]">
                                                        <Button className="w-full bg-green-600 hover:bg-green-700">
                                                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                                        </Button>
                                                        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                                            <XCircle className="w-4 h-4 mr-2" /> Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

function ClockIcon({ date }: { date: string }) {
    return (
        <span className="text-xs text-gray-400">
            {new Date(date).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
        </span>
    )
}
