import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface ReturnPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null || !currency) return "—";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function CheckoutReturnPage({ searchParams }: ReturnPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) redirect("/");

  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("Stripe session retrieval error:", err);
    redirect("/checkout/fail");
  }

  const status = session.status;
  const paymentStatus = session.payment_status;
  const email = session.customer_details?.email ?? null;
  const amount = session.amount_total;
  const currency = session.currency;

  if (status === "open") redirect("/checkout");

  if (status === "complete" && paymentStatus === "paid") {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        style={{ background: "var(--background)" }}
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[160px] opacity-[0.08]"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full blur-[120px] opacity-[0.04]"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl w-full">

          {/* Icon */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-4">
            <div className="hud-label">order confirmed</div>
            <h1
              className="font-sans font-black lowercase tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
            >
              order received.
            </h1>
            <p className="font-sans text-base leading-relaxed max-w-md mx-auto" style={{ opacity: 0.5 }}>
              Thank you{email ? `, ${email.split("@")[0]}` : ""}. Your payment of{" "}
              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>
                {formatAmount(amount, currency)}
              </span>{" "}
              was successful. We'll start hand-finishing your grvty lamp shortly.
            </p>
          </div>

          {/* Order detail card */}
          <div
            className="w-full max-w-[440px] rounded-[2rem] p-7 flex flex-col gap-5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="hud-label">estimated delivery</span>
              <span className="font-sans text-sm font-bold">14 – 21 days</span>
            </div>
            <div
              className="flex justify-between items-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}
            >
              <span className="hud-label">amount paid</span>
              <span className="font-sans font-black text-xl tracking-tighter">
                {formatAmount(amount, currency)}
              </span>
            </div>
            <div
              className="p-4 rounded-2xl flex items-center gap-3"
              style={{
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "var(--accent)", animation: "hud-pulse 3s ease-in-out infinite" }}
              />
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-left" style={{ opacity: 0.6 }}>
                Check your email for order confirmation and shipping updates.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              Back to Home
            </Link>
            <a
              href="https://instagram.com/grvty.std"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              Follow Us
            </a>
          </div>

          <div className="hud-label mt-2">grvty · made in italy · objects with gravity</div>
        </div>
      </main>
    );
  }

  redirect("/checkout/fail");
}
