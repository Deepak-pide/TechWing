
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const loggedInLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/crops", label: "Crops" },
  { href: "/profile", label: "Profile" },
];

const adminLinks = [
  { href: "/admin/dashboard", label: "Console" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/settings", label: "Settings" },
];


const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];


export default function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { isAuthenticated, logout, loading, userRole } = useAuth();

  let navLinks;
  if (isAuthenticated) {
    navLinks = userRole === 'admin' ? adminLinks : loggedInLinks;
  } else {
    navLinks = loggedOutLinks;
  }
  
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline">TechWing</span>
            </Link>
        </div>
        
        {!isMobile && (
          <nav className="flex items-center justify-center flex-1 space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center">
          {!loading && (
             isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )
          )}
        </div>
      </div>
    </header>
  );
}
