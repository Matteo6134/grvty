"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Shipping Policy", href: "/legal/shipping" },
  { label: "Returns & Refunds", href: "/legal/returns" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: "var(--background)" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[40%] rounded-full blur-[150px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 flex-1">
        
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6">
          {/* Logo Button */}
          <Link
            href="/"
            className="flex items-center justify-center ios-button cursor-pointer w-fit"
            style={{
              height: 40,
              padding: "0 18px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.05)",
            }}
            aria-label="Back to home"
          >
            <span
              className="font-black tracking-tighter"
              style={{ fontSize: 13, color: "var(--foreground)", letterSpacing: "-0.04em" }}
            >
              grvty
            </span>
          </Link>

          {/* Legal nav pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {LEGAL_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 rounded-full font-sans text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                  style={{
                    background: isActive ? "var(--accent)" : "rgba(255,255,255,0.04)",
                    border: isActive ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.07)",
                    color: isActive ? "#000000" : "var(--foreground)",
                    opacity: isActive ? 1 : 0.4,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.color = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = "0.4";
                      e.currentTarget.style.color = "var(--foreground)";
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="legal-content">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
