import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Setting from "@/models/Setting"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/settings/scrapRates - Fetch the current scrap rate
export async function GET() {
    try {
        await connectToDatabase()

        // Fetch scrap price, default to 25 if not set
        const setting = await Setting.findOne({ key: "scrapPricePerKg" })
        const price = setting ? setting.value : 25

        return NextResponse.json({ scrapPricePerKg: price }, { status: 200 })
    } catch (error) {
        console.error("Error fetching scrap rates:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

// POST /api/settings/scrapRates - Update the scrap rate
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        // Only allow admin to change settings
        if ((session?.user as any)?.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { scrapPricePerKg } = body

        if (typeof scrapPricePerKg !== 'number' || scrapPricePerKg <= 0) {
            return NextResponse.json({ message: "Invalid price provided" }, { status: 400 })
        }

        await connectToDatabase()

        // Upsert the setting
        await Setting.findOneAndUpdate(
            { key: "scrapPricePerKg" },
            {
                value: scrapPricePerKg,
                description: "Global base rate for scrap calculation per kg"
            },
            { upsert: true, new: true }
        )

        return NextResponse.json(
            { message: "Scrap rate updated successfully", scrapPricePerKg },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error updating scrap rates:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
