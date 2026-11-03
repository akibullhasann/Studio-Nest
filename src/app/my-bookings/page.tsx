import React from 'react';
import { auth } from "@/src/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

import MyBookingsPage from "./booking-card";

const fetchMyBookings = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user

    return { user };
}

const MyBookings = async () => {
    const { user } = await fetchMyBookings();

    // not logged in -> show a friendly message instead of fetching with "undefined"
    if (!user) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Please log in to see your bookings.
            </div>
        );
    }

    // NOTE: single slash before "my-bookings" — the double slash made the backend return HTML and crashed res.json()
    const res = await fetch(`http://localhost:5000/my-bookings/${user.email}`, { cache: 'no-store' });

    if (!res.ok) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Could not load your bookings right now. Please try again.
            </div>
        );
    }

    const bookings = await res.json();

    // some older bookings were saved without imageUrl — look up the studio and fill it in
    const enriched = await Promise.all(
        (Array.isArray(bookings) ? bookings : []).map(async (booking) => {
            if (booking.imageUrl?.length || booking.studioImage || !booking.studioId) {
                return booking;
            }
            try {
                const studioRes = await fetch(
                    `http://localhost:5000/studio/${booking.studioId}`,
                    { cache: 'no-store' }
                );
                if (!studioRes.ok) return booking;
                const studio = await studioRes.json();
                return { ...booking, imageUrl: studio.imageUrl };
            } catch {
                return booking;
            }
        })
    );

    return <MyBookingsPage bookings={enriched} />;
};

export default MyBookings;
