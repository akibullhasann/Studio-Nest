import { NextResponse } from "next/server";
import { getStudioCollection } from "@/src/lib/mongo";

// POST /api/add-studio -> create a studio listing
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const studios = await getStudioCollection();
    const result = await studios.insertOne(data);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
