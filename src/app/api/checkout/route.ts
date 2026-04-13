import { NextResponse } from "next/server";
import { getStripe, GRVTY_PRODUCT } from "@/lib/stripe";

export const runtime = "nodejs";

function getOrigin(request: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: GRVTY_PRODUCT.unitAmount,
      currency: GRVTY_PRODUCT.currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      metadata: {
        product: "grvty.lamp.v1",
        source: "shop_cta",
      },
      // Note: We'll collect shipping on the frontend with the Address Element
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
      error instanceof Error ? error.message : "Unable to create checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
