import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/destinations", label: "Destinations", active: false },
  { href: "/add-destination", label: "Add Destination", active: false },
  { href: "/my-bookings", label: "My Bookings", active: false },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: primary links */}
        <ul className="flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  link.active
                    ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-tight text-[#00A8E8]"
        >
          Wanderlast
        </Link>

        {/* Right: account links */}
        <div className="flex items-center gap-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-[#00A8E8]"
          >
            <User className="size-4" />
            Profile
          </Link>
          <Link
            href="/login"
            className="text-sm text-foreground transition-colors hover:text-[#00A8E8]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm text-foreground transition-colors hover:text-[#00A8E8]"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
