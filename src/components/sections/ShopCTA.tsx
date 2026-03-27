"use client";

import { useEffect, useRef, useState } from "react";

function InstagramDM() {
  const messages = [
    { from: "user", text: "Hey! I want to order a grvty lamp 🔥" },
    { from: "them", text: "Hey! 👋 Which color are you feeling?" },
    { from: "user", text: "The warm gold one please" },
    { from: "them", text: "Perfect choice ✨ Milan studio, ships in ~2 weeks" },
    { from: "them", text: "Send me your address and I'll get it sorted!" },
  ];

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ fontSize: 11, fontWeight: 600 }}>
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>●●●</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="flex items-center gap-3 px-3 py-2 border-b" style={{ borderColor: "#f0f0f0" }}>
        <button className="p-1 opacity-50">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="rounded-full shrink-0 flex items-center justify-center text-white font-black"
          style={{ width: 32, height: 32, background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", fontSize: 11 }}>
          g
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span style={{ fontSize: 12, fontWeight: 700 }}>grvty</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#3897f0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 9, color: "#999" }}>Active now</span>
        </div>
        <div className="ml-auto flex gap-3 opacity-50">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-2 px-3 py-3 overflow-hidden">
        {messages.map((msg, i) => (
          <div key={i} className="flex" style={{ justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%",
              padding: "6px 11px",
              borderRadius: msg.from === "user" ? "16px 16px 3px 16px" : "16px 16px 16px 3px",
              background: msg.from === "user" ? "#3897f0" : "#efefef",
              color: msg.from === "user" ? "#fff" : "#262626",
              fontSize: 11,
              lineHeight: 1.4,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 border-t" style={{ borderColor: "#f0f0f0" }}>
        <div className="flex-1 rounded-full flex items-center px-3"
          style={{ background: "#f5f5f5", height: 30, fontSize: 11, color: "#aaa" }}>
          Message…
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3897f0">
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
        </svg>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative shrink-0" style={{ width: 210, height: 440 }}>
      <div className="absolute inset-0" style={{
        borderRadius: 38,
        boxShadow: "0 48px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
        background: "#111",
      }} />
      <div className="absolute" style={{ left: -3, top: 86, width: 3, height: 26, background: "#2a2a2a", borderRadius: 2 }} />
      <div className="absolute" style={{ left: -3, top: 118, width: 3, height: 26, background: "#2a2a2a", borderRadius: 2 }} />
      <div className="absolute" style={{ right: -3, top: 102, width: 3, height: 44, background: "#2a2a2a", borderRadius: 2 }} />
      <div className="absolute overflow-hidden" style={{ inset: 9, borderRadius: 30, background: "#fff" }}>
        <div className="absolute z-10" style={{
          top: 10, left: "50%", transform: "translateX(-50%)",
          width: 80, height: 26, background: "#111", borderRadius: 18,
        }} />
        <InstagramDM />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        borderRadius: 38,
        background: "linear-gradient(130deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      }} />
    </div>
  );
}

export function ShopCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 w-full min-h-screen flex items-center px-10 md:px-16 py-20"
    >
      {/* Left: lamp space */}
      <div className="hidden md:block flex-1" />

      {/* Right: headline + phone + CTA */}
      <div
        className="w-full md:w-[52%] flex flex-col gap-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(28px)",
          transition: "opacity 1s ease, transform 1s ease",
          transitionDelay: "60ms",
        }}
      >
        {/* Headline */}
        <div>
          <span
            className="text-[10px] font-black uppercase block mb-5"
            style={{ color: "var(--foreground)", opacity: 0.28, letterSpacing: "0.4em" }}
          >
            03 — Order
          </span>
          <h2
            className="font-sans font-black leading-[0.88] lowercase mb-4"
            style={{
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              letterSpacing: "-0.05em",
              color: "var(--foreground)",
            }}
          >
            bring it
            <br />
            <span style={{ opacity: 0.2 }}>to life.</span>
          </h2>
          <p style={{ color: "var(--foreground)", opacity: 0.4, fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
            One message is all it takes. Handcrafted in Milan, numbered, shipped worldwide.
          </p>
        </div>

        {/* Phone + info */}
        <div className="flex items-end gap-8">
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "rotate(-4deg)" : "translateY(32px) rotate(-4deg)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
          }}>
            <PhoneMockup />
          </div>

          <div className="flex flex-col gap-6 flex-1 pb-3">
            {/* Contact info — plain text, no card */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Email", value: "studio@grvty.art" },
                { label: "Location", value: "Milan, IT" },
                { label: "Lead time", value: "~2–3 weeks" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline justify-between border-b py-2"
                  style={{ borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)" }}>
                  <span className="text-[10px] uppercase tracking-[0.28em]"
                    style={{ color: "var(--foreground)", opacity: 0.28 }}>
                    {item.label}
                  </span>
                  <span className="text-[12px] font-semibold"
                    style={{ color: "var(--foreground)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://ig.me/m/grvty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 rounded-[1.25rem] font-sans font-black text-xs uppercase tracking-[0.28em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] group"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              <span>DM us on Instagram</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <p style={{ color: "var(--foreground)", opacity: 0.18, fontSize: 10 }}>
              Limited availability · Signed by the maker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
