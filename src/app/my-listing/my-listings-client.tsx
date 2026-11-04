"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "react-toastify"
import {
    Building2,
    ExternalLink,
    MapPin,
    Pencil,
    Plus,
    Star,
    Trash2,
} from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Listing = {
    _id: string
    title?: string
    category?: string
    address?: string
    hourlyRate?: number
    deposit?: number
    capacity?: number
    rating?: number
    overview?: string
    imageUrl?: string[]
}

export default function MyListingsClient({
    listings: initialListings,
    userEmail,
}: {
    listings: Listing[]
    userEmail: string
}) {
    const [listings, setListings] = useState<Listing[]>(initialListings)
    const [editing, setEditing] = useState<Listing | null>(null)
    const [deleting, setDeleting] = useState<Listing | null>(null)
    const [saving, setSaving] = useState(false)

    // ---------- Delete ----------
    const handleDelete = async () => {
        if (!deleting) return
        try {
            const res = await fetch(`http://localhost:5000/delete-studio/${deleting._id}`, {
                method: "DELETE",
            })
            if (!res.ok) throw new Error("delete failed")

            setListings((prev) => prev.filter((item) => item._id !== deleting._id))
            toast.success("Listing deleted successfully")
        } catch {
            toast.error("Could not delete the listing. Please try again.")
        } finally {
            setDeleting(null)
        }
    }

    // ---------- Update ----------
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editing) return
        setSaving(true)

        const formData = new FormData(e.currentTarget)
        const updates = Object.fromEntries(formData.entries())

        try {
            const res = await fetch(`http://localhost:5000/update-studio/${editing._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            })
            if (!res.ok) throw new Error("update failed")

            setListings((prev) =>
                prev.map((item) =>
                    item._id === editing._id ? { ...item, ...updates } as Listing : item
                )
            )
            toast.success("Listing updated successfully")
            setEditing(null)
        } catch {
            toast.error("Could not update the listing. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            {/* ---------- Header ---------- */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Badge variant="secondary" className="uppercase tracking-wide">
                        <Building2 className="size-3.5" />
                        Host dashboard
                    </Badge>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight">My Listings</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the spaces you publish — rates, capacity and availability
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Signed in as {userEmail}</p>
                </div>
                <Button asChild>
                    <Link href="/addStudio">
                        <Plus /> Add New Studio
                    </Link>
                </Button>
            </div>

            {/* ---------- List ---------- */}
            <div className="mt-6 flex flex-col gap-3">
                {listings.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
                            <p className="font-medium">No listings yet</p>
                            <p className="text-sm text-muted-foreground">
                                Publish your first studio space and it will show up here.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    listings.map((listing) => (
                        <Card key={listing._id} className="overflow-hidden">
                            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                                {/* thumbnail */}
                                <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24">
                                    {listing.imageUrl?.[0] ? (
                                        <img
                                            src={listing.imageUrl[0]}
                                            alt={listing.title ?? "Studio"}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex size-full items-center justify-center">
                                            <Building2 className="size-6 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* main info */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant="outline">{listing.category ?? "Studio"}</Badge>
                                        {listing.rating != null && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                <Star className="size-3 fill-amber-400 text-amber-400" />
                                                {listing.rating}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="mt-1 truncate font-semibold">
                                        {listing.title ?? "Untitled studio"}
                                    </h2>
                                    <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="size-3.5 shrink-0" />
                                        <span className="truncate">{listing.address ?? "—"}</span>
                                    </p>

                                    {/* meta chips — stacked under the title on every device */}
                                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                        <span className="rounded-md bg-muted px-2 py-1">
                                            Capacity · {listing.capacity ?? "—"}
                                        </span>
                                        <span className="rounded-md bg-muted px-2 py-1">
                                            Deposit · ${listing.deposit ?? 0}
                                        </span>
                                    </div>
                                </div>

                                {/* price + actions */}
                                <div className="flex shrink-0 items-center justify-between gap-4 border-t pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Hourly rate</p>
                                        <p className="text-xl font-bold text-primary">
                                            ${listing.hourlyRate ?? 0}
                                            <span className="text-sm font-normal text-muted-foreground">
                                                /hr
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="text-blue-600 hover:text-blue-700"
                                            asChild
                                        >
                                            <Link href={`/studios/${listing._id}`} aria-label="View studio">
                                                <ExternalLink />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="text-emerald-600 hover:text-emerald-700"
                                            onClick={() => setEditing(listing)}
                                            aria-label="Update listing"
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => setDeleting(listing)}
                                            aria-label="Delete listing"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* ---------- Update dialog ---------- */}
            <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update listing</DialogTitle>
                        <DialogDescription>Edit the details of your studio space.</DialogDescription>
                    </DialogHeader>
                    {editing && (
                        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input id="title" name="title" defaultValue={editing.title} required />
                            </Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field>
                                    <FieldLabel htmlFor="category">Category</FieldLabel>
                                    <Input id="category" name="category" defaultValue={editing.category} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="address">Address</FieldLabel>
                                    <Input id="address" name="address" defaultValue={editing.address} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <Field>
                                    <FieldLabel htmlFor="hourlyRate">Rate /hr</FieldLabel>
                                    <Input id="hourlyRate" name="hourlyRate" type="number" defaultValue={editing.hourlyRate} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="deposit">Deposit</FieldLabel>
                                    <Input id="deposit" name="deposit" type="number" defaultValue={editing.deposit} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
                                    <Input id="capacity" name="capacity" type="number" defaultValue={editing.capacity} />
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="overview">Overview</FieldLabel>
                                <Textarea id="overview" name="overview" rows={3} defaultValue={editing.overview} />
                            </Field>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={saving}>
                                    {saving ? "Saving…" : "Save changes"}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* ---------- Delete confirmation ---------- */}
            <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                        <AlertDialogDescription>
                            &ldquo;{deleting?.title ?? "This studio"}&rdquo; will be permanently removed from
                            your listings. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Delete listing
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
