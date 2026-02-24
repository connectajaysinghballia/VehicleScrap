import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-[300px] sm:w-[400px] rounded-lg" />
                    <Skeleton className="h-5 w-[200px] sm:w-[250px] rounded-md" />
                </div>
            </div>

            {/* Color Legend Skeleton */}
            <div className="bg-white dark:bg-[#0E192D] px-4 py-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <Skeleton className="h-4 w-32 mb-4 rounded-md" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>

            {/* Summary Data Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-[#0E192D] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-4">
                        <Skeleton className="w-14 h-14 rounded-xl" />
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-4 w-32 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Dashboard Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart Skeletons */}
                <div className="bg-white dark:bg-[#0E192D] p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-[400px] flex flex-col">
                    <Skeleton className="h-6 w-48 mb-8 rounded-md" />
                    <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 pt-4">
                        {[40, 70, 45, 90, 65, 30].map((height, i) => (
                            <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${height}%` }} />
                        ))}
                    </div>
                </div>
                {/* Pie Chart / Weekly Activity Skeleton */}
                <div className="bg-white dark:bg-[#0E192D] p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-[400px] flex flex-col items-center justify-center">
                    <Skeleton className="h-6 w-48 mb-8 self-start rounded-md" />
                    <div className="flex-1 flex items-center justify-center w-full">
                        <Skeleton className="h-48 w-48 sm:h-56 sm:w-56 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Market Feed Table Skeleton */}
            <div className="mt-8 bg-white dark:bg-[#0E192D] rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
                    <Skeleton className="h-6 w-32 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                    {/* Table Header */}
                    <div className="px-6 py-3 bg-gray-50 dark:bg-slate-900/50 grid grid-cols-4 sm:grid-cols-6 gap-4">
                        <Skeleton className="h-4 w-12 rounded" />
                        <Skeleton className="h-4 w-20 rounded" />
                        <Skeleton className="h-4 w-24 rounded col-span-2 hidden sm:block" />
                        <Skeleton className="h-4 w-16 rounded hidden sm:block" />
                        <Skeleton className="h-4 w-16 rounded justify-self-end" />
                    </div>

                    {/* Table Rows */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="px-6 py-4 grid grid-cols-4 sm:grid-cols-6 gap-4 items-center">
                            {/* Type Badge */}
                            <Skeleton className="h-6 w-16 rounded-full" />

                            {/* Customer info */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24 sm:w-32 rounded-md" />
                                <Skeleton className="h-3 w-20 sm:w-24 rounded-md" />
                            </div>

                            {/* Vehicle Details */}
                            <Skeleton className="h-4 w-full max-w-[200px] rounded-md col-span-2 hidden sm:block" />

                            {/* Date & Status */}
                            <Skeleton className="h-6 w-20 rounded-full hidden sm:block" />

                            {/* Actions */}
                            <Skeleton className="h-8 w-8 rounded-lg justify-self-end" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

