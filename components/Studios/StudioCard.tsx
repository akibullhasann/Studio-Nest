import Link from "next/link";

export type Studio = {
  _id: string;
  title: string;
  category: string;
  capacity: number;
  hourlyRate: number;
  deposit?: number;
  address: string;
  rating?: number;
  imageUrl?: string[];
  amenities?: string[];
  overview?: string;
};

const badgeColors: Record<string, string> = {
  "photo studio": "bg-sky-500/90 text-white",
  "film stage": "bg-rose-500/90 text-white",
  "podcast lounge": "bg-violet-500/90 text-white",
  "music suite": "bg-emerald-500/90 text-white",
  "dance floor": "bg-pink-500/90 text-white",
  "art ultimate studio": "bg-orange-500/90 text-white",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80";

export default function StudioCard({ studio }: { studio: Studio }) {
  const image = studio.imageUrl?.[0] || FALLBACK_IMAGE;

  const badge =
    badgeColors[studio.category?.trim().toLowerCase()] ??
    "bg-amber-500 text-black";

  const hasRating = typeof studio.rating === "number" && studio.rating > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10">
      {/* ছবি */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={studio.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

        {/* category badge */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${badge}`}
        >
          {studio.category}
        </span>

        {/* rating */}
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <span className="text-amber-400">★</span>
          {hasRating ? studio.rating!.toFixed(1) : "New"}
        </span>
      </div>

      {/* তথ্য */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold capitalize text-white">
          {studio.title}
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
          <span>📍</span>
          <span className="line-clamp-1">{studio.address}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-gray-400">
            <span className="text-2xl font-extrabold text-amber-400">
              ${studio.hourlyRate}
            </span>
            <span className="text-sm"> / hour</span>
          </p>

          <Link
            href={`/studios/${studio._id}`}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}