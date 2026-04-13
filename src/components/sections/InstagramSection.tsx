"use client";

import { useEffect, useRef, useState } from "react";

export function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full py-12 md:py-24 px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden"
    >
      <div 
        className="flex flex-col items-center text-center gap-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s cubic-bezier(0.2, 1, 0.3, 1)",
        }}
      >
        <div className="flex flex-col items-center gap-2">
            <span className="hud-label opacity-30">follow the journey</span>
            <a 
              href="https://instagram.com/grvty.std"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
            >
              <h2 className="font-sans font-black text-4xl md:text-5xl tracking-[0.02em] lowercase group-hover:text-[var(--accent)] transition-colors">
                @grvty.std
              </h2>
              <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 opacity-60 group-hover:opacity-100 transition-opacity">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                 </svg>
                 <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em]">View on Instagram</span>
              </div>
            </a>
        </div>
      </div>
    </div>
  );
}
