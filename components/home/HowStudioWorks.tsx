import Link from "next/link";
import { ArrowRight, CalendarDays, Clapperboard, Search, Zap } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Find Your Space",
    description:
      "Browse photo, film, podcast, and music studios. Filter by city, price, category, and equipment to match your project.",
    icon: Search,
  },
  {
    step: "02",
    title: "Pick Your Time",
    description:
      "Choose a date and hourly slot, then see the full price upfront, including any deposit. No hidden fees.",
    icon: CalendarDays,
  },
  {
    step: "03",
    title: "Confirm in Seconds",
    description:
      "Send your booking request in one click. Your slot is held and the host is notified straight away.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Show Up and Create",
    description:
      "Arrive at the studio, plug in, and focus on your work. Everything is set up and ready for you.",
    icon: Clapperboard,
  },
];

const HowStudioWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 overflow-hidden border-y border-border/60 bg-muted/30"
    >
      {/* subtle amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-amber-700 uppercase dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Simple Booking
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            How Booking a Studio Works
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            From finding the right space to hitting record, it takes just four
            easy steps.
          </p>
        </div>

        {/* ---------- Steps ---------- */}
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ step, title, description, icon: Icon }) => (
            <li key={step} className="group relative">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-300/80 group-hover:shadow-lg group-hover:shadow-amber-500/5 dark:group-hover:border-amber-400/30">
                {/* icon + step number */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white dark:text-amber-400 dark:group-hover:text-neutral-950">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-3xl font-black tracking-tighter text-amber-500/15 transition-colors group-hover:text-amber-500/25">
                    {step}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                {/* connecting accent */}
                <span className="mt-5 block h-px w-8 bg-border transition-all duration-300 group-hover:w-full group-hover:bg-amber-400/60" />
              </div>
            </li>
          ))}
        </ol>

        {/* ---------- CTA ---------- */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 hover:shadow-lg active:scale-[0.98]"
          >
            Browse Studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowStudioWorks;
