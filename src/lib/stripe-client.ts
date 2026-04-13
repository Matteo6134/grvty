"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Singleton loader for stripe.js — must only be called once per page lifecycle.
 * Returns null promise (and logs) when the publishable key is missing so the
 * UI can render a graceful fallback instead of crashing.
 */
export function getStripe(): Promise<Stripe | null> {
  if (!publishableKey) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.error(
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing. Add it to .env.local."
      );
    }
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
}
