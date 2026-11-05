import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getStudioCollection } from "@/src/lib/mongo";

// DELETE /api/delete-studio/:id
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const studios = await getStudioCollection();
    const result = await studios.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
