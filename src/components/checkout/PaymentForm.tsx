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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="hud-label">shipping information</span>
          <AddressElement options={{ mode: "shipping" }} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="hud-label">payment details</span>
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        className="w-full py-4 rounded-full font-sans font-black text-[12px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0 shadow-xl"
        style={{
          background: "var(--accent)", 
          color: "#000",
          boxShadow: "0 10px 40px -10px rgba(201, 168, 76, 0.5)"
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          "Confirm Order"
        )}
      </button>
    </form>
  );
}
