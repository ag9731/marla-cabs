"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const servicesDropdown = [
  { name: "Airport Transfers", href: "/services/airport-transfers" },
  { name: "Outstation Cabs", href: "/services/outstation-cabs" },
  { name: "Local City Rides", href: "/services/local-city-rides" },
  { name: "Corporate Travel", href: "/services/corporate-travel" },
  { name: "Wedding Cars", href: "/services/wedding-cars" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Fleet", href: "/fleet" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Marla Cabs</span>
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <nav className="hidden lg:flex lg:gap-x-8 items-center">
            <Link
              href="/"
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-accent",
                pathname === "/" ? "text-accent" : "text-foreground/80"
              )}
            >
              Home
            </Link>

            {/* Services Dropdown (Desktop) */}
            <div className="relative group">
              <Link
                href="/services"
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold leading-6 transition-colors hover:text-accent py-2",
                  pathname.startsWith("/services") ? "text-accent" : "text-foreground/80"
                )}
              >
                Services
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute left-0 top-full hidden w-56 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block transition-all">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-accent"
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navigation.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold leading-6 transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <Phone className="h-4 w-4 text-accent" />
              <span>+91 63668 19755</span>
            </div>
            <Link
              href="/book"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-transform hover:scale-105 active:scale-95"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background px-4 py-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl font-bold text-primary">Marla Cabs</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted",
                    pathname === "/" ? "text-accent" : "text-foreground"
                  )}
                >
                  Home
                </Link>

                {/* Services Dropdown (Mobile) */}
                <div>
                  <button
                    type="button"
                    className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    Services
                    <ChevronDown className={cn("h-5 w-5 transition-transform", mobileServicesOpen && "rotate-180")} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="mt-2 space-y-2 pl-6">
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-foreground/80 hover:bg-muted hover:text-accent"
                      >
                        All Services
                      </Link>
                      {servicesDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-foreground/80 hover:bg-muted hover:text-accent"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navigation.slice(1).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted",
                      pathname === item.href ? "text-accent" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-4">
                 <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>+91 63668 19755</span>
                </div>
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-accent text-accent-foreground text-center transition-transform hover:scale-105 active:scale-95"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
