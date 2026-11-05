import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const EXPLORE_LINKS = [
  { label: "All Workspaces", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Host Your Studio", href: "/addStudio" },
  { label: "Booking History", href: "/my-bookings" },
];

const CATEGORY_LINKS = [
  { label: "Photo Studios", href: "/studios?category=Photography" },
  { label: "Cinema & Sound Stages", href: "/studios?category=Cinema" },
  { label: "Podcast Lounges", href: "/studios?category=Podcast" },
  { label: "Music & Dolby Suites", href: "/studios?category=Music" },
  { label: "Art & Ceramic Workshops", href: "/studios?category=Art" },
];

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://x.com", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookies"];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-white text-muted-foreground">
      {/* amber hairline on top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      {/* soft glow decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-72 rounded-full bg-amber-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Top: brand + newsletter ---------- */}
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 p-1 ring-1 ring-amber-200">
                <Image
                  src="/assests/logo.png"
                  alt="Studio Nest logo"
                  width={44}
                  height={44}
                  className="size-10 rounded-xl object-cover"
                />
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Studio <span className="text-amber-500">Nest</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              The peer-to-peer marketplace connecting filmmakers, photographers,
              musicians, and creators with world-class production spaces.
            </p>
          </div>

          {/* newsletter card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-neutral-50/80 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-amber-500" />
                <p className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  Creator newsletter
                </p>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                New spaces, hosting tips and offers — twice a month.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="h-10 w-full rounded-xl border border-border bg-white pr-3 pl-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400/25"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Subscribe to the newsletter"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-95"
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground/70">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Middle: link columns ---------- */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 border-t border-border/60 py-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Explore */}
          <nav aria-labelledby="footer-explore" className="lg:col-span-3">
            <h2
              id="footer-explore"
              className="text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase"
            >
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-amber-600"
                  >
                    <span className="h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-labelledby="footer-categories" className="lg:col-span-4">
            <h2
              id="footer-categories"
              className="text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase"
            >
              Categories
            </h2>
            <ul className="mt-4 space-y-3">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-amber-600"
                  >
                    <span className="h-px w-0 bg-amber-500 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="sm:col-span-2 lg:col-span-5">
            <h2 className="text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
              Connect with us
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-white text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-border bg-neutral-50/80 px-4 py-3">
              <p className="text-xs text-muted-foreground">Need assistance?</p>
              <a
                href="mailto:support@studionest.io"
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700"
              >
                support@studionest.io
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Studio Nest. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
