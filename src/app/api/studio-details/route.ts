import { NextResponse } from "next/server";
import { getStudioCollection } from "@/src/lib/mongo";

// GET /api/studio-details -> all studios
export async function GET() {
  try {
    const studios = await getStudioCollection();
    const result = await studios.find({}).toArray();
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
