"use client"

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    AreaChart,
    Area
} from "recharts"
import { motion } from "framer-motion"

interface DashboardChartsProps {
    valuationCounts: {
        quote: number
        sell: number
        exchange: number
        buy: number
    }
    b2bStats: {
        total: number
        pending: number
        approved: number
    }
    monthlyGrowthData: { name: string, value: number }[]
    activityData: { name: string, requests: number, partners: number }[]
}

export default function DashboardCharts({ valuationCounts, b2bStats, monthlyGrowthData, activityData }: DashboardChartsProps) {
    // Chart 1: Service Distribution
    const serviceData = [
        { name: "Free Quote", value: valuationCounts.quote, color: "#3b82f6" }, // Blue
        { name: "Sell Vehicle", value: valuationCounts.sell, color: "#22c55e" }, // Green
        { name: "Exchange", value: valuationCounts.exchange, color: "#a855f7" }, // Purple
        { name: "Buy Vehicle", value: valuationCounts.buy, color: "#f97316" }, // Orange
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

            {/* Chart 1: Service Distribution */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300"
            >
                <h3 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-6">Service Distribution</h3>
                <div className="h-[250px] w-full [&_.recharts-wrapper]:!outline-none [&_.recharts-surface]:!outline-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={serviceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                style={{ outline: 'none' }}
                            >
                                {serviceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} style={{ outline: 'none' }} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                itemStyle={{ color: "#1e293b", fontWeight: "600" }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Chart 2: Monthly Growth */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300"
            >
                <h3 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-6">Monthly Growth</h3>
                <div className="h-[250px] w-full [&_.recharts-wrapper]:!outline-none [&_.recharts-surface]:!outline-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                itemStyle={{ color: "#1e293b", fontWeight: "600" }}
                            />
                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Chart 3: Weekly Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors duration-300"
            >
                <h3 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-6">Weekly Activity Activity</h3>
                <div className="h-[250px] w-full [&_.recharts-wrapper]:!outline-none [&_.recharts-surface]:!outline-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="requests"
                                stroke="#059669"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRequests)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

        </div>
    )
}
