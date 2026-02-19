"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[600px] flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong!</h2>

                <p className="text-gray-500 mb-8">
                    We encountered an unexpected error while loading this page.
                    The technical details have been logged for our team.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={reset}
                        className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Try again
                    </button>

                    <p className="text-xs text-gray-400 mt-4">
                        Error Code: {error.digest || "Unknown"}
                    </p>
                </div>
            </div>
        </div>
    )
}

