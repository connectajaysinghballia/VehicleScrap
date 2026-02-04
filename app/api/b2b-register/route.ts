import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import B2BRegistration from "@/models/B2BRegistration"

export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const body = await req.json()

        const { name, address, pincode, city, state, contactNumber, email, userId } = body

        // Basic validation
        if (!name || !address || !pincode || !city || !state || !contactNumber || !email) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        }

        // Check for existing pending registration
        if (userId) {
            const existingPending = await B2BRegistration.findOne({ userId, status: 'pending' })
            if (existingPending) {
                return NextResponse.json(
                    { message: "You already have a pending registration request." },
                    { status: 400 }
                )
            }
        }

        // Create new registration
        const newRegistration = await B2BRegistration.create({
            name,
            address,
            pincode,
            city,
            state,
            contactNumber,
            email,
            userId,
        })

        return NextResponse.json(
            { message: "Registration successful", data: newRegistration },
            { status: 201 }
        )
    } catch (error: any) {
        console.error("B2B Registration Error:", error)
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        await connectToDatabase()
        const registrations = await B2BRegistration.find().sort({ createdAt: -1 })

        // Cache-control headers to prevent caching issues in admin panel
        return NextResponse.json(
            { message: "Registrations fetched successfully", data: registrations },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, max-age=0"
                }
            }
        )
    } catch (error: any) {
        console.error("B2B Fetch Error:", error)
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}
