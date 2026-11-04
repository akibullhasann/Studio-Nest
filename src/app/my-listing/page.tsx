import { auth } from '@/src/lib/auth';
import React from 'react';
import { headers } from "next/headers";

import MyListingsClient from "./my-listings-client";

const fetchMyListings = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user

    return { user };
}

const MyListingPage = async () => {
    const { user } = await fetchMyListings();

    // not logged in -> show a friendly message instead of fetching with "undefined"
    if (!user) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Please log in to see your listings.
            </div>
        );
    }

    // NOTE: the backend has no /studio-details/:email route (it returns an HTML 404 page),
    // so we fetch ALL studios and filter by the owner on the server.
    const res = await fetch("http://localhost:5000/studio-details", { cache: 'no-store' });

    if (!res.ok) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Could not load your listings right now. Please try again.
            </div>
        );
    }

    const allStudios = await res.json();

    // addStudio saves the owner as host.email; older docs may use email / ownerEmail
    const listings = (Array.isArray(allStudios) ? allStudios : []).filter(
        (studio) =>
            (studio.ownerEmail ?? studio.host?.email ?? studio.email) === user.email
    );

    return <MyListingsClient listings={listings} userEmail={user.email} />;
};

export default MyListingPage;
