"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function ProfileError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Profile Error:", error)
    }, [error])

    return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load profile</h2>
                <p className="text-gray-500 mb-8">
                    We encountered an error while loading your profile data. Please check your connection and try again.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={reset}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>

                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left overflow-auto max-h-32">
                            <p className="text-xs font-mono text-red-600 break-all">
                                {error.message || "Unknown error occurred"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
