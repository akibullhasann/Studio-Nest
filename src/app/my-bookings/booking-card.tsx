'use client'

import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    Ban,
    Calendar,
    CircleCheck,
    Clock,
    Hourglass,
    MapPin,
    Printer,
    Users,
} from "lucide-react";

import { apiUrl } from "@/src/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from 'react-toastify';

type BookingStatus = "cancelled" | "pending" | "confirmed"

type Booking = {
    _id?: string
    status?: string
    from?: string
    to?: string
    date?: string
    guests?: string | number
    total?: number
    totalPrice?: number
    price?: number
    studioImage?: string
    imageUrl?: string | string[]
    image?: string | string[]
    studioTitle?: string
    title?: string
    studioAddress?: string
    studioId?: string
}

// status -> tailwind styling (accent stripe + badge colors)
const STATUS_STYLES: Record<BookingStatus, { stripe: string; badge: string; icon: typeof Ban; label: string }> = {
    cancelled: {
        stripe: "border-l-destructive",
        badge: "bg-destructive/10 text-destructive",
        icon: Ban,
        label: "Cancelled",
    },
    pending: {
        stripe: "border-l-amber-500",
        badge: "bg-amber-500/10 text-amber-600",
        icon: Hourglass,
        label: "Pending Host Approval",
    },
    confirmed: {
        stripe: "border-l-emerald-500",
        badge: "bg-emerald-500/10 text-emerald-600",
        icon: CircleCheck,
        label: "Confirmed",
    },
}

function getStatus(status?: string) {
    const key = String(status ?? "pending").toLowerCase() as BookingStatus
    return STATUS_STYLES[key] ?? STATUS_STYLES.pending
}

// "10:00" + "14:00" -> "4 hrs"
function getDuration(from?: string, to?: string) {
    if (!from || !to) return null
    const [fh, fm] = from.split(":").map(Number)
    const [th, tm] = to.split(":").map(Number)
    const mins = th * 60 + tm - (fh * 60 + fm)
    if (Number.isNaN(mins) || mins <= 0) return null
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return m > 0 ? `${h}h ${m}m` : `${h} hrs`
}

function MyBookingsPage({ bookings }: { bookings: Booking[] }) {

    const router = useRouter();


    const handleCancelBooking = async (bookingId: string) => {
        const res = await fetch(apiUrl(`/my-bookings/${bookingId}`), {
            method: "PATCH"
        })
        const data = await res.json()

        if(data){
        toast.success("Booking cancelled successfully!");
        router.refresh();
    }
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            {/* ---------- Header ---------- */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Badge variant="secondary" className="uppercase tracking-wide">
                        <Calendar className="size-3.5" />
                        Your reservations
                    </Badge>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight">My Bookings</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Track shoot times, host approvals and cancellation status
                    </p>
                </div>
                <Link
                    href="/studios"
                    className={buttonVariants({ variant: "outline" })}
                >
                    Browse Studios <ArrowRight />
                </Link>
            </div>

            {/* ---------- List ---------- */}
            <div className="mt-6 flex flex-col gap-4">
                {!Array.isArray(bookings) || bookings.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
                            <p className="font-medium">No bookings yet</p>
                            <p className="text-sm text-muted-foreground">
                                Once you book a workspace, your reservations will show up here.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    bookings.map((booking: Booking, index: number) => {
                        const status = getStatus(booking.status)
                        const StatusIcon = status.icon
                        const duration = getDuration(booking.from, booking.to)
                        const price = booking.total ?? booking.totalPrice ?? booking.price
                        const image =
                            booking.studioImage ??
                            (Array.isArray(booking.imageUrl)
                                ? booking.imageUrl?.[0] // bookings save the whole gallery, show the first photo
                                : booking.imageUrl) ??
                            (Array.isArray(booking.image) ? booking.image?.[0] : booking.image)
                        const title = booking.studioTitle ?? booking.title ?? "Studio booking"
                        console.log("Single booking:", booking);

                        return (
                            <Card
                                key={booking._id ?? index}
                                className={`border-l-4 ${status.stripe}`}
                            >
                                <CardContent className="flex flex-wrap items-center gap-4 p-4">
                                    {/* thumbnail */}
                                    <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={title}
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center">
                                                <Calendar className="size-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    {/* core info */}
                                    <div className="min-w-[220px] flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant="outline" className={status.badge}>
                                                <StatusIcon className="size-3" />
                                                {status.label}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                ID: #{String(booking._id ?? "").slice(-6)}
                                            </span>
                                        </div>
                                        <h2 className="mt-1 font-semibold">{title}</h2>
                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <Calendar className="size-3.5" />
                                                {booking.date ?? "—"}
                                            </span>
                                            <span className="hidden sm:inline">•</span>
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="size-3.5" />
                                                {booking.from ?? "—"} – {booking.to ?? "—"}
                                                {duration && ` (${duration})`}
                                            </span>
                                            {booking.guests && (
                                                <>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Users className="size-3.5" />
                                                        {booking.guests}{" "}
                                                        {Number(booking.guests) > 1 ? "guests" : "guest"}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        {booking.studioAddress && (
                                            <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                                                <MapPin className="size-3.5" />
                                                {booking.studioAddress}
                                            </p>
                                        )}
                                    </div>

                                    {/* cost + actions */}
                                    <div className="ml-auto flex flex-col items-end gap-2">
                                        {price != null && (
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">
                                                    Total Charged / Due
                                                </p>
                                                <p className="text-xl font-bold text-primary">
                                                    ${price}
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            {booking.studioId && (
                                                <Link
                                                    href={`/studios/${booking.studioId}`}
                                                    className={buttonVariants({ variant: "outline", size: "sm" })}
                                                >
                                                    View Studio
                                                </Link>
                                            )}
                                            <Button variant="outline" size="sm">
                                                <Printer /> Receipt
                                            </Button>
                                            {String(booking.status ?? "pending").toLowerCase() !==
                                                "cancelled" && (
                                                    <Button
                                                        onClick={() => booking._id && handleCancelBooking(booking._id)}
                                                        variant="destructive"
                                                        size="sm"
                                                        className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                                                    >
                                                        <Ban /> Cancel Booking
                                                    </Button>
                                                )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
