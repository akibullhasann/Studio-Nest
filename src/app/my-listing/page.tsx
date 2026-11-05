export const instant = false;

import Link from "next/link";
import { auth } from '@/src/lib/auth';
import React from 'react';
import { headers } from "next/headers";
import { Building2, ExternalLink, MapPin, Plus, Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

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

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            {/* ---------- Header ---------- */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Badge variant="secondary" className="uppercase tracking-wide">
                        <Building2 className="size-3.5" />
                        Host dashboard
                    </Badge>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight">My Listings</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the spaces you publish — update details or remove a listing
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Signed in as {user.email} · {listings.length}{" "}
                        {listings.length === 1 ? "listing" : "listings"}
                    </p>
                </div>
                <Link href="/addStudio" className={buttonVariants()}>
                    <Plus /> Add New Studio
                </Link>
            </div>

            {/* ---------- List ---------- */}
            {listings.length === 0 ? (
                <Card className="mt-8">
                    <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
                        <p className="font-medium">No listings yet</p>
                        <p className="text-sm text-muted-foreground">
                            Publish your first studio space and it will show up here.
                        </p>
                        <Link
                            href="/addStudio"
                            className={buttonVariants({ variant: "outline" }) + " mt-2"}
                        >
                            <Plus /> Create a listing
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.map((studio) => (
                        <Card key={studio._id} className="overflow-hidden pt-0">
                            {/* cover image */}
                            <div className="relative h-44 w-full bg-muted">
                                {studio.imageUrl?.[0] ? (
                                    <img
                                        src={studio.imageUrl[0]}
                                        alt={studio.title ?? "Studio"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Building2 className="size-8 text-muted-foreground" />
                                    </div>
                                )}
                                <Badge className="absolute top-3 left-3">
                                    {studio.category ?? "Studio"}
                                </Badge>
                                <Badge variant="secondary" className="absolute right-3 bottom-3">
                                    ${studio.hourlyRate ?? 0}/hr
                                </Badge>
                            </div>

                            <CardContent className="space-y-3 p-4">
                                <div>
                                    <h2 className="truncate font-semibold">
                                        {studio.title ?? "Untitled studio"}
                                    </h2>
                                    <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="size-3.5 shrink-0" />
                                        <span className="truncate">
                                            {studio.address ?? "—"}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                    {studio.rating != null && (
                                        <span className="inline-flex items-center gap-1">
                                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                            {studio.rating}
                                        </span>
                                    )}
                                    <span>Capacity · {studio.capacity ?? "—"}</span>
                                    <span>Deposit · ${studio.deposit ?? 0}</span>
                                </div>

                                <div className="flex gap-2 border-t pt-3">
                                    <Link
                                        href={`/studios/${studio._id}`}
                                        className={
                                            buttonVariants({ variant: "outline", size: "sm" }) +
                                            " flex-1"
                                        }
                                    >
                                        <ExternalLink /> View
                                    </Link>
                                    <EditModal studio={studio as never} />
                                    <DeleteModal
                                        id={studio._id}
                                        name={studio.title ?? "This studio"}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyListingPage;
