"use client";


import { authClient } from "@/lib/auth-client"
import { useState } from "react";
import { cn } from "cn";
import {
    ArrowRightIcon,
    CheckIcon,
    ClockIcon,
    ImagePlusIcon,
    LockIcon,
    MailIcon,
    MapPinIcon,
    PlusIcon,
    ShieldCheckIcon,
    SparklesIcon,
    TagIcon,
    UserIcon,
    UsersIcon,
    XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Dance Floor",
    "Art Ultimate Studio",
] as const;

const AMENITIES = [
    "Cyclorama Wall",
    "Soundproof Vocal Booth",
    "Neve / SSL Preamps",
    "4K DMX Lighting Grid",
    "Shure SM7B Multi-Mic",
    "Drive-In Loading Bay",
    "Hair & Makeup Vanity",
    "Green Screen Drops",
    "2-Ton Rigging Trusses",
    "Espresso Client Lounge",
    "Gigabit WiFi",
    "Electric Kiln & Wheels",
] as const;



type StudioForm = {
    title: string;
    category: string;
    capacity: string;
    hourlyRate: string;
    deposit: string;
    rating: string;
    address: string;
    imageUrl: string[];
    amenities: Set<string>;
    overview: string;
};

const MAX_IMAGES = 3;

const initialForm: StudioForm = {
    title: "",
    category: "",
    capacity: "",
    hourlyRate: "",
    deposit: "",
    rating: "",
    address: "",
    imageUrl: [""],
    amenities: new Set<string>(),
    overview: "",
};

type FormErrors = Partial<Record<"title" | "category" | "capacity" | "hourlyRate" | "rating" | "address" | "overview", string>>;

const inputClass =
    "h-11 rounded-xl border-border/80 bg-muted/40 px-3.5 text-sm before:pointer-events-none";

const AddStudio = () => {
    const [form, setForm] = useState<StudioForm>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const route = useRouter();

    const setField = (
        key: keyof Omit<StudioForm, "amenities" | "images">,
        value: string
    ) => setForm((prev) => ({ ...prev, [key]: value }));

    const toggleAmenity = (tag: string) => {
        setForm((prev) => {
            const next = new Set(prev.amenities);
            if (next.has(tag)) next.delete(tag);
            else next.add(tag);
            return { ...prev, amenities: next };
        });
    };

    const setImage = (index: number, value: string) =>
        setForm((prev) => {
            const images = [...prev.imageUrl];
            images[index] = value;
            return { ...prev, imageUrl: images };
        });

    const addImage = () =>
        setForm((prev) =>
            prev.imageUrl.length >= MAX_IMAGES
                ? prev
                : { ...prev, imageUrl: [...prev.imageUrl, ""] }
        );

    const removeImage = (index: number) =>
        setForm((prev) => ({
            ...prev,
            imageUrl: prev.imageUrl.filter((_, i) => i !== index),
        }));

     const { data: session } = authClient.useSession();
        const user = session?.user; 
    
    const HOST_USER = {
    name: user?.name,
    email: user?.email,
};

    const validate = (): FormErrors => {
        const next: FormErrors = {};
        if (!form.title.trim()) next.title = "Give your space a title so renters can find it.";
        if (!form.category) next.category = "Pick the discipline that fits your space.";
        if (!form.capacity || Number(form.capacity) <= 0)
            next.capacity = "Capacity must be at least 1 creator.";
        if (!form.hourlyRate || Number(form.hourlyRate) <= 0)
            next.hourlyRate = "Set an hourly rate above $0.";
        if (form.rating !== "" && (Number(form.rating) < 0 || Number(form.rating) > 5))
            next.rating = "Rating must be between 0 and 5.";
        if (!form.address.trim()) next.address = "A full address is required for bookings.";
        if (!form.overview.trim()) next.overview = "Describe your equipment and vibe — at least 30 characters.";
        else if (form.overview.trim().length < 30)
            next.overview = "Overview looks too short. Add a bit more detail (30+ characters).";
        return next;
    };

    // Handle form submission to send data to the backend server

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        const nextErrors = validate();
        console.log("Validation Errors:", nextErrors);
        setErrors(nextErrors);
        setSubmitted(true);

        if (Object.keys(nextErrors).length > 0) return;

        const payload = {
            ...form,
            images: form.imageUrl.map((u) => u.trim()).filter(Boolean),
            capacity: Number(form.capacity),
            hourlyRate: Number(form.hourlyRate),
            rating: Number(form.rating || 0),
            deposit: Number(form.deposit || 0),
            amenities: Array.from(form.amenities),
            host: HOST_USER,
        };
        console.log("Publishing studio listing:", payload);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });


        const data = await res.json();

        if (res.ok) {
            toast.success("Studio listing published successfully!");
           route.push("/my-studios");
          } else {
            toast.error(data.message || "Studio listing failed!");
           }
        


    };



    return (
        <section className="mt-8 pb-20">
            <div className="mx-auto w-[90%] max-w-6xl">
                {/* ── Page header ─────────────────────────────── */}
                <header className="flex flex-col space-y-2 border-b border-border pb-8">
                    <p className="w-fit rounded-3xl border border-amber-500/40 bg-amber-500/5 px-3 py-1.5 text-[10px] font-semibold sm:px-4 sm:py-2 sm:text-sm">
                        Host Panel · Only You
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Rent Out Your{" "}
                        <span className="text-amber-500">Creative Space</span>
                    </h1>
                    <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                        Open your studio to photographers, musicians, podcasters,
                        and filmmakers.
                    </p>
                </header>

                {/* ── Form + live preview ─────────────────────── */}
                <div className="mt-6 grid grid-cols-1 items-start gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1fr_360px] lg:gap-12 xl:gap-14">
                    <form onSubmit={handleSubmit} noValidate>
                        <FieldGroup className="gap-7 sm:gap-10">
                            {/* The basics */}
                            <FieldSet className="gap-5">
                                <FieldLegend className="flex items-center gap-2 text-lg font-bold">
                                    <SparklesIcon className="size-4 text-amber-500" />
                                    The Basics
                                </FieldLegend>
                                <FieldDescription>
                                    How renters will recognize and categorize
                                    your listing.
                                </FieldDescription>

                                <Field data-invalid={!!errors.title}>
                                    <FieldLabel htmlFor="studio-title">
                                        Studio Title / Space Name
                                    </FieldLabel>
                                    <Input
                                        id="studio-title"
                                        placeholder="e.g. Apex 4K Multi-Cam Podcast Studio"
                                        className={inputClass}
                                        value={form.title}
                                        onChange={(e) =>
                                            setField("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <FieldError>{errors.title}</FieldError>
                                    )}
                                </Field>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field data-invalid={!!errors.category}>
                                        <FieldLabel htmlFor="studio-category">
                                            Studio Discipline / Category
                                        </FieldLabel>
                                        <Select
                                            value={form.category}
                                            onValueChange={(value) =>
                                                setField("category", value as string)
                                            }
                                        >
                                            <SelectTrigger
                                                id="studio-category"
                                                className={cn(
                                                    "h-11 w-full rounded-xl border-border/80 bg-muted/40 text-sm",
                                                    !form.category && "text-muted-foreground"
                                                )}
                                            >
                                                <SelectValue placeholder="Choose a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <FieldError>{errors.category}</FieldError>
                                        )}
                                    </Field>

                                    <Field data-invalid={!!errors.capacity}>
                                        <FieldLabel htmlFor="studio-capacity">
                                            Max Creator Capacity
                                        </FieldLabel>
                                        <div className="relative">
                                            <UsersIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="studio-capacity"
                                                type="number"
                                                min={1}
                                                placeholder="10"
                                                className={cn(inputClass, "pl-9")}
                                                value={form.capacity}
                                                onChange={(e) =>
                                                    setField("capacity", e.target.value)
                                                }
                                            />
                                        </div>
                                        {errors.capacity && (
                                            <FieldError>{errors.capacity}</FieldError>
                                        )}
                                    </Field>
                                </div>
                            </FieldSet>

                            <FieldSeparator />

                            {/* Location */}
                            <FieldSet className="gap-5">
                                <FieldLegend className="flex items-center gap-2 text-lg font-bold">
                                    <MapPinIcon className="size-4 text-amber-500" />
                                    Location
                                </FieldLegend>
                                <FieldDescription>
                                    Renters meet here — give the full street
                                    address.
                                </FieldDescription>

                                <Field data-invalid={!!errors.address}>
                                    <FieldLabel htmlFor="studio-address">
                                        Location / Full Address
                                    </FieldLabel>
                                    <div className="relative">
                                        <MapPinIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="studio-address"
                                            placeholder="e.g. 520 W 28th St, Chelsea Arts District, New York, NY"
                                            className={cn(inputClass, "pl-9")}
                                            value={form.address}
                                            onChange={(e) =>
                                                setField("address", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.address && (
                                        <FieldError>{errors.address}</FieldError>
                                    )}
                                </Field>
                            </FieldSet>

                            <FieldSeparator />

                            {/* Pricing */}
                            <FieldSet className="gap-5">
                                <FieldLegend className="flex items-center gap-2 text-lg font-bold">
                                    <TagIcon className="size-4 text-amber-500" />
                                    Pricing
                                </FieldLegend>
                                <FieldDescription>
                                    Rates stay per hour. Deposits are optional
                                    but recommended.
                                </FieldDescription>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field data-invalid={!!errors.hourlyRate}>
                                        <FieldLabel htmlFor="studio-rate">
                                            Hourly Rate ($)
                                        </FieldLabel>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-muted-foreground">
                                                $
                                            </span>
                                            <Input
                                                id="studio-rate"
                                                type="number"
                                                min={0}
                                                placeholder="95"
                                                className={cn(inputClass, "pl-7")}
                                                value={form.hourlyRate}
                                                onChange={(e) =>
                                                    setField("hourlyRate", e.target.value)
                                                }
                                            />
                                        </div>
                                        {errors.hourlyRate && (
                                            <FieldError>{errors.hourlyRate}</FieldError>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="studio-deposit">
                                            Security Deposit ($)
                                        </FieldLabel>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-muted-foreground">
                                                $
                                            </span>
                                            <Input
                                                id="studio-deposit"
                                                type="number"
                                                min={0}
                                                placeholder="100"
                                                className={cn(inputClass, "pl-7")}
                                                value={form.deposit}
                                                onChange={(e) =>
                                                    setField("deposit", e.target.value)
                                                }
                                            />
                                        </div>
                                        <FieldDescription>
                                            Refundable — charged only if gear gets
                                            damaged.
                                        </FieldDescription>
                                    </Field>
                                </div>

                                <Field data-invalid={!!errors.rating}>
                                    <FieldLabel htmlFor="studio-rating">
                                        Rating (0 - 5)
                                    </FieldLabel>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-amber-500">
                                            ★
                                        </span>
                                        <Input
                                            id="studio-rating"
                                            type="number"
                                            min={0}
                                            max={5}
                                            step={0.1}
                                            placeholder="4.5"
                                            className={cn(inputClass, "pl-9")}
                                            value={form.rating}
                                            onChange={(e) => setField("rating", e.target.value)}
                                        />
                                    </div>
                                    <FieldDescription>
                                        Optional. Leave empty to show New on the listing.
                                    </FieldDescription>
                                    {errors.rating && <FieldError>{errors.rating}</FieldError>}
                                </Field>
                            </FieldSet>

                            <FieldSeparator />

                            {/* Media + amenities */}
                            <FieldSet className="gap-5">
                                <FieldLegend className="flex items-center gap-2 text-lg font-bold">
                                    <ImagePlusIcon className="size-4 text-amber-500" />
                                    Cover Photo &amp; Gear Tags
                                </FieldLegend>
                                <FieldDescription>
                                    Link a cover image, then tag every amenity
                                    your space includes.
                                </FieldDescription>

                                <Field>
                                    <FieldLabel>Studio Images (up to {MAX_IMAGES})</FieldLabel>
                                    <div className="flex flex-col gap-3">
                                        {form.imageUrl.map((url, i) => (
                                            <div key={i} className="relative">
                                                <ImagePlusIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id={`studio-image-${i}`}
                                                    placeholder={
                                                        i === 0
                                                            ? "Cover image URL (main photo)"
                                                            : `Image ${i + 1} URL`
                                                    }
                                                    className={cn(inputClass, "pl-9", form.imageUrl.length > 1 && "pr-10")}
                                                    value={url}
                                                    onChange={(e) => setImage(i, e.target.value)}
                                                />
                                                {form.imageUrl.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(i)}
                                                        aria-label={`Remove image ${i + 1}`}
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-destructive"
                                                    >
                                                        <XIcon className="size-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {form.imageUrl.length < MAX_IMAGES && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addImage}
                                            className="mt-1 w-fit rounded-xl"
                                        >
                                            <PlusIcon className="mr-1.5 size-4" />
                                            Add another image
                                        </Button>
                                    )}
                                    <FieldDescription>
                                        Direct link from ImgBB, Unsplash, or your CDN. First image is the cover.
                                    </FieldDescription>
                                </Field>

                                <Field>
                                    <FieldLabel>
                                        Included Amenities &amp; Production Gear
                                    </FieldLabel>
                                    <div className="flex flex-wrap gap-2">
                                        {AMENITIES.map((tag) => {
                                            const checked = form.amenities.has(tag);
                                            return (
                                                <div
                                                    key={tag}
                                                    className="flex items-center"
                                                >
                                                    <Checkbox
                                                        id={`amenity-${tag}`}
                                                        checked={checked}
                                                        onCheckedChange={() =>
                                                            toggleAmenity(tag)
                                                        }
                                                        className="sr-only peer"
                                                    />
                                                    <Label
                                                        htmlFor={`amenity-${tag}`}
                                                        data-checked={checked}
                                                        className={cn(
                                                            "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all select-none",
                                                            "peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                                                            checked
                                                                ? "border-amber-500/60 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                                                : "border-border bg-transparent text-muted-foreground hover:border-amber-400/50 hover:text-foreground"
                                                        )}
                                                    >
                                                        {checked ? (
                                                            <CheckIcon className="mr-1.5 inline size-3.5 align-[-2px]" />
                                                        ) : (
                                                            <PlusIcon className="mr-1.5 inline size-3.5 align-[-2px]" />
                                                        )}
                                                        {tag}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <FieldDescription>
                                        {form.amenities.size} tagged — tap to
                                        toggle.
                                    </FieldDescription>
                                </Field>
                            </FieldSet>

                            <FieldSeparator />

                            {/* Overview */}
                            <FieldSet className="gap-5">
                                <FieldLegend className="flex items-center gap-2 text-lg font-bold">
                                    <SparklesIcon className="size-4 text-amber-500" />
                                    Detailed Overview
                                </FieldLegend>

                                <Field data-invalid={!!errors.overview}>
                                    <FieldLabel htmlFor="studio-overview">
                                        Overview &amp; Equipment Specifications
                                    </FieldLabel>
                                    <Textarea
                                        id="studio-overview"
                                        rows={6}
                                        placeholder="Describe the layout, dimensions, cameras, consoles, acoustics…"
                                        className="min-h-32 rounded-xl border-border/80 bg-muted/40 px-3.5 text-sm"
                                        value={form.overview}
                                        onChange={(e) =>
                                            setField("overview", e.target.value)
                                        }
                                    />
                                    {errors.overview && (
                                        <FieldError>{errors.overview}</FieldError>
                                    )}
                                </Field>
                            </FieldSet>

                            <FieldSeparator />

                            {/* Read-only identity */}
                            <FieldSet className="gap-4">
                                <FieldLegend className="flex items-center gap-2 text-base font-semibold">
                                    <ShieldCheckIcon className="size-4 text-amber-500" />
                                    Verified Host Info
                                </FieldLegend>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field>
                                        <FieldLabel
                                            htmlFor="host-name"
                                            className="text-muted-foreground"
                                        >
                                            <UserIcon className="size-3.5" /> Your
                                            Name (read-only)
                                        </FieldLabel>
                                        <Input
                                            id="host-name"
                                            readOnly
                                            disabled
                                            value={user?.name}
                                            className={cn(inputClass, "bg-muted/70")}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel
                                            htmlFor="host-email"
                                            className="text-muted-foreground"
                                        >
                                            <MailIcon className="size-3.5" /> Your
                                            Email (read-only)
                                        </FieldLabel>
                                        <Input
                                            id="host-email"
                                            readOnly
                                            disabled
                                            value={user?.email}
                                            className={cn(inputClass, "bg-muted/70")}
                                        />
                                    </Field>
                                </div>
                                <FieldDescription className="flex items-center gap-1.5">
                                    <LockIcon className="size-3.5" />
                                    Synced from your sign-in — editing is disabled.
                                </FieldDescription>
                            </FieldSet>

                            {/* Submit */}
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="submit"
                                    className="h-12 rounded-xl bg-amber-500 text-base font-bold text-white hover:bg-amber-600"
                                >
                                    {submitted &&
                                        Object.keys(errors).length === 0
                                        ? "Listing Published ✓"
                                        : "Publish Studio Listing"}
                                    {submitted &&
                                        Object.keys(errors).length === 0 && (
                                            <ArrowRightIcon className="ml-2" />
                                        )}
                                </Button>
                                {submitted &&
                                    Object.keys(errors).length > 0 && (
                                        <p className="text-xs font-medium text-destructive">
                                            Please fix the highlighted fields above
                                            before publishing.
                                        </p>
                                    )}
                            </div>
                        </FieldGroup>
                    </form>

                    {/* ── Live preview: sticky desktop, inline mobile/tablet ── */}
                    <aside className="w-full lg:sticky lg:top-24">
                        <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase lg:hidden">
                            <SparklesIcon className="size-4 text-amber-500" />
                            Live Preview
                        </p>
                        <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm">
                            {/* Cover */}
                            {(() => {
                                const validImages = form.imageUrl.map((u) => u.trim()).filter(Boolean);
                                const cover = validImages[0];

                                return cover ? (
                                    <div className="relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={cover}
                                            alt="Studio cover preview"
                                            className="h-36 w-full object-cover sm:h-40 lg:h-44"
                                        />
                                        {validImages.length > 1 && (
                                            <span className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">
                                                <ImagePlusIcon className="size-3" />
                                                +{validImages.length - 1} more
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex h-36 w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground sm:h-40 lg:h-44">
                                        <ImagePlusIcon className="size-7" />
                                        <span className="text-xs">Cover image preview</span>
                                    </div>
                                );
                            })()}

                            <div className="flex flex-col gap-3 p-4">
                                <Badge
                                    variant="outline"
                                    className="w-fit border-amber-500/50 text-amber-600 dark:text-amber-400"
                                >
                                    {form.category || "Uncategorized"}
                                </Badge>
                                <p className="text-lg leading-tight font-bold">
                                    {form.title || "Your studio title appears here"}
                                </p>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-extrabold text-amber-500">
                                        ${form.hourlyRate || "—"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        /hour
                                        {form.deposit
                                            ? ` + $${form.deposit} deposit`
                                            : ""}
                                    </span>
                                </div>

                                <div className="space-y-1.5 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPinIcon className="size-4 shrink-0" />
                                        <span className="truncate">
                                            {form.address ||
                                                "Address appears here"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <UsersIcon className="size-4 shrink-0" />
                                        {form.capacity
                                            ? `Up to ${form.capacity} creators`
                                            : "Capacity appears here"}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <ClockIcon className="size-4 shrink-0" />
                                        Instant booking · 1 hr minimum
                                    </div>
                                </div>

                                <Separator />

                                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                    Amenities
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {form.amenities.size > 0 ? (
                                        Array.from(form.amenities).map((tag) => (
                                            <Badge
                                                key={tag}
                                                className="bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                            >
                                                {tag}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            No gear tagged yet
                                        </span>
                                    )}
                                </div>

                                <Separator />

                                <p className="line-clamp-4 text-xs leading-relaxed text-muted-foreground">
                                    {form.overview ||
                                        "Your overview will preview here as renters will read it."}
                                </p>
                            </div>
                        </div>

                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            This preview updates live as you type.
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default AddStudio;
