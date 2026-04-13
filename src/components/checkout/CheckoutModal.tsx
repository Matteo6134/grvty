"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Defer Stripe init until the modal actually opens to keep first paint fast.
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 md:py-12"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        style={{ animation: "checkoutFade 0.4s ease both" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-[560px] max-h-full overflow-hidden rounded-[2rem] bg-[var(--surface)] flex flex-col"
        style={{
          border: "1px solid rgba(150,150,150,0.12)",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          animation: "checkoutRise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: "rgba(150,150,150,0.08)" }}
        >
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[8px] font-black uppercase tracking-[0.3em] opacity-30">
              Secure Checkout
            </span>
            <h3 className="font-sans font-black text-xl tracking-tighter lowercase leading-none">
              grvty.
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="w-9 h-9 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
            style={{ border: "1px solid rgba(150,150,150,0.15)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Stripe embedded checkout */}
        <div className="flex-1 overflow-y-auto bg-white">
          {error ? (
            <div className="p-8 text-center">
              <p className="font-sans text-sm text-red-600 mb-4">{error}</p>
              <button
                type="button"
                onClick={() => setMounted(false)}
                className="text-xs font-bold uppercase tracking-widest underline opacity-60 hover:opacity-100"
              >
                Retry
              </button>
            </div>
          ) : mounted ? (
            <EmbeddedCheckoutProvider
              stripe={getStripe()}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : null}
        </div>

        {/* Trust footer */}
        <div
          className="px-6 py-3 border-t shrink-0 flex items-center justify-center gap-2 bg-[var(--surface)]"
          style={{ borderColor: "rgba(150,150,150,0.08)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-sans text-[9px] font-black uppercase tracking-[0.25em] opacity-30">
            Powered by Stripe · 256-bit encryption
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes checkoutFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes checkoutRise {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
