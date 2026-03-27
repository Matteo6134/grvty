"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

export function PhotosSection() {
  const main = useFadeIn(80);
  const side1 = useFadeIn(160);
  const side2 = useFadeIn(240);
  const side3 = useFadeIn(320);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-6 pt-32 pb-12 md:px-16 md:pt-36 md:pb-24">

      {/* Photo grid - Now 4 photos */}
      <div className="flex flex-col md:flex-row gap-4 flex-1 my-10 h-full">
        {/* Main large photo (Photo 1) */}
        <div
          ref={main.ref}
          className="w-full md:flex-1 rounded-[1.75rem] overflow-hidden relative aspect-[4/5] object-cover md:aspect-auto"
          style={{
            opacity: main.visible ? 1 : 0,
            transform: main.visible ? "none" : "translateY(28px)",
            transition: "opacity 1.1s ease, transform 1.1s ease",
            minHeight: "45vh",
            background: "var(--surface)",
            border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.06)",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 text-[var(--foreground)]">
            <svg className="w-12 h-12 mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">Main Product Shot</span>
          </div>
        </div>

        {/* Side photos column (Photos 2, 3, 4) */}
        <div className="grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-4 w-full md:w-[32%] h-[15vh] md:h-auto">
          {/* Photo 2 */}
          <div
            ref={side1.ref}
            className="rounded-[1.5rem] overflow-hidden relative bg-[var(--surface)]"
            style={{
              opacity: side1.visible ? 1 : 0,
              transform: side1.visible ? "none" : "translateX(24px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
              border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.06)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-[var(--foreground)]">
              <span className="font-mono text-[9px] tracking-widest uppercase text-center">Detail 1</span>
            </div>
          </div>

          {/* Photo 3 */}
          <div
            ref={side2.ref}
            className="rounded-[1.5rem] overflow-hidden relative bg-[var(--surface)]"
            style={{
              opacity: side2.visible ? 1 : 0,
              transform: side2.visible ? "none" : "translateX(24px)",
              transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
              border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.06)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-[var(--foreground)]">
              <span className="font-mono text-[9px] tracking-widest uppercase text-center">Detail 2</span>
            </div>
          </div>

          {/* Photo 4 */}
          <div
            ref={side3.ref}
            className="rounded-[1.5rem] overflow-hidden relative bg-[var(--surface)]"
            style={{
              opacity: side3.visible ? 1 : 0,
              transform: side3.visible ? "none" : "translateX(24px)",
              transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s",
              border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.06)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-[var(--foreground)]">
              <span className="font-mono text-[9px] tracking-widest uppercase text-center">Detail 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
