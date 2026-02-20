import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Shield, Clock, CheckCircle, Smartphone, MapPin, Car, Calendar, DollarSign, Users, FileText, Key, UploadCloud, ChevronRight } from "lucide-react"
import Link from "next/link"
import connectToDatabase from "@/lib/db"
import B2BRegistration from "@/models/B2BRegistration"
import B2BPartner from "@/models/B2BPartner"
import Valuation from "@/models/Valuation"
import SellVehicle from "@/models/SellVehicle"
import ExchangeVehicle from "@/models/ExchangeVehicle"
import BuyVehicle from "@/models/BuyVehicle"
import DashboardCharts from "@/components/admin/DashboardCharts"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    // Role Check
    if (!session || (session.user as any).role !== "admin") {
        redirect("/")
    }

    // Fetch Data for Charts & Cards
    let b2bCount = 0
    let b2bTotal = 0
    let b2bPending = 0
    let b2bApproved = 0

    let quoteCount = 0
    let sellCount = 0
    let exchangeCount = 0
    let buyCount = 0
    let marketFeed: any[] = []
    let totalRequests = 0
    let totalApproved = 0
    let formattedTotalTons = "0.0"

    let formattedMonthlyGrowth: { name: string, value: number }[] = []
    let formattedWeeklyActivity: { name: string, requests: number, partners: number }[] = []

    try {
        await connectToDatabase()

        // Parallel Fetching for Performance
        const [
            b2bPendingCount,
            b2bPartnerCount,
            quoteRes,
            sellRes,
            exchangeRes,
            buyRes
        ] = await Promise.all([
            B2BRegistration.countDocuments({ status: 'pending' }),
            B2BPartner.countDocuments(),
            Valuation.countDocuments(),
            SellVehicle.countDocuments(),
            ExchangeVehicle.countDocuments(),
            BuyVehicle.countDocuments()
        ])

        b2bPending = b2bPendingCount
        b2bTotal = b2bPartnerCount + b2bPending // Active Partners + Pending Requests
        b2bCount = b2bPending // For the "New" badge

        quoteCount = quoteRes
        sellCount = sellRes
        exchangeCount = exchangeRes
        buyCount = buyRes

        // Market Feed Fetching
        const [
            latestQuotes,
            latestSells,
            latestExchanges,
            latestBuys
        ] = await Promise.all([
            Valuation.find().sort({ createdAt: -1 }).limit(5).lean(),
            SellVehicle.find().sort({ createdAt: -1 }).limit(5).lean(),
            ExchangeVehicle.find().sort({ createdAt: -1 }).limit(5).lean(),
            BuyVehicle.find().sort({ createdAt: -1 }).limit(5).lean(),
        ])

        marketFeed = [
            ...latestQuotes.map((item: any) => ({
                ...item,
                type: 'quote',
                customerName: item.contact?.name || "N/A",
                customerPhone: item.contact?.phone || "N/A",
                vehicleInfo: `${item.year} ${item.brand} ${item.model} (${item.vehicleType})`
            })),
            ...latestSells.map((item: any) => ({
                ...item,
                type: 'sell',
                customerName: item.name || "N/A",
                customerPhone: item.phone || "N/A",
                vehicleInfo: `${item.registrationYear} ${item.customBrand || item.brand} ${item.customModel || item.model}`
            })),
            ...latestExchanges.map((item: any) => ({
                ...item,
                type: 'exchange',
                customerName: item.customerName || "N/A",
                customerPhone: item.customerPhone || "N/A",
                vehicleInfo: `Old: ${item.oldVehicleBrand} ${item.oldVehicleModel} -> New: ${item.newVehicleBrand}`
            })),
            ...latestBuys.map((item: any) => ({
                ...item,
                type: 'buy',
                customerName: item.customerName || "N/A",
                customerPhone: item.customerPhone || "N/A",
                vehicleInfo: `Looking for: ${item.customBrand || item.vehicleBrand} ${item.customModel || item.vehicleModel}`
            }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);

        // Calculate Total Metrics
        totalRequests = quoteCount + sellCount + exchangeCount + buyCount

        // Calculate Total Approved
        const [
            approvedQuotes,
            approvedSells,
            approvedExchanges,
            approvedBuys
        ] = await Promise.all([
            Valuation.countDocuments({ status: 'approved' }),
            SellVehicle.countDocuments({ status: 'approved' }),
            ExchangeVehicle.countDocuments({ status: 'approved' }),
            BuyVehicle.countDocuments({ status: 'approved' })
        ])
        totalApproved = approvedQuotes + approvedSells + approvedExchanges + approvedBuys

        // Calculate Total Tons (from Valuation collection)
        // Note: fetch only vehicleWeight field to minimize data transfer
        const valuationsWithWeight = await Valuation.find({}, { vehicleWeight: 1 }).lean()
        let totalTons = 0
        valuationsWithWeight.forEach((v: any) => {
            if (v.vehicleWeight) {
                // simple parsing for "1500 kg", "1.5 tons", etc.
                const weightStr = v.vehicleWeight.toLowerCase().replace(/,/g, '')
                const num = parseFloat(weightStr)
                if (!isNaN(num)) {
                    if (weightStr.includes('kg')) {
                        totalTons += num / 1000
                    } else if (weightStr.includes('ton')) {
                        totalTons += num
                    } else {
                        // Default assuming kg if no unit, or just add raw number if it seems small? 
                        // Safer to assume kg if > 10, tons if < 10? 
                        // For now, let's assume raw numbers are KG if > 50, otherwise Tons.
                        if (num > 50) totalTons += num / 1000
                        else totalTons += num
                    }
                }
            }
        })

        // Format to 1 decimal place
        formattedTotalTons = totalTons.toFixed(1)


        // --- Real-time Chart Data Fetching ---

        // 1. Monthly Growth (Last 6 Months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1); // Start of the 6th month ago
        sixMonthsAgo.setHours(0, 0, 0, 0);

        const monthlyAggregation = [
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            }
        ];

        const [monthlyQuotes, monthlySells, monthlyExchanges, monthlyBuys] = await Promise.all([
            Valuation.aggregate(monthlyAggregation),
            SellVehicle.aggregate(monthlyAggregation),
            ExchangeVehicle.aggregate(monthlyAggregation),
            BuyVehicle.aggregate(monthlyAggregation)
        ]);

        const combinedMonthlyData = [...monthlyQuotes, ...monthlySells, ...monthlyExchanges, ...monthlyBuys];

        const monthlyTotals: { [key: string]: number } = {};

        // Initialize last 6 months with 0
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            monthlyTotals[key] = 0;
        }

        // Sum up all collections
        combinedMonthlyData.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            if (monthlyTotals[key] !== undefined) {
                monthlyTotals[key] += item.count;
            }
        });

        formattedMonthlyGrowth = Object.entries(monthlyTotals).map(([key, value]) => {
            const [year, month] = key.split('-');
            return {
                name: monthNames[parseInt(month) - 1],
                value: value
            };
        });


        // 2. Weekly Activity (Last 7 Days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const dailyAggregation = [
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                        dayOfWeek: { $dayOfWeek: "$createdAt" } // 1 (Sunday) - 7 (Saturday)
                    },
                    count: { $sum: 1 }
                }
            }
        ];

        const [dailyQuotes, dailySells, dailyExchanges, dailyBuys, dailyPartners, dailyRegistrations] = await Promise.all([
            Valuation.aggregate(dailyAggregation),
            SellVehicle.aggregate(dailyAggregation),
            ExchangeVehicle.aggregate(dailyAggregation),
            BuyVehicle.aggregate(dailyAggregation),
            B2BPartner.aggregate(dailyAggregation),
            B2BRegistration.aggregate(dailyAggregation)
        ]);

        const combinedDailyRequests = [...dailyQuotes, ...dailySells, ...dailyExchanges, ...dailyBuys];
        const combinedDailyPartners = [...dailyPartners, ...dailyRegistrations];

        const dailyTotals: { [key: string]: { requests: number, partners: number, dayOfWeek: number } } = {};
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Initialize last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            dailyTotals[key] = { requests: 0, partners: 0, dayOfWeek: d.getDay() + 1 }; // JS getDay is 0-6 (Sun-Sat), Mongo dayOfWeek is 1-7
        }

        combinedDailyRequests.forEach(item => {
            const key = `${item._id.year}-${item._id.month}-${item._id.day}`;
            if (dailyTotals[key] !== undefined) {
                dailyTotals[key].requests += item.count;
            }
        });

        combinedDailyPartners.forEach(item => {
            const key = `${item._id.year}-${item._id.month}-${item._id.day}`;
            if (dailyTotals[key] !== undefined) {
                dailyTotals[key].partners += item.count;
            }
        });

        formattedWeeklyActivity = Object.entries(dailyTotals).map(([key, data]) => ({
            name: dayNames[data.dayOfWeek - 1],
            requests: data.requests,
            partners: data.partners
        }));

    } catch (error) {
        console.error("Error fetching admin dashboard data:", error)
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tight">
                        <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        Novalytix Admin Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Overview of platform performance.</p>
                </div>
            </div>

            {/* Color Legend */}
            <div className="bg-white dark:bg-[#0E192D] px-4 py-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-2">Data Type Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200 dark:shadow-none"></div>
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400">Free Quote</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-200 dark:shadow-none"></div>
                        <span className="text-xs font-bold text-green-700 dark:text-green-400">Sell Vehicle</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-200 dark:shadow-none"></div>
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-400">Exchange</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-200 dark:shadow-none"></div>
                        <span className="text-xs font-bold text-orange-700 dark:text-orange-400">Buy Vehicle</span>
                    </div>
                </div>
            </div>

            {/* Summary Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Requests */}
                <div className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-2">
                        <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">{totalRequests}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Requests</p>
                </div>

                {/* Total Tons */}
                <div className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-2">
                        <UploadCloud className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">{formattedTotalTons} <span className="text-lg text-gray-400 font-bold">tons</span></h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Business Done</p>
                </div>

                {/* Total Partners */}
                <div className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-2">
                        <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">{b2bTotal}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Partners</p>
                </div>

                {/* Total Approved */}
                <div className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-2">
                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">{totalApproved}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Approved Requests</p>
                </div>
            </div>

            {/* Dashboard Charts */}
            <DashboardCharts
                valuationCounts={{
                    quote: quoteCount,
                    sell: sellCount,
                    exchange: exchangeCount,
                    buy: buyCount
                }}
                b2bStats={{
                    total: b2bTotal,
                    pending: b2bPending,
                    approved: b2bApproved
                }}
                monthlyGrowthData={formattedMonthlyGrowth}
                activityData={formattedWeeklyActivity}
            />

            {/* Market Feed Table */}
            <div className="mt-8 bg-white dark:bg-[#0E192D] rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                        Market Feed
                    </h2>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        Latest Activities
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-slate-400 font-medium border-b border-gray-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Vehicle Details</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {marketFeed.map((item: any) => (
                                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        {item.type === 'quote' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                                                Quote
                                            </span>
                                        )}
                                        {item.type === 'sell' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                                                Sell
                                            </span>
                                        )}
                                        {item.type === 'exchange' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
                                                Exchange
                                            </span>
                                        )}
                                        {item.type === 'buy' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
                                                Buy
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {item.customerName || "N/A"}
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">{item.customerPhone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {item.vehicleInfo}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-slate-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${item.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                            item.status === 'approved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                                'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/valuations/${item.type}/${item._id}`}
                                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {marketFeed.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No recent activity found throughout the market.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

