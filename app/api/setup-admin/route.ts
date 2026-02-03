import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const emailParam = searchParams.get("email")

        // Hardcoded admin Fix
        const fixedEmail = "simaradmin@gmail.com"
        const fixedPassword = "simar-ad"

        await connectToDatabase()

        if (emailParam) {
            // Original promotion logic
            const user = await User.findOneAndUpdate(
                { email: emailParam },
                { role: "admin" },
                { new: true }
            )
            if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })
            return NextResponse.json({ message: `User ${emailParam} promoted!` })
        }

        // Create/Fix specific admin
        const hashedPassword = await bcrypt.hash(fixedPassword, 10)

        await User.findOneAndUpdate(
            { email: fixedEmail },
            {
                name: "Simar Admin",
                email: fixedEmail,
                password: hashedPassword,
                role: "admin"
            },
            { upsert: true, new: true }
        )

        return NextResponse.json({
            message: `Admin Fixed! Login with: ${fixedEmail} / ${fixedPassword}`
        })

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}
