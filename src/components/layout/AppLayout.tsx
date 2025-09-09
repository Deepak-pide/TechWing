"use client";

import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./Header";
import FooterNav from "./FooterNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? <FooterNav /> : <Header />}
      <main className={`flex-1 ${isMobile ? 'pb-20 pt-4' : 'py-8'}`}>
        {children}
      </main>
    </div>
  );
}
