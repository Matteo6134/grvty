"use client";

import { useEffect, useRef, useState } from "react";

function InstagramDM() {
  const messages = [
    { from: "user", text: "Hey! I want to order a grvty lamp 🔥" },
    { from: "them", text: "Hey! 👋 Which color would you like?" },
    { from: "user", text: "Warm gold — the pyramid shape is perfect" },
    { from: "them", text: "Love that choice ✨ Based in Milan, ships in ~2 weeks" },
    { from: "them", text: "Drop your address and I'll sort it out!" },
  ];

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "#fff",
        fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Status bar */}
      <div
        className="flex items-center justify-between px-5 pt-2.5"
        style={{ fontSize: 10.5, fontWeight: 600, color: "#000", height: 36 }}
      >
        <span>9:41</span>
        <div className="flex items-center gap-1" style={{ opacity: 0.85 }}>
          <svg width="14" height="10" viewBox="0 0 14 10">
            <rect x="0" y="3" width="3" height="7" rx="0.5" fill="currentColor"/>
            <rect x="4" y="2" width="3" height="8" rx="0.5" fill="currentColor"/>
            <rect x="8" y="0.5" width="3" height="9.5" rx="0.5" fill="currentColor"/>
            <rect x="12" y="0" width="2" height="10" rx="0.5" fill="currentColor" opacity="0.3"/>
          </svg>
          <svg width="12" height="9" viewBox="0 0 12 9">
            <path d="M6 1.5C4 1.5 2.2 2.3 1 3.5L0 2.5C1.5 1 3.6 0 6 0s4.5 1 6 2.5L11 3.5C9.8 2.3 8 1.5 6 1.5z" fill="currentColor"/>
            <path d="M6 4C4.7 4 3.5 4.5 2.7 5.3L1.7 4.3C2.8 3.3 4.3 2.7 6 2.7s3.2.6 4.3 1.6L9.3 5.3C8.5 4.5 7.3 4 6 4z" fill="currentColor"/>
            <circle cx="6" cy="7.5" r="1.5" fill="currentColor"/>
          </svg>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: "1px solid rgba(0,0,0,0.35)", padding: 1.5, display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1, height: "100%", background: "#000", borderRadius: 1.5 }} />
          </div>
        </div>
      </div>

      {/* DM Header */}
      <div
        className="flex items-center gap-2.5 px-3 py-2 border-b"
        style={{ borderColor: "#f2f2f2" }}
      >
        <button style={{ padding: 4, opacity: 0.5 }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div
          className="flex items-center justify-center text-white font-black shrink-0"
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            fontSize: 11,
          }}
        >
          g
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span style={{ fontSize: 12, fontWeight: 700, color: "#000" }}>grvty.std</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#3897f0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 9, color: "#8e8e8e" }}>Active now</span>
        </div>
        <div className="ml-auto flex gap-3" style={{ opacity: 0.45 }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col justify-end gap-2 px-3 py-3 overflow-hidden">
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%",
              padding: "6px 12px",
              borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.from === "user" ? "#3897f0" : "#efefef",
              color: msg.from === "user" ? "#fff" : "#000",
              fontSize: 11.5,
              lineHeight: 1.4,
              fontWeight: 400,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 border-t"
        style={{ borderColor: "#f2f2f2" }}
      >
        <div
          className="flex-1 flex items-center px-3"
          style={{ background: "#f5f5f5", borderRadius: 20, height: 32, fontSize: 11.5, color: "#a0a0a0" }}
        >
          Message…
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3897f0">
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function IPhone17() {
  return (
    <div
      className="relative shrink-0"
      style={{ width: 218, height: 472, transform: "rotate(-4deg)" }}
    >
      {/* Titanium outer frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 46,
          background: "linear-gradient(160deg, #c8c8ca 0%, #a8a8aa 30%, #8e8e90 60%, #b0b0b2 100%)",
          boxShadow: `
            0 60px 90px -20px rgba(0,0,0,0.6),
            0 20px 40px -10px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.4),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      />

      {/* Screen inset */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: "3px 3px 3px 3px",
          borderRadius: 43,
          background: "#000",
        }}
      >
        {/* Screen content area */}
        <div
          className="absolute overflow-hidden"
          style={{ inset: 0, borderRadius: 43, background: "#fff" }}
        >
          <InstagramDM />
        </div>

        {/* Dynamic Island */}
        <div
          className="absolute z-10"
          style={{
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 30,
            background: "#000",
            borderRadius: 20,
          }}
        />
      </div>

      {/* Frame gloss overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 46,
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Side buttons — left */}
      {/* Action button */}
      <div
        className="absolute"
        style={{
          left: -2, top: 110,
          width: 3, height: 28,
          background: "linear-gradient(180deg,#aaa,#888,#aaa)",
          borderRadius: "2px 0 0 2px",
          boxShadow: "-1px 0 4px rgba(0,0,0,0.3)",
        }}
      />
      {/* Volume up */}
      <div
        className="absolute"
        style={{
          left: -2, top: 150,
          width: 3, height: 38,
          background: "linear-gradient(180deg,#aaa,#888,#aaa)",
          borderRadius: "2px 0 0 2px",
          boxShadow: "-1px 0 4px rgba(0,0,0,0.3)",
        }}
      />
      {/* Volume down */}
      <div
        className="absolute"
        style={{
          left: -2, top: 198,
          width: 3, height: 38,
          background: "linear-gradient(180deg,#aaa,#888,#aaa)",
          borderRadius: "2px 0 0 2px",
          boxShadow: "-1px 0 4px rgba(0,0,0,0.3)",
        }}
      />

      {/* Side button — right */}
      <div
        className="absolute"
        style={{
          right: -2, top: 155,
          width: 3, height: 56,
          background: "linear-gradient(180deg,#aaa,#888,#aaa)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "1px 0 4px rgba(0,0,0,0.3)",
        }}
      />

      {/* Triple camera module — top right */}
      <div
        className="absolute"
        style={{
          top: 18, right: 16,
          width: 52, height: 52,
          background: "linear-gradient(135deg,#2a2a2c,#1a1a1c)",
          borderRadius: 14,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* 3 lenses */}
        {[
          { top: 5, left: 5 }, { top: 5, right: 5 }, { bottom: 5, left: 5 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: 17, height: 17,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #383848, #12121a)",
              boxShadow: "0 0 0 1.5px rgba(255,255,255,0.12), 0 0 0 0.5px rgba(0,0,0,0.8)",
            }}
          >
            {/* Lens reflection */}
            <div style={{
              position: "absolute",
              width: 5, height: 5, borderRadius: "50%",
              top: 2.5, left: 2.5,
              background: "radial-gradient(circle, rgba(160,160,200,0.6), transparent)",
            }}/>
          </div>
        ))}
        {/* LiDAR */}
        <div style={{
          position: "absolute", bottom: 7, right: 7,
          width: 9, height: 9, borderRadius: "50%",
          background: "#0d0d10",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
        }}/>
      </div>
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

      {/* Right: content */}
      <div
        className="w-full md:w-[54%] flex flex-col gap-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(24px)",
          transition: "opacity 1s ease, transform 1s ease",
          transitionDelay: "60ms",
        }}
      >
        {/* Headline */}
        <div>
          <h2
            className="font-sans font-black leading-[0.88] lowercase"
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              letterSpacing: "-0.055em",
              color: "var(--foreground)",
            }}
          >
            bring it
            <br />
            <span style={{ opacity: 0.18 }}>to life.</span>
          </h2>
          <p
            className="mt-4"
            style={{
              color: "var(--foreground)",
              opacity: 0.38,
              fontSize: 13,
              lineHeight: 1.65,
              maxWidth: 280,
            }}
          >
            One message. Handcrafted in Milan, numbered, signed — shipped worldwide.
          </p>
        </div>

        {/* Phone + info row */}
        <div className="flex items-end gap-7">
          {/* iPhone 17 */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(36px)",
              transition: "opacity 1.1s ease 0.15s, transform 1.1s ease 0.15s",
            }}
          >
            <IPhone17 />
          </div>

          {/* Info + CTA */}
          <div className="flex flex-col gap-5 flex-1 pb-3">
            {[
              { label: "Contact", value: "@grvty.std" },
              { label: "Location", value: "Milan, IT" },
              { label: "Lead time", value: "~2–3 weeks" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between border-b pb-2"
                style={{ borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)" }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: "var(--foreground)", opacity: 0.26 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}

            <a
              href="https://instagram.com/grvty.std"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 rounded-[1.25rem] font-sans font-black text-[11px] uppercase tracking-[0.26em] transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.97] group"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              <span>DM @grvty.std</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <p style={{ color: "var(--foreground)", opacity: 0.16, fontSize: 10, lineHeight: 1.5 }}>
              Limited availability · Signed by the designer · @grvty.std
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
