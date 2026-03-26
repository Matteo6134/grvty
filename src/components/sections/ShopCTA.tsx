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
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ fontSize: 11, fontWeight: 600 }}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>●●●</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* IG DM header */}
      <div className="flex items-center gap-3 px-3 py-2 border-b" style={{ borderColor: "#f0f0f0" }}>
        <button className="p-1 opacity-60">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Avatar */}
        <div
          className="rounded-full shrink-0 flex items-center justify-center text-white font-black"
          style={{
            width: 34,
            height: 34,
            background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            fontSize: 12,
          }}
        >
          g
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span style={{ fontSize: 13, fontWeight: 700 }}>grvty</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#3897f0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 10, color: "#999" }}>Active now</span>
        </div>
        <div className="ml-auto flex items-center gap-3 opacity-60">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col justify-end gap-2 px-3 py-3 overflow-hidden">
        {messages.map((msg, i) => {
          const isUser = msg.from === "user";
          return (
            <div
              key={i}
              className="flex"
              style={{ justifyContent: isUser ? "flex-end" : "flex-start" }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "7px 12px",
                  borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: isUser ? "#3897f0" : "#efefef",
                  color: isUser ? "#fff" : "#262626",
                  fontSize: 12,
                  lineHeight: 1.4,
                  fontWeight: 400,
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ borderColor: "#f0f0f0" }}>
        <div
          className="flex-1 rounded-full flex items-center px-3"
          style={{ background: "#f5f5f5", height: 34, fontSize: 12, color: "#aaa" }}
        >
          Message…
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3897f0">
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
        </svg>
      </div>
    </div>
  );
}

function PhoneMockup() {
  const phoneW = 220;
  const phoneH = 460;
  const bezel = 10;
  const radius = 40;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: phoneW,
        height: phoneH,
      }}
    >
      {/* Outer frame shadow */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
          background: "#1a1a1a",
        }}
      />

      {/* Side buttons: volume up/down left */}
      <div className="absolute" style={{ left: -3, top: 90, width: 3, height: 28, background: "#333", borderRadius: 2 }} />
      <div className="absolute" style={{ left: -3, top: 126, width: 3, height: 28, background: "#333", borderRadius: 2 }} />
      {/* Side button: power right */}
      <div className="absolute" style={{ right: -3, top: 110, width: 3, height: 48, background: "#333", borderRadius: 2 }} />

      {/* Screen */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: bezel,
          borderRadius: radius - bezel + 2,
          background: "#fff",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute z-10"
          style={{
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 28,
            background: "#1a1a1a",
            borderRadius: 20,
          }}
        />
        <InstagramDM />
      </div>

      {/* Reflection overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: radius,
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />
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
      className="relative z-10 w-full min-h-screen flex items-center px-10 md:px-16 py-16"
    >
      {/* Left: lamp space */}
      <div className="hidden md:block flex-1" />

      {/* Right: content + phone */}
      <div
        className="w-full md:w-[52%] flex flex-col gap-8 transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(32px)",
          transitionDelay: "80ms",
        }}
      >
        {/* Header */}
        <div>
          <span
            className="text-[10px] font-black uppercase tracking-[0.45em] mb-4 block"
            style={{ color: "var(--foreground)", opacity: 0.3 }}
          >
            03 — Order
          </span>
          <h2
            className="font-sans font-black leading-[0.9] lowercase mb-3"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              letterSpacing: "-0.05em",
              color: "var(--foreground)",
            }}
          >
            bring it
            <br />
            <span style={{ opacity: 0.22 }}>to life.</span>
          </h2>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--foreground)", opacity: 0.42, maxWidth: "320px" }}
          >
            It only takes one message. DM us on Instagram, tell us your color and we handle the rest — handcrafted in Milan, shipped worldwide.
          </p>
        </div>

        {/* Phone + info side by side */}
        <div className="flex items-end gap-8">
          {/* Phone mockup */}
          <div
            className="transition-all duration-1000 ease-out shrink-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) rotate(-4deg)" : "translateY(40px) rotate(-4deg)",
              transitionDelay: "200ms",
            }}
          >
            <PhoneMockup />
          </div>

          {/* Contact info + CTA stacked beside phone */}
          <div className="flex flex-col gap-5 flex-1 pb-4">
            {/* Contact rows */}
            <div className="glass-info rounded-[1.5rem] overflow-hidden">
              {[
                { label: "Inquiries", value: "studio@grvty.art" },
                { label: "Location", value: "Milan, IT" },
                { label: "Lead Time", value: "~2–3 weeks" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between px-5 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.28em] font-medium shrink-0"
                    style={{ color: "var(--foreground)", opacity: 0.32 }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-[12px] font-semibold font-sans text-right"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="https://ig.me/m/grvty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 rounded-[1.25rem] font-sans font-black text-xs uppercase tracking-[0.28em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] group"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              <span>DM us on Instagram</span>
              <span
                className="text-sm transition-transform duration-300 group-hover:translate-x-1"
              >→</span>
            </a>

            <p
              className="text-[10px] leading-relaxed"
              style={{ color: "var(--foreground)", opacity: 0.2 }}
            >
              Limited availability · Each piece signed by the maker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
