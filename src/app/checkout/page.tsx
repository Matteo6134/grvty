"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";
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
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 md:p-12">
      {/* Premium background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-10"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] flex flex-col md:flex-row gap-12 items-start">
        
        {/* Left Side: Brand & Order Summary */}
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <Link href="/" className="inline-flex flex-col gap-1 w-fit group">
            <span className="font-sans text-[8px] font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-60 transition-opacity">
              Back to Home
            </span>
            <h1 className="font-sans font-black text-4xl tracking-tighter lowercase leading-none">
              grvty.
            </h1>
          </Link>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-sans font-black text-2xl tracking-tight lowercase">Secure Checkout</h2>
              <p className="font-sans text-sm opacity-40 leading-relaxed max-w-sm">
                Complete your order to receive your hand-finished grvty lamp. All payments are securely processed and encrypted.
              </p>
            </div>

            <div 
              className="rounded-3xl p-8 flex flex-col gap-6"
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)"
              }}
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="font-sans text-[10px] font-black uppercase tracking-widest opacity-30">Item</span>
                <span className="font-sans text-[10px] font-black uppercase tracking-widest opacity-30">Price</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-lg lowercase">grvty lamp v1</span>
                  <span className="font-sans text-[10px] opacity-40 uppercase tracking-tighter mt-1">Single Edition · Smart RGB</span>
                </div>
                <span className="font-sans font-black text-xl">160€</span>
              </div>

              <div className="flex flex-col gap-3 py-4">
                 <div className="flex justify-between items-center text-[12px] opacity-40">
                  <span>Shipping</span>
                  <span>Calculated next</span>
                </div>
                <div className="flex justify-between items-center text-[12px] opacity-40">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="font-sans font-black text-[10px] uppercase tracking-widest">Total</span>
                <span className="font-sans font-black text-3xl tracking-tighter">160€</span>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-30 px-2 text-[9px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                SSL Encryption
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Stripe Secure</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Section */}
        <div 
          className="w-full md:w-1/2 min-h-[600px] rounded-[2.5rem] bg-[#111111] overflow-hidden shadow-2xl relative"
          style={{ 
            border: "1px solid rgba(255,255,255,0.05)",
            animation: "checkoutAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) both" 
          }}
        >
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="font-sans font-black text-xl text-white mb-2">Something went wrong</h3>
              <p className="font-sans text-sm text-white/40 mb-8">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-8 py-3 rounded-full bg-white text-black font-sans font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="h-full">
              <EmbeddedCheckoutProvider
                stripe={getStripe()}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout className="stripe-checkout" />
              </EmbeddedCheckoutProvider>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes checkoutAppear {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .stripe-checkout {
          min-height: 600px;
        }

        /* Customize Stripe appearance if needed - note: Stripe elements are in an iframe, 
           but the container can be styled. embedded_page has some auto-styling. */
      `}</style>
    </main>
  );
}
