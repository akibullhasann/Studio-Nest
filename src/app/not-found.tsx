import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Film,
  Home,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page not found | Studio Nest",
  description:
    "The page you are looking for could not be found. Head back home or explore studios on Studio Nest.",
};

const QUICK_LINKS = [
  { label: "About us", href: "/about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "My bookings", href: "/my-bookings" },
  { label: "List your studio", href: "/addStudio" },
];

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      {/* Dotted grid backdrop, faded toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 25%, transparent 80%)",
        }}
      />

      {/* Warm ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber-400/20 blur-3xl sm:h-[34rem] sm:w-[34rem] dark:bg-amber-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-8 -z-10 size-44 rounded-full bg-amber-300/10 blur-3xl sm:size-64"
      />

      {/* Floating set pieces */}
      <Film
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-[7%] hidden size-10 -rotate-12 text-amber-400/30 lg:block"
      />
      <Sparkles
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] bottom-24 hidden size-9 rotate-6 text-amber-400/40 lg:block"
      />
      <Compass
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-[13%] hidden size-7 -rotate-12 text-amber-400/20 xl:block"
      />

      <div className="relative w-full max-w-2xl text-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-amber-700 uppercase shadow-sm dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
          </span>
          Error 404 · Scene not found
        </span>

        {/* Viewfinder-framed 404 */}
        <div className="relative mx-auto mt-8 w-fit px-8 py-2">
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 size-5 rounded-tl-lg border-t-2 border-l-2 border-amber-400/50 sm:size-7"
          />
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 size-5 rounded-tr-lg border-t-2 border-r-2 border-amber-400/50 sm:size-7"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 size-5 rounded-bl-lg border-b-2 border-l-2 border-amber-400/50 sm:size-7"
          />
          <span
            aria-hidden="true"
            className="absolute right-0 bottom-0 size-5 rounded-br-lg border-r-2 border-b-2 border-amber-400/50 sm:size-7"
          />

          <p className="bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 bg-clip-text pb-1 text-[6.5rem] leading-none font-black tracking-tighter text-transparent drop-shadow-[0_18px_40px_rgba(245,158,11,0.18)] sm:text-[9rem] lg:text-[11rem]">
            404
          </p>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
          This page left the <span className="text-amber-500">set</span>.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
          The page you are looking for may have moved, been renamed, or never
          made it past pre-production. We will help you find your way back on
          location.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 active:translate-y-0 active:scale-[0.98] sm:w-auto"
          >
            <Home className="size-4" />
            Back to home
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>

          <Link
            href="/studios"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 active:translate-y-0 active:scale-[0.98] sm:w-auto dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
          >
            <Compass className="size-4" />
            Explore studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Popular stops
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {QUICK_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center gap-1">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-border"
                  />
                )}
                <Link
                  href={link.href}
                  className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
