
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, User, Wheat, BarChartHorizontal, Briefcase, ShieldCheck, ShoppingCart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const commonLinks = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/profile", label: "Profile", icon: User },
];

const loggedInLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChartHorizontal },
  { href: "/crops", label: "Crops", icon: Wheat },
  { href: "/profile", label: "Profile", icon: User },
];

const adminLinks = [
    { href: "/admin/dashboard", label: "Console", icon: ShieldCheck },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function FooterNav() {
  const pathname = usePathname();
  const { isAuthenticated, userRole } = useAuth();

  let navLinks;
  let navClass = "grid-cols-3";

  if (isAuthenticated) {
      if (userRole === 'admin') {
          navLinks = adminLinks;
          navClass = "grid-cols-3";
      } else {
          navLinks = loggedInLinks;
          navClass = "grid-cols-3";
      }
  } else {
      navLinks = commonLinks;
      navClass = "grid-cols-3";
  }


  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className={`grid h-16 ${navClass}`}>
        {navLinks.map((link) => {
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
