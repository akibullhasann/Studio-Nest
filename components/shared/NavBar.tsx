"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client"
import { cn } from "cn";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,

  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Profile from "../Profile";


const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
];



const NavBar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // In here, user session

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log('from user',user);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-2 px-3 sm:px-4 lg:px-8">
        {/* Logo + brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Image
            src="/assests/logo.png"
            alt="Studio Nest logo"
            width={40}
            height={40}
            priority
            className="size-9 rounded-xl object-cover shadow-sm sm:size-10"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight sm:text-lg">
              Studio <span className="text-amber-500">Nest</span>
            </span>
            <span className="hidden text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Find &amp; Book Studios
            </span>
          </span>
        </Link>

        {/* Nav links (tablet and up) */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
                isActive(link.href) &&
                "bg-amber-400/10 font-semibold text-amber-600 dark:text-amber-400"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => {
              const root = document.documentElement;
              const dark = root.classList.toggle("dark");
              window.localStorage.setItem("theme", dark ? "dark" : "light");
            }}
          >
            <SunIcon className="dark:hidden" />
            <MoonIcon className="hidden dark:block" />
          </Button>



          {/* Hamburger menu drawer (mobile/tablet) */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 max-w-[85vw] sm:max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src="/assests/logo.png"
                    alt="Studio Nest logo"
                    width={32}
                    height={32}
                    className="size-8 rounded-lg object-cover"
                  />
                  Studio <span className="text-amber-500">Nest</span>
                </SheetTitle>
                <SheetDescription>Find &amp; book studios near you</SheetDescription>
              </SheetHeader>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                      isActive(link.href) &&
                      "bg-amber-400/10 font-semibold text-amber-600 hover:bg-amber-400/10 dark:text-amber-400"
                    )}
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>

              {/* Mobile user items */}


              <SheetFooter>
                <Button
                  variant="destructive"
                  className="w-full justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogOutIcon />
                  Log Out
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          
          {/* _________________________________________________________________________________ */}


           
{user ? (
  <Profile/>
) : (
  <div className="flex items-center gap-2">
    <Link
      href="/login"
      className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
    >
      Login
    </Link>

    <Link
      href="/signup"
      className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md active:scale-95"
    >
      Sign Up
    </Link>
  </div>
)}

          

        </div>

      </div>
    </header>
  );
};

/**
 * Theme persistence: the toggle above writes "theme" to localStorage and
 * toggles the `dark` class on <html>. The root layout applies it on load.
 */

export default NavBar;
