"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./Header";
import FooterNav from "./FooterNav";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${isMobile && !isLoginPage ? 'pb-20' : ''} ${isLoginPage ? 'flex' : (isMobile ? 'pt-4' : 'py-8')}`}>
        {children}
      </main>
      {!isLoginPage && <Footer />}
      {isMobile && !isLoginPage && <FooterNav />}
    </div>
  );
}
