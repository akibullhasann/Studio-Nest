"use client"
import { apiUrl } from "@/src/lib/api"
import {toast} from "react-toastify"
import {useRouter} from "next/navigation"
import { useState } from "react"
import { authClient } from "@/src/lib/auth-client"
import {
    Check,
    Clock,
    Heart,
    MapPin,
    Share2,
    Star,
    Users,
    Wallet,
} from "lucide-react"

import type { Studio } from "@/src/lib/studio";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// Sample reviews — swap with real data from the backend when available
const SAMPLE_REVIEWS = [
    {
        name: "Sarah M.",
        rating: 5,
        text: "Amazing space, exactly as described. The host was very responsive and check-in was smooth. Would definitely book again!",
        date: "2 weeks ago",
    },
    {
        name: "James K.",
        rating: 4,
        text: "Great atmosphere for our shoot. Equipment was solid and the noise treatment is excellent.Booking process was easy.",
        date: "1 month ago",
    },
]

export default function StudioDetails({ studio }: { studio: Studio }) {
   
    const router = useRouter();
    const images = studio.imageUrl ?? []
    const [selectedImage, setSelectedImage] = useState(0)

        const {data: session} = authClient.useSession();
        const user = session?.user;

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const toMinutes = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    };

    const hours = from && to ? (toMinutes(to) - toMinutes(from)) / 60 : 0;
    const total = hours > 0 ? hours * studio.hourlyRate : 0;
    const timeError = from && to && hours <= 0;
    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const formData = new FormData(e.target);
        const bookingData = Object.fromEntries(formData.entries());

        const bookingStudioData = {
            ...bookingData,
            studioId: studio._id,
            studioTitle: studio.title,
            hourlyRate: studio.hourlyRate,
            deposit: studio.deposit,
            total: total + (studio.deposit ?? 0),
            address: studio.address,
            rating: studio.rating,
            imageUrl: studio.imageUrl,
            name:user?.name,
            email:user?.email,
        }

        const res = await fetch(apiUrl("/bookings-list"),{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(bookingStudioData)
        })

        const data = await res.json();
        if(data){
            toast.success('booking has been confirmed');
            router.push('/my-bookings')
        }
    }


    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {/* ---------- Header ---------- */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="bg-primary text-primary-foreground">
                            {studio.category}
                        </Badge>
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="size-4" />
                            {studio.address}
                        </span>
                    </div>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                        {studio.title}
                    </h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 /> Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <Heart /> Wishlist
                    </Button>
                </div>
            </div>

            {/* ---------- Gallery ---------- */}
            <div className="mt-6">
                <div className="relative overflow-hidden rounded-2xl">
                    <img
                        src={images[selectedImage]}
                        alt={studio.title}
                        className="h-[420px] w-full object-cover"
                    />
                    <Badge className="absolute right-4 bottom-4">
                        Photo {selectedImage + 1} of {images.length}
                    </Badge>
                </div>
                <div className="mt-3 flex gap-3">
                    {images.map((url, index) => (
                        <button
                            key={url}
                            type="button"
                            onClick={() => setSelectedImage(index)}
                            className={
                                "overflow-hidden rounded-lg border-2 transition-opacity " +
                                (index === selectedImage
                                    ? "border-primary"
                                    : "border-transparent opacity-60 hover:opacity-100")
                            }
                        >
                            <img src={url} alt="" className="size-20 object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------- Specs ---------- */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                        <Users className="size-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Capacity</p>
                            <p className="font-semibold">{studio.capacity} people</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                        <Clock className="size-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Hourly rate</p>
                            <p className="font-semibold">${studio.hourlyRate}/hr</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                        <Wallet className="size-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Deposit</p>
                            <p className="font-semibold">${studio.deposit}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                        <Star className="size-5 fill-amber-400 text-amber-400" />
                        <div>
                            <p className="text-sm text-muted-foreground">Rating</p>
                            <p className="font-semibold">{studio.rating} / 5</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ---------- Overview ---------- */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">About this workspace</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {studio.overview}
                </p>
            </div>

            {/* ---------- Amenities ---------- */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Amenities</h2>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {(studio.amenities ?? []).map((amenity:string) => (
                        <div key={amenity} className="flex items-center gap-2 text-sm">
                            <Check className="size-4 text-primary" />
                            {amenity}
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------- Host ---------- */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Host details</h2>
                <Card className="mt-3">
                    <CardContent className="flex items-center gap-4 p-4">
                        <Avatar>
                            <AvatarImage src="/assests/logo.png" alt="Host avatar" />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">StudioNest Verified Host</p>
                            <p className="text-sm text-muted-foreground">
                                Typically responds within an hour
                            </p>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                            <Star className="size-3 fill-current" />
                            {studio.rating}
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            {/* ---------- Reviews ---------- */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {SAMPLE_REVIEWS.map((review) => (
                        <Card key={review.name}>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarFallback>
                                            {review.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{review.name}</p>
                                        <div className="flex items-center">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* ---------- Booking ---------- */}
            <Card className="mt-8 mb-10">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                    <div>
                        <p className="text-lg font-semibold">
                            ${studio.hourlyRate}{" "}
                            <span className="text-sm font-normal text-muted-foreground">/ hour</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            ${studio.deposit} refundable deposit
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger render={<Button size="lg" />}>
                            Book Workspace Now
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Book {studio.title}</DialogTitle>
                                <DialogDescription>
                                    ${studio.hourlyRate}/hour · ${studio.deposit} refundable deposit
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-2 gap-x-3 gap-y-3"
                            >
                                {/* Date */}
                                <Field className="col-span-2 gap-1.5 sm:col-span-1">
                                    <FieldLabel htmlFor="date" className="text-xs">Date</FieldLabel>
                                    <div className="relative">
                                        <CalendarIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-amber-500" />
                                        <Input
                                            id="date"
                                            name="date"
                                            type="date"
                                            min={today}
                                            required
                                            className="h-9 rounded-lg pl-8 text-sm"
                                        />
                                    </div>
                                </Field>

                                {/* Guests */}
                                <Field className="col-span-2 gap-1.5 sm:col-span-1">
                                    <FieldLabel htmlFor="guests" className="text-xs">
                                        Guests{" "}
                                        <span className="font-normal text-muted-foreground">
                                            (max {studio.capacity})
                                        </span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <UsersIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-amber-500" />
                                        <Input
                                            id="guests"
                                            name="guests"
                                            type="number"
                                            min="1"
                                            max={studio.capacity}
                                            defaultValue="1"
                                            required
                                            className="h-9 rounded-lg pl-8 text-sm"
                                        />
                                    </div>
                                </Field>

                                {/* From */}
                                <Field className="gap-1.5">
                                    <FieldLabel htmlFor="from" className="text-xs">From</FieldLabel>
                                    <div className="relative">
                                        <ClockIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-amber-500" />
                                        <Input
                                            id="from"
                                            name="from"
                                            type="time"
                                            required
                                            value={from}
                                            onChange={(e) => setFrom(e.target.value)}
                                            className="h-9 rounded-lg pl-8 text-sm"
                                        />
                                    </div>
                                </Field>

                                {/* To */}
                                <Field className="gap-1.5">
                                    <FieldLabel htmlFor="to" className="text-xs">To</FieldLabel>
                                    <div className="relative">
                                        <ClockIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-amber-500" />
                                        <Input
                                            id="to"
                                            name="to"
                                            type="time"
                                            required
                                            value={to}
                                            onChange={(e) => setTo(e.target.value)}
                                            className="h-9 rounded-lg pl-8 text-sm"
                                        />
                                    </div>
                                </Field>

                                {timeError && (
                                    <p className="col-span-2 -mt-1 text-xs font-medium text-red-500">
                                        End time must be after start time.
                                    </p>
                                )}

                                {/* Message */}
                                <Field className="col-span-2 gap-1.5">
                                    <FieldLabel htmlFor="message" className="text-xs">
                                        Message to host{" "}
                                        <span className="font-normal text-muted-foreground">(optional)</span>
                                    </FieldLabel>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        rows={2}
                                        placeholder="Anything the host should know…"
                                        className="min-h-0 resize-none rounded-lg text-sm"
                                    />
                                </Field>

                                {/* Price summary */}
                                <div className="col-span-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2.5 text-xs">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>
                                            ${studio.hourlyRate} × {hours > 0 ? hours : 0} hr
                                        </span>
                                        <span>${total}</span>
                                    </div>

                                    {studio.deposit ? (
                                        <div className="mt-0.5 flex justify-between text-muted-foreground">
                                            <span>Refundable deposit</span>
                                            <span>${studio.deposit}</span>
                                        </div>
                                    ) : null}

                                    <div className="mt-2 flex justify-between border-t border-amber-500/20 pt-2 text-sm font-bold">
                                        <span>Total</span>
                                        <span className="text-amber-500">${total + (studio.deposit ?? 0)}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <DialogFooter className="col-span-2 flex-row gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mr-auto h-9 rounded-lg text-sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!!timeError}
                                        className="h-9 rounded-lg bg-amber-500 text-sm font-bold text-white hover:bg-amber-600"
                                    >
                                        Confirm Booking
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    )
}
