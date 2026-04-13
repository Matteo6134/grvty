"use client";

import { useCallback, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";
import { CheckoutForm } from "@/components/checkout/PaymentForm";
import Link from "next/link";

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async (): Promise<string> => {
    setError(null);
    const res = await fetch("/api/checkout", { method: "POST" });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      const message = body.error ?? `Checkout request failed (${res.status})`;
      setError(message);
      throw new Error(message);
    }
    const data = (await res.json()) as { clientSecret: string };
    return data.clientSecret;
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[30%] -left-[10%] w-[55%] h-[55%] rounded-full blur-[140px] opacity-[0.12]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--foreground) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1080px] flex flex-col md:flex-row gap-10 lg:gap-16 items-start">

        {/* ── Left: brand + order summary ── */}
        <div className="w-full md:w-[45%] flex flex-col gap-10 md:sticky md:top-10">

          {/* Wordmark / back link */}
          <Link href="/" className="inline-flex flex-col gap-1.5 w-fit group">
            <span className="hud-label group-hover:opacity-50 transition-opacity">
              ← Back to home
            </span>
            <h1
              className="font-sans font-black lowercase leading-none tracking-tighter"
              style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)" }}
            >
              grvty.
            </h1>
          </Link>

          {/* Section header */}
          <div className="flex flex-col gap-2">
            <div className="hud-label">secure checkout</div>
            <h2
              className="font-sans font-black lowercase tracking-tighter leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              complete your order.
            </h2>
            <p
              className="font-sans text-sm leading-relaxed max-w-sm mt-1"
              style={{ opacity: 0.4 }}
            >
              All payments are end-to-end encrypted via Stripe. Your card data never
              touches our servers.
            </p>
          </div>

          {/* Order card */}
          <div
            className="rounded-[2rem] p-6 md:p-7 flex flex-col gap-5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="flex justify-between items-center pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="hud-label">item</span>
              <span className="hud-label">price</span>
            </div>

            {/* Product row */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-sans font-bold text-base lowercase">grvty lamp v1</span>
                <span className="hud-label">smart rgb · hand-finished in italy</span>
              </div>
              <span className="font-sans font-black text-xl tracking-tighter whitespace-nowrap">160 €</span>
            </div>

            {/* Line items */}
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Smart RGB Bulb", value: "Incl." },
                { label: "E27 Socket", value: "Incl." },
                { label: "EU/US Plug + Switch", value: "Incl." },
                { label: "Textile Cable 2 m", value: "Incl." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: 8 }}
                >
                  <span
                    className="font-sans text-[11px] font-medium lowercase"
                    style={{ opacity: 0.35 }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="font-sans text-[11px] font-black tracking-tight"
                    style={{ opacity: 0.35 }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center text-[11px]" style={{ opacity: 0.3 }}>
              <span className="font-sans">Shipping</span>
              <span className="font-sans font-bold">Calculated at next step</span>
            </div>

            {/* Total */}
            <div
              className="flex justify-between items-center pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="hud-label">total</span>
              <span className="font-sans font-black text-3xl tracking-tighter">160 €</span>
            </div>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1"
            style={{ opacity: 0.25 }}
          >
            {[
              {
                icon: (
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                ),
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
              <span key={label} className="flex items-center gap-1.5 font-sans text-[9px] font-bold uppercase tracking-widest">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {icon}
                </svg>
                {label}
              </span>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 px-1">
            {[
              { label: "Privacy Policy", href: "/legal/privacy" },
              { label: "Terms & Conditions", href: "/legal/terms" },
              { label: "Returns", href: "/legal/returns" },
              { label: "Shipping", href: "/legal/shipping" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-[9px] uppercase tracking-widest transition-opacity hover:opacity-60"
                style={{ opacity: 0.2 }}
                target="_blank"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: Stripe elements checkout ── */}
        <div
          className="w-full md:flex-1 min-h-[640px] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-y-auto"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.06)",
            animation: "checkoutAppear 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="font-sans font-black text-xl lowercase mb-2">something went wrong</h3>
              <p className="font-sans text-sm mb-8" style={{ opacity: 0.4 }}>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-8 py-3.5 rounded-full font-sans font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.04] active:scale-[0.96]"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="w-full">
              {/* @ts-ignore */}
              <Elements
                stripe={getStripe()}
                options={{
                  fetchClientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#c9a84c",
                      colorBackground: "#111111",
                      colorText: "#f0ebe5",
                      colorDanger: "#ff3b30",
                      fontFamily: "var(--font-sora), sans-serif",
                      spacingUnit: "4px",
                      borderRadius: "16px",
                      colorPlaceholder: "#444444",
                    },
                    rules: {
                      ".Input": {
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "none",
                        fontSize: "13px",
                      },
                      ".Input:focus": {
                        border: "1px solid var(--accent)",
                      },
                      ".Label": {
                        fontSize: "9px",
                        textTransform: "uppercase",
                        fontWeight: "800",
                        letterSpacing: "0.15em",
                        marginBottom: "8px",
                        opacity: "0.35",
                      },
                    },
                  },
                }}
              >
                <CheckoutForm />
              </Elements>
            </div>
          )}
        </div>
      </div>

    </main>
  );
}
