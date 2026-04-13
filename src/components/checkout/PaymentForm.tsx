"use client";

import { useState } from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/return`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">

      {/* Shipping section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] opacity-20">01</span>
          <span className="hud-label" style={{ opacity: 0.35 }}>shipping address</span>
        </div>
        <AddressElement options={{ mode: "shipping" }} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(150,150,150,0.06)" }} />

      {/* Payment section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] opacity-20">02</span>
          <span className="hud-label" style={{ opacity: 0.35 }}>payment method</span>
        </div>
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {/* Error message */}
      {errorMessage && (
        <div
          className="p-4 rounded-xl flex items-center gap-3"
          style={{
            background: "rgba(255,59,48,0.06)",
            border: "1px solid rgba(255,59,48,0.15)",
          }}
        >
          <svg
            width="14"
            height="14"
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
          <span className="font-sans text-[11px] font-bold text-red-400">{errorMessage}</span>
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(150,150,150,0.06)" }} />

      {/* Submit */}
      <button
        disabled={!stripe || loading}
        className="w-full py-4 rounded-full font-sans font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
        style={{
          background: "var(--accent)",
          color: "#000",
          boxShadow: "0 10px 40px -10px rgba(201, 168, 76, 0.4)",
        }}
      >
        {/* Hover glow */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2.5">
          {loading ? (
            <>
              <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Confirm Order — 160€
            </>
          )}
        </span>
      </button>

      {/* Micro-copy */}
      <p
        className="text-center font-sans text-[10px] uppercase tracking-[0.15em]"
        style={{ opacity: 0.2 }}
      >
        End-to-end encrypted via Stripe · Your card data never touches our servers
      </p>
    </form>
  );
}
