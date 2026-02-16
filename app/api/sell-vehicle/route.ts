import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import SellVehicle from "@/models/SellVehicle"

export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const body = await req.json()

        // Basic validation could go here, but schema handles required fields
        const newEntry = await SellVehicle.create(body)

        return NextResponse.json(
            { message: "Sell vehicle request submitted successfully", data: newEntry },
            { status: 201 }
        )
    } catch (error: any) {
        console.error("Sell Vehicle Submission Error:", error)
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}
