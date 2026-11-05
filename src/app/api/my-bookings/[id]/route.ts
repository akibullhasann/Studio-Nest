import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getBookingCollection } from "@/src/lib/mongo";

// GET /api/my-bookings/:email -> bookings for that email
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: email } = await params;
    const bookings = await getBookingCollection();
    const result = await bookings.find({ email }).toArray();
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PATCH /api/my-bookings/:id -> cancel a booking
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookings = await getBookingCollection();
    const result = await bookings.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "cancelled" } }
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
