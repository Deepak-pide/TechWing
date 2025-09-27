
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-headline">TechWing</h3>
          <p className="text-sm text-white/80">
            Your partner in modern farming. We provide smart drone solutions to boost productivity and sustainability.
          </p>
          <div className="space-y-2">
            <p className="font-semibold">Stay Updated</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-white/20 border-white/50 text-white placeholder:text-gray-300" />
              <Button type="submit" variant="secondary">Send</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Explore</h3>
          <ul className="space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
           <div className="space-y-3 text-sm">
                <a href="mailto:contact@techwing.com" className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors">
                    <Mail />
                    <span>contact@techwing.com</span>
                </a>
                <a href="tel:+911234567890" className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors">
                    <Phone />
                    <span>+91 123 456 7890</span>
                </a>
            </div>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
                 <li>
                    <Link href="/privacy-policy" className="text-white/80 hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link href="/terms-of-service" className="text-white/80 hover:text-primary transition-colors">
                        Terms of Service
                    </Link>
                </li>
            </ul>
        </div>

      </div>
      <div className="border-t border-white/20">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8">
            <p className="text-sm text-center sm:text-left text-white/60">
                &copy; {new Date().getFullYear()} TechWing. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
