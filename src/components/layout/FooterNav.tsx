"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, User, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/crops", label: "Crops", icon: Wheat },
  { href: "/profile", label: "Profile", icon: User },
];

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="grid h-16 grid-cols-3">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-1 text-sm font-medium"
            >
              <Icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className={cn(isActive ? "text-primary" : "text-muted-foreground")}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
