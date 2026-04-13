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
    const origin = getOrigin(request);

    const session = await getStripe().checkout.sessions.create({
      // 'embedded_page' is the current name (was 'embedded') for the iframe UI
      // used with @stripe/react-stripe-js's <EmbeddedCheckout />.
      ui_mode: "embedded_page",
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: GRVTY_PRODUCT.currency,
            unit_amount: GRVTY_PRODUCT.unitAmount,
            product_data: {
              name: GRVTY_PRODUCT.name,
              description: GRVTY_PRODUCT.description,
              images: GRVTY_PRODUCT.images,
            },
          },
        },
      ],
      shipping_address_collection: {
        // Sandbox-friendly default — adjust to your real shipping geography.
        allowed_countries: [
          "IT", "FR", "DE", "ES", "NL", "BE", "AT", "PT", "IE", "FI",
          "GR", "LU", "DK", "SE", "PL", "CZ", "HU", "RO", "SK", "SI",
          "EE", "LV", "LT", "BG", "HR", "MT", "CY",
          "GB", "CH", "NO",
          "US", "CA",
        ],
      },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      automatic_tax: { enabled: false },
      return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        product: "grvty.lamp.v1",
        source: "shop_cta",
      },
      // Move appearance to the backend session creation
      // Note: In some API versions it might be 'ui_mode': 'embedded' and appearance is handled there.
      // For ui_mode: 'embedded_page' (Embedded Checkout), we can pass custom parameters.
      // @ts-ignore - Stripe types can be laggy with newest beta/preview features
      appearance: {
        theme: 'night',
        variables: {
          colorPrimary: '#c9a84c',
          colorBackground: '#111111',
          colorText: '#f0ebe5',
          colorDanger: '#ff3b30',
          fontFamily: 'Sora, system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '12px',
        },
      },
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Stripe did not return a client_secret." },
        { status: 502 }
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to create checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
