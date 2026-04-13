import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is not configured. Add it to .env.local (use your Stripe sandbox key sk_test_...)."
  );
}

export const stripe = new Stripe(secretKey, {
  // Use the SDK's pinned API version (no override) so TypeScript types stay aligned.
  appInfo: {
    name: "grvty",
    version: "0.1.0",
  },
});

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
