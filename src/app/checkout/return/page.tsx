import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface ReturnPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null || !currency) return "—";
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function CheckoutReturnPage({ searchParams }: ReturnPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/");
  }

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

  if (status === "open") {
    redirect("/checkout");
  }

  if (status === "complete" && paymentStatus === "paid") {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        {/* Success Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[120px] opacity-10"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12 max-w-2xl">
          <div className="flex flex-col gap-6">
            <div className="w-24 h-24 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4 border border-[var(--accent)]/20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-4">
              <h1 className="font-sans font-black text-6xl tracking-tighter lowercase leading-none">
                order received.
              </h1>
              <p className="font-sans text-lg font-light opacity-60 leading-relaxed max-w-lg mx-auto">
                Thank you{email ? `, ${email}` : ""}. Your payment of <span className="text-white font-bold">{formatAmount(amount, currency)}</span> was successful. We'll start hand-finishing your grvty lamp shortly.
              </p>
            </div>
          </div>

          <div 
            className="w-full max-w-[420px] rounded-[2rem] p-8 flex flex-col gap-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-sans font-black text-[10px] uppercase tracking-[0.2em] opacity-30">
                Estimated Delivery
              </span>
              <span className="font-sans text-sm font-bold">
                14-21 Days
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-sans text-[11px] font-bold opacity-60 uppercase tracking-wider text-left">
                Check your email for order confirmation and tracking updates.
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="px-12 py-4 rounded-full bg-white text-black font-sans font-black text-[11px] uppercase tracking-[0.25em] hover:scale-105 active:scale-95 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // If not paid/complete, go to fail page
  redirect("/checkout/fail");
}
