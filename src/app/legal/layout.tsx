import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — grvty",
    default: "Legal — grvty",
  },
};

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Shipping Policy", href: "/legal/shipping" },
  { label: "Returns & Refunds", href: "/legal/returns" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative" style={{ background: "var(--background)" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[40%] rounded-full blur-[150px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <div className="mb-14 flex flex-col gap-5">
          <Link href="/" className="hud-label hover:opacity-50 transition-opacity w-fit">
            ← grvty
          </Link>

          {/* Legal nav pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-1.5 rounded-full font-sans text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="legal-content">
          {children}
        </div>
      </div>
    </div>
  );
}
