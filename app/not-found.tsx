import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center space-y-6">
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                        <FileQuestion className="w-12 h-12 text-orange-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100 text-xs font-bold text-gray-400">
                        404
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-orange-500/20"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
