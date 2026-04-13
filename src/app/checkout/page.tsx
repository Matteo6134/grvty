"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";
import { CheckoutForm } from "@/components/checkout/PaymentForm";
import Link from "next/link";

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/checkout", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setClientSecret(data.clientSecret);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "var(--background)" }}>

      {/* ── Cinematic "grvty" background text (same as ShopCTA / Footer) ── */}
      <div
        className="fixed inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[60%] flex items-end justify-center z-0"
        style={{ opacity: 0.04 }}
      >
        <span
          className="font-black leading-none translate-y-[20%] text-[40vw] tracking-[-0.08em] whitespace-nowrap"
          style={{ fontFamily: "var(--font-syne), sans-serif", color: "var(--foreground)" }}
        >
          grvty
        </span>
      </div>

      {/* Frosted glass over the background text */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backdropFilter: "blur(40px) saturate(150%)",
          background: "linear-gradient(to bottom, transparent 40%, var(--background) 95%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-[2] mix-blend-overlay"
        style={{ backgroundImage: "url('/noise.png')" }}
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[30%] -left-[10%] w-[55%] h-[55%] rounded-full blur-[140px] opacity-[0.08]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[5%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--foreground) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-16 pt-28 pb-16 min-h-screen flex flex-col">

        {/* Two-column layout */}
        <div className="flex-1 flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

          {/* ── Left: Brand + Order Summary ── */}
          <div className="w-full md:w-[42%] flex flex-col gap-10 md:sticky md:top-28">

            {/* Section header */}
            <div className="flex flex-col gap-3">
              <span className="hud-label">secure checkout</span>
              <h2
                className="font-black font-sans leading-[0.88] lowercase"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.05em",
                  color: "var(--foreground)",
                }}
              >
                complete
                <br />
                <span style={{ opacity: 0.3 }}>your order.</span>
              </h2>
            </div>

            {/* Order card — same style as ShopCTA card */}
            <div
              className="w-full rounded-[2rem] p-5 md:p-6 flex flex-col gap-5 max-w-[420px]"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(150, 150, 150, 0.1)",
                boxShadow: "0 24px 60px -12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Product header */}
              <div
                className="flex justify-between items-center border-b pb-4"
                style={{ borderColor: "rgba(150, 150, 150, 0.1)" }}
              >
                <h3 className="font-sans font-black text-2xl tracking-tighter lowercase leading-none">
                  grvty.
                </h3>
                <span className="font-sans font-black text-2xl tracking-tighter">160€</span>
              </div>

              {/* Line items */}
              <div className="flex flex-col gap-3 py-1">
                {[
                  { label: "1 x grvty", value: "160€" },
                  { label: "1 x Smart RGB Bulb", value: "Incl." },
                  { label: "1 x E27 Socket", value: "Incl." },
                  { label: "1 x EU/US Plug with Switch", value: "Incl." },
                  { label: "1 x Textile Power Cable (2m)", value: "Incl." },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-end border-b pb-2 border-white/[0.03]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[8px] opacity-20">0{idx + 1}</span>
                      <span className="font-sans text-[11px] font-bold opacity-60 lowercase">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-sans text-[12px] font-black tracking-tight lowercase">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans font-black text-[9px] uppercase tracking-[0.2em] opacity-30">
                    Total Price
                  </span>
                  <div className="flex flex-col items-end leading-none">
                    <span className="font-sans text-2xl font-black tracking-tighter">160€</span>
                    <span className="font-sans text-[8px] font-black opacity-20 uppercase tracking-widest mt-1">
                      Excl. Shipping
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="font-sans text-[11px] font-bold opacity-45 uppercase tracking-wider">
                    Hand-finished in Italy · 14-day lead time
                  </span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2" style={{ opacity: 0.25 }}>
              {[
                {
                  icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
                  label: "SSL Secured",
                },
                {
                  icon: (
                    <>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </>
                  ),
                  label: "Stripe Encrypted",
                },
                {
                  icon: (
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.32a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  ),
                  label: "24 / 7 Support",
                },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 font-sans text-[9px] font-bold uppercase tracking-widest"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                  {label}
                </span>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {[
                { label: "Privacy Policy", href: "/legal/privacy" },
                { label: "Terms & Conditions", href: "/legal/terms" },
                { label: "Returns", href: "/legal/returns" },
                { label: "Shipping", href: "/legal/shipping" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-[11.5px] font-black opacity-75 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Stripe Payment Form ── */}
          <div
            className="w-full md:flex-1 rounded-[2rem] p-6 md:p-8 flex flex-col gap-6"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(150, 150, 150, 0.1)",
              boxShadow: "0 24px 60px -12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
              backdropFilter: "blur(20px)",
              animation: "checkoutAppear 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {/* Card header */}
            <div
              className="flex justify-between items-center border-b pb-4"
              style={{ borderColor: "rgba(150, 150, 150, 0.1)" }}
            >
              <span className="hud-label" style={{ opacity: 0.35 }}>
                payment & shipping
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] hud-pulse-dot" />
                <span className="hud-label" style={{ opacity: 0.35 }}>secure</span>
              </div>
            </div>

            {error ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(255,59,48,0.08)",
                    border: "1px solid rgba(255,59,48,0.2)",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff3b30"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="font-sans font-black text-xl lowercase mb-2">something went wrong</h3>
                <p className="font-sans text-sm mb-8" style={{ opacity: 0.4 }}>
                  {error}
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="ios-button flex items-center gap-2 px-6 py-3 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                  style={{ color: "var(--foreground)" }}
                >
                  Try Again
                </button>
              </div>
            ) : clientSecret ? (
              <Elements
                stripe={getStripe()}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#c9a84c",
                      colorBackground: "#1a1715",
                      colorText: "#f0ebe5",
                      colorDanger: "#ff3b30",
                      fontFamily: "var(--font-sora), system-ui, sans-serif",
                      spacingUnit: "5px",
                      borderRadius: "16px",
                      colorTextPlaceholder: "#6b6055",
                    },
                    rules: {
                      ".Input": {
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(150,150,150,0.1)",
                        boxShadow: "none",
                        fontSize: "13px",
                        padding: "12px 16px",
                        transition: "border-color 0.3s ease",
                      },
                      ".Input:focus": {
                        border: "1px solid #c9a84c",
                        boxShadow: "0 0 0 3px rgba(201, 168, 76, 0.15)",
                      },
                      ".Input:hover": {
                        border: "1px solid rgba(150,150,150,0.2)",
                      },
                      ".Label": {
                        fontFamily: "var(--font-space), monospace",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        fontWeight: "500",
                        letterSpacing: "0.35em",
                        color: "#f0ebe5",
                        opacity: "0.22",
                        marginBottom: "10px",
                      },
                      ".Tab": {
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(150,150,150,0.1)",
                        boxShadow: "none",
                        color: "#f0ebe5",
                        fontWeight: "700",
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                      },
                      ".Tab--selected": {
                        backgroundColor: "rgba(201, 168, 76, 0.1)",
                        border: "1px solid rgba(201, 168, 76, 0.3)",
                        color: "#c9a84c",
                        boxShadow: "0 4px 12px rgba(201, 168, 76, 0.15)",
                      },
                      ".Tab:hover": {
                        color: "#c9a84c",
                        border: "1px solid rgba(201, 168, 76, 0.2)",
                      },
                      ".Error": {
                        fontSize: "11px",
                        fontWeight: "700",
                      },
                    },
                  },
                }}
              >
                <CheckoutForm />
              </Elements>
            ) : (
              <div className="flex items-center justify-center py-20 gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] hud-pulse-dot" />
                <span className="hud-label">loading checkout</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 pt-6" style={{ borderTop: "1px solid rgba(150,150,150,0.06)" }}>
          <span
            className="font-sans text-[9px] tracking-[0.2em] font-medium uppercase"
            style={{ color: "var(--foreground)", opacity: 0.3 }}
          >
            @grvty 2026 · objects with gravity · all rights reserved
          </span>
        </div>
      </div>
    </main>
  );
}
