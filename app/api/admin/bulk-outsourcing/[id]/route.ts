import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import BulkOutsourcing from "@/models/BulkOutsourcing";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized: Only admins can view bulk submissions" },
                { status: 403 }
            );
        }

        await connectToDatabase();

        const submission = await BulkOutsourcing.findById(params.id);

        if (!submission) {
            return NextResponse.json(
                { message: "Submission not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, count: submission.entries?.length || 0, data: submission },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Bulk Outsourcing Fetch Single Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
