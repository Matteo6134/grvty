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

      <div className="relative z-10 w-full max-w-[1280px] min-h-[85vh] flex flex-col items-center">
        {/* Header/Back link */}
        <div className="w-full flex justify-start mb-8">
          <Link href="/" className="inline-flex flex-col gap-1.5 w-fit group">
            <span className="hud-label group-hover:opacity-50 transition-opacity">
              ← Back to home
            </span>
            <h1
              className="font-sans font-black lowercase leading-none tracking-tighter"
              style={{ fontSize: "1.5rem" }}
            >
              grvty.
            </h1>
          </Link>
        </div>

        {/* Checkout Container */}
        <div
          className="w-full max-w-[800px] rounded-[3rem] p-8 md:p-12 shadow-2xl relative"
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
                className="px-8 py-3.5 rounded-full font-sans font-black text-[10px] uppercase tracking-widest transition-all"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                Try Again
              </button>
            </div>
          ) : clientSecret ? (
            <div className="w-full">
              <Elements
                stripe={getStripe()}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#c9a84c",
                      colorBackground: "#111111",
                      colorText: "#f0ebe5",
                      colorDanger: "#ff3b30",
                      fontFamily: "var(--font-space), monospace",
                      spacingUnit: "4px",
                      borderRadius: "20px",
                      colorTextPlaceholder: "#444444",
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
                        fontSize: "10px",
                        textTransform: "uppercase",
                        fontWeight: "800",
                        letterSpacing: "0.15em",
                        marginBottom: "8px",
                        opacity: "0.4",
                      },
                    },
                  },
                }}
              >
                <CheckoutForm />
              </Elements>
            </div>
          ) : (
            <div className="flex items-center justify-center p-20">
              <div className="w-8 h-8 border-2 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
