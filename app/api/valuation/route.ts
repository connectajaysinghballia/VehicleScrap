import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import Setting from "@/models/Setting"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()

        // Basic validation
        if (!body.vehicleType || !body.vehicleNumber || !body.contact?.phone) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        await connectToDatabase()

        // Fetch dynamic scrap rate per kg
        const setting = await Setting.findOne({ key: "scrapPricePerKg" })
        const scrapPricePerKg = setting ? setting.value : 25 // Fallback to 25/kg

        // Calculate estimated value (Weight is in tons. 1 Ton = 1000 Kg)
        const weightInTons = parseFloat(body.vehicleWeight) || 0;
        const estimatedValue = weightInTons * 1000 * scrapPricePerKg;

        const valuationData = {
            ...body,
            estimatedValue, // Store the calculated real value
            userId: (session?.user as any)?.id || null, // Link to user if logged in
        }

        const valuation = await Valuation.create(valuationData)

        return NextResponse.json(
            {
                message: "Valuation request submitted successfully",
                id: valuation._id,
                estimatedValue
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Valuation submission error:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}

