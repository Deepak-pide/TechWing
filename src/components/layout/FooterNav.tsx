"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, User, Wheat, BarChartHorizontal, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const commonLinks = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/services", label: "Services", icon: Briefcase },
];

const loggedInLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChartHorizontal },
  { href: "/crops", label: "Crops", icon: Wheat },
  { href: "/profile", label: "Profile", icon: User },
];

const loggedOutLinks = [
    ...commonLinks,
    { href: "/profile", label: "Profile", icon: User },
];


export default function FooterNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const navLinks = isAuthenticated ? loggedInLinks : loggedOutLinks;

  // Reduce to 3-4 items for better mobile UX if needed, but 5 is common.
  // We'll keep 5 for logged in users for now.
  const linksToShow = isAuthenticated ? navLinks : [
      { href: "/", label: "Home", icon: LayoutGrid },
      { href: "/services", label: "Services", icon: Briefcase },
      { href: "/dashboard", label: "Dashboard", icon: BarChartHorizontal, disabled: true },
      { href: "/crops", label: "Crops", icon: Wheat, disabled: true },
      { href: "/profile", label: "Profile", icon: User },
  ]


  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className={`grid h-16 grid-cols-${isAuthenticated ? loggedInLinks.length : loggedOutLinks.length}`}>
        {(isAuthenticated ? loggedInLinks : loggedOutLinks).map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-1 text-xs font-medium"
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-[11px]",isActive ? "text-primary" : "text-muted-foreground")}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
