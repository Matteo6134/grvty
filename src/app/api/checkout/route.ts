import { NextResponse } from "next/server";
import { getStripe, GRVTY_PRODUCT } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(): Promise<NextResponse> {
  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: GRVTY_PRODUCT.unitAmount,
      currency: GRVTY_PRODUCT.currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        product: "grvty.lamp.v1",
        source: "shop_cta",
      },
    });

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: "Stripe did not return a client_secret." },
        { status: 502 }
      );
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to create payment intent.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

