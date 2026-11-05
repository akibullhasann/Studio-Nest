import { NextResponse } from "next/server";
import { getStudioCollection } from "@/src/lib/mongo";

// GET /api/studio-details/:email -> studios owned by that email
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const studios = await getStudioCollection();
    const result = await studios.find({ "host.email": email }).toArray();
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
