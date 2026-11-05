import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getStudioCollection } from "@/src/lib/mongo";

// PUT /api/update-studio/:id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const studios = await getStudioCollection();
    const result = await studios.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
