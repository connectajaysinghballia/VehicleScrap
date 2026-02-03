import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { valuationId, ...ekycData } = body

        if (!valuationId) {
            return NextResponse.json(
                { message: "Valuation ID is required" },
                { status: 400 }
            )
        }

        await connectToDatabase()

        // Find and update the valuation record
        const updatedValuation = await Valuation.findByIdAndUpdate(
            valuationId,
            {
                $set: {
                    ...ekycData,
                    ekycStatus: "verified", // Assuming auto-verify or marking as submitted
                    status: "reviewed" // Moving status forward
                }
            },
            { new: true }
        )

        if (!updatedValuation) {
            return NextResponse.json(
                { message: "Valuation record not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "eKYC Details updated successfully", success: true },
            { status: 200 }
        )

    } catch (error) {
        console.error("eKYC update error:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
