/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: "6", label: "Studio Categories" },
  { value: "100+", label: "Spaces Listed" },
  { value: "24 hrs", label: "Booking Window" },
  { value: "1 hr", label: "Minimum Booking" },
];

const COLLAGE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    alt: "Bright photography studio with large windows",
    className: "h-64 sm:row-span-2 sm:h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    alt: "Music studio with mixing desk and monitors",
    className: "h-56 sm:h-full lg:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
    alt: "Film crew working on a lit production set",
    className: "h-56 sm:h-full lg:col-span-2",
  },
];

const VALUES = [
  {
    number: "01",
    title: "Clear Pricing",
    description:
      "Every listing shows the hourly rate and deposit upfront, so there are no surprises at checkout.",
  },
  {
    number: "02",
    title: "Real Spaces",
    description:
      "Hosts share genuine photos, equipment lists and addresses, so you know what you are walking into.",
  },
  {
    number: "03",
    title: "Made for Creators",
    description:
      "From solo podcasters to full film crews, we design every feature around how creators actually work.",
  },
];

/* ------------------------------------------------------------------ */
/*  Fade-up on scroll                                                  */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page section                                                       */
/* ------------------------------------------------------------------ */

const AboutUs = () => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---------- 1. Hero ---------- */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-amber-700 uppercase dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500" />
            About StudioSpace
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Great Work Needs the{" "}
            <span className="text-amber-500">Right</span> Room
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            StudioSpace connects creators with studios they can book by the
            hour, so more people can make photos, films, podcasts and music
            without owning a studio.
          </p>
        </Reveal>

        {/* ---------- 2. Image collage ---------- */}
        <Reveal delay={100} className="mt-12 sm:mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:h-[520px] lg:grid-cols-3">
            {COLLAGE_IMAGES.map((image) => (
              <div
                key={image.src}
                className={cn(
                  "group overflow-hidden rounded-3xl border border-border transition-colors duration-300 hover:border-amber-400/70",
                  image.className
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- 3. Stats strip ---------- */}
        <Reveal delay={100} className="mt-14 sm:mt-20">
          <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "px-2 sm:px-6",
                  index % 2 === 1 && "border-l border-border",
                  index > 0 && "md:border-l md:border-border"
                )}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-black tracking-tight text-amber-500 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ---------- 4. Our story ---------- */}
        <div className="mt-16 grid gap-8 border-t border-border pt-14 sm:mt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:pt-20">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Why We Built This
            </h2>
            <span className="mt-5 block h-1 w-12 rounded-full bg-amber-500" />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Finding a good studio used to mean endless messages, unclear
                prices, and long waits for a reply. A great idea would stall
                before the first camera even turned on.
              </p>
              <p>
                We built StudioSpace to make it simple. Hosts list their space
                with real photos, gear and clear rates. Creators search, compare
                and book the hours they need, and everyone knows the cost
                upfront.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------- 5. Values ---------- */}
        <div className="mt-16 sm:mt-20">
          {VALUES.map((value, index) => (
            <Reveal key={value.number} delay={index * 80}>
              <div className="group grid gap-4 border-t border-border py-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-10 lg:grid-cols-[8rem_18rem_1fr]">
                <span className="text-5xl font-black tracking-tighter text-muted-foreground/30 transition-colors duration-300 group-hover:text-amber-500 sm:text-6xl">
                  {value.number}
                </span>

                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {value.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- 6. Call to action ---------- */}
        <Reveal className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-amber-400 to-amber-500 px-6 py-12 text-neutral-950 sm:px-10 sm:py-14 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-10 size-52 rounded-full bg-neutral-950/5 blur-2xl"
            />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Ready to Create Something Great?
              </h2>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/studios"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-neutral-50 transition-all hover:bg-neutral-900 active:scale-[0.98]"
                >
                  Browse Studios
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/addStudio"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-950/25 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-950/10"
                >
                  Become a Host
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutUs;
