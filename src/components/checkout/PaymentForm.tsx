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
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/return`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-6">
        <h3 className="hud-label border-b border-white/5 pb-2">Shipping Information</h3>
        <AddressElement options={{ mode: "shipping" }} />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="hud-label border-b border-white/5 pb-2">Payment Details</h3>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full h-14 rounded-2xl font-sans font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
        style={{
          background: "var(--accent)",
          color: "#000000",
          boxShadow: "0 10px 30px -10px rgba(201, 168, 76, 0.4)",
        }}
      >
        <span id="button-text " className="flex items-center justify-center gap-2">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
             <>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
               </svg>
               Pay 160 €
             </>
          )}
        </span>
      </button>

      {message && (
        <div id="payment-message" className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider text-center">
          {message}
        </div>
      )}
    </form>
  );
}
