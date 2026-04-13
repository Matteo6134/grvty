"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Project",
    links: [
      { label: "The Lamp", href: "/#hero" },
      { label: "Story", href: "/#story" },
      { label: "Materials", href: "/#details" },
      { label: "Photos", href: "/#photos" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Shipping Policy", href: "/legal/shipping" },
      { label: "Returns & Refunds", href: "/legal/returns" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com/grvty.std", external: true },
      { label: "Email", href: "mailto:hello@grvty.std" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black pt-24 pb-12 px-6 md:px-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group inline-flex flex-col gap-1 w-fit">
              <span className="font-sans text-[8px] font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-60 transition-opacity">
                Objects with gravity
              </span>
              <h3 className="font-sans font-black text-3xl tracking-tighter lowercase leading-none">
                grvty.
              </h3>
            </Link>
            <p className="font-sans text-[11px] leading-relaxed opacity-40 max-w-[240px]">
              Raw matter. Considered form. A design project dedicated to the intersection of gravity and light.
            </p>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="flex flex-col gap-6">
              <span className="font-sans text-[9px] font-black uppercase tracking-[0.25em] opacity-20">
                {group.title}
              </span>
              <ul className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="font-sans text-[12px] font-bold opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-all flex items-center gap-2 group"
                    >
                      {link.label}
                      {link.external && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-sans text-[9px] font-medium opacity-20 uppercase tracking-[0.15em]">
              © 2026 grvty project · hand-finished in italy
            </span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
             <span className="font-sans text-[9px] font-black uppercase tracking-[0.2em] opacity-30">
               Stock Status: Made to Order
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
