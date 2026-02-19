import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Valuation from "@/models/Valuation"
import SellVehicle from "@/models/SellVehicle"
import ExchangeVehicle from "@/models/ExchangeVehicle"

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        console.log("eKYC API Request Body:", body)
        const { valuationId, ...ekycData } = body

        if (!valuationId) {
            return NextResponse.json(
                { message: "Valuation ID is required" },
                { status: 400 }
            )
        }

        await connectToDatabase()

        let updatedRecord;

        if (body.source === "sell-vehicle") {
            updatedRecord = await SellVehicle.findByIdAndUpdate(
                valuationId,
                {
                    $set: {
                        ...ekycData,
                        ekycStatus: "verified",
                        status: "pending" // Keep as pending or update as needed
                    }
                },
                { new: true }
            )
        } else if (body.source === "exchange-vehicle") {
            updatedRecord = await ExchangeVehicle.findByIdAndUpdate(
                valuationId,
                {
                    $set: {
                        ...ekycData,
                        ekycStatus: "verified",
                        status: "pending"
                    }
                },
                { new: true }
            )
        } else {
            // Default to Valuation model
            updatedRecord = await Valuation.findByIdAndUpdate(
                valuationId,
                {
                    $set: {
                        ...ekycData,
                        ekycStatus: "verified",
                        status: "reviewed"
                    }
                },
                { new: true }
            )
        }

        if (!updatedRecord) {
            return NextResponse.json(
                { message: "Record not found" },
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
            { message: "Internal server error", error: String(error) },
            { status: 500 }
        )
    }
}

