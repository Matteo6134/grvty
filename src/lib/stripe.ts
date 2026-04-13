import Stripe from "stripe";

let cached: Stripe | null = null;

/**
 * Lazy Stripe client. We don't instantiate (or even validate the env var) at
 * module-load time, so importing this file during `next build` won't fail
 * when the deployment environment hasn't injected STRIPE_SECRET_KEY yet.
 *
 * Throws only when actually invoked from a route handler / server component.
 */
export function getStripe(): Stripe {
  if (cached) return cached;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Add it to .env.local locally, or to Replit Secrets / Vercel env vars in deployment (use your Stripe sandbox key sk_test_...)."
    );
  }

  cached = new Stripe(secretKey, {
    appInfo: {
      name: "grvty",
      version: "0.1.0",
    },
  });

  return cached;
}

/**
 * Single product line item used across the shop.
 * Keep in sync with src/components/sections/ShopCTA.tsx visual breakdown.
 */
export const GRVTY_PRODUCT = {
  name: "grvty.",
  description:
    "Hand-finished pyramidal lamp · Smart RGB bulb · E27 socket · EU/US plug · 2m textile cable",
  // Price in the smallest currency unit (cents).
  unitAmount: 16000,
  currency: "eur",
  images: [] as string[],
} as const;
