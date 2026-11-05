import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getStudioCollection } from "@/src/lib/mongo";

// GET /api/studio/:id -> one studio
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const studios = await getStudioCollection();
    const result = await studios.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return NextResponse.json({ message: "Studio not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
