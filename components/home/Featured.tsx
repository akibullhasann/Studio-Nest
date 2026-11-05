/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, MapPin, Star, Users } from "lucide-react";

type FeaturedStudio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  deposit?: number;
  capacity: number;
  address: string;
  imageUrl?: string[];
  overview?: string;
  rating?: number;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80";

const CATEGORY_COLORS: Record<string, string> = {
  "photo studio": "bg-sky-500/90 text-white",
  "film stage": "bg-rose-500/90 text-white",
  "podcast lounge": "bg-violet-500/90 text-white",
  "music suite": "bg-emerald-500/90 text-white",
  "dance floor": "bg-pink-500/90 text-white",
  "art ultimate studio": "bg-orange-500/90 text-white",
};

const getCategoryColor = (category?: string) =>
  CATEGORY_COLORS[category?.trim().toLowerCase() ?? ""] ?? "bg-amber-500 text-neutral-950";

const getRating = (rating?: number) =>
  typeof rating === "number" && rating > 0 ? rating.toFixed(1) : "New";

/* ------------------------------------------------------------------ */
/*  Small compact card                                                 */
/* ------------------------------------------------------------------ */

function StudioCard({ studio }: { studio: FeaturedStudio }) {
  const image = studio.imageUrl?.[0] || FALLBACK_IMAGE;

  return (
    <Link
      href={`/studios/${studio._id}`}
      className="group flex gap-3 rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/70 hover:shadow-lg hover:shadow-amber-500/10 sm:gap-4 sm:p-4"
    >
      {/* thumbnail */}
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
        <img
          src={image}
          alt={studio.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`w-fit max-w-full truncate rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${getCategoryColor(
            studio.category
          )}`}
        >
          {studio.category}
        </span>

        <h3 className="mt-1.5 line-clamp-1 text-sm font-semibold text-foreground sm:text-base">
          {studio.title}
        </h3>

        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          <span className="line-clamp-1">{studio.address}</span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="text-sm text-muted-foreground">
            <span className="text-base font-bold text-amber-500 sm:text-lg">
              ${studio.hourlyRate}
            </span>{" "}
            / hr
          </p>

          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-neutral-950 transition-transform duration-300 group-hover:translate-x-0.5 sm:size-8">
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured section (server component)                                */
/* ------------------------------------------------------------------ */

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-studio`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  const featured: FeaturedStudio[] = Array.isArray(data) ? data.slice(0, 5) : [];

  if (featured.length === 0) return null;

  const [large, ...compact] = featured;
  const largeImage = large.imageUrl?.[0] || FALLBACK_IMAGE;

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Header row ---------- */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-amber-700 uppercase dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-400">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Featured Spaces
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured <span className="text-amber-500">Creative</span> Workspaces
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Hand-picked studios that creators love — ready to book by the hour.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            View All Workspaces
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ---------- Cards ---------- */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[3fr_2fr] lg:items-stretch">
          {/* Large card */}
          <Link
            href={`/studios/${large._id}`}
            className="group relative block h-[380px] overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl hover:shadow-amber-500/10 sm:h-[440px] lg:h-[520px]"
          >
            <img
              src={largeImage}
              alt={large.title}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* bottom gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            {/* top badges */}
            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2 sm:inset-x-5 sm:top-5">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase backdrop-blur ${getCategoryColor(
                  large.category
                )}`}
              >
                {large.category}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {getRating(large.rating)}
              </span>
            </div>

            {/* bottom content */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
              <h3 className="line-clamp-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                {large.title}
              </h3>

              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/80">
                <MapPin className="size-4 shrink-0" />
                <span className="line-clamp-1">{large.address}</span>
              </p>

              <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" />
                    {large.capacity} guests
                  </span>
                  <span className="text-white">
                    <span className="text-lg font-bold text-amber-400">
                      ${large.hourlyRate}
                    </span>{" "}
                    / hr
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition-all group-hover:bg-amber-400">
                  View Details
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Compact cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {compact.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
