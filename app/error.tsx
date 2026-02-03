"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application Error:", error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-red-100 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
                <p className="text-gray-500 mb-8">
                    We encountered an unexpected error. Please try again or contact support if the issue persists.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={reset}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="block w-full text-gray-600 hover:bg-gray-100 font-semibold py-3 rounded-xl transition-all"
                    >
                        Go to Home
                    </a>
                </div>

                {process.env.NODE_ENV === "development" && (
                    <div className="mt-8 text-left bg-gray-100 p-4 rounded-lg overflow-auto max-h-48">
                        <p className="text-xs font-mono text-red-800 whitespace-pre-wrap">{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
