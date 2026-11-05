import { NextResponse } from "next/server";
import { getBookingCollection } from "@/src/lib/mongo";

// POST /api/bookings-list -> create a booking
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bookings = await getBookingCollection();
    const result = await bookings.insertOne(data);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
