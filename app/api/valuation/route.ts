import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
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

        const valuationData = {
            ...body,
            userId: (session?.user as any)?.id || null, // Link to user if logged in
        }

        const valuation = await Valuation.create(valuationData)

        return NextResponse.json(
            { message: "Valuation request submitted successfully", id: valuation._id },
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
