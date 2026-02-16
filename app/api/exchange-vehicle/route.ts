import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import ExchangeVehicle from "@/models/ExchangeVehicle"

export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const body = await req.json()

        const newEntry = await ExchangeVehicle.create(body)

        return NextResponse.json(
            { message: "Exchange vehicle request submitted successfully", data: newEntry },
            { status: 201 }
        )
    } catch (error: any) {
        console.error("Exchange Vehicle Submission Error:", error)
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}
