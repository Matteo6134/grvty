import Link from "next/link";
import { stripe } from "@/lib/stripe";

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
    return (
      <ReturnShell title="No session" subtitle="No checkout session was provided.">
        <BackHomeLink />
      </ReturnShell>
    );
  }

  let status: string | null = null;
  let paymentStatus: string | null = null;
  let email: string | null = null;
  let amount: number | null = null;
  let currency: string | null = null;
  let errorMessage: string | null = null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    status = session.status;
    paymentStatus = session.payment_status;
    email = session.customer_details?.email ?? null;
    amount = session.amount_total;
    currency = session.currency;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Unable to verify your session.";
  }

  if (errorMessage) {
    return (
      <ReturnShell title="Verification failed" subtitle={errorMessage}>
        <BackHomeLink />
      </ReturnShell>
    );
  }

  if (status === "open") {
    return (
      <ReturnShell
        title="Checkout still open"
        subtitle="Your payment hasn't been completed yet."
      >
        <BackHomeLink label="Return to shop" />
      </ReturnShell>
    );
  }

  if (status === "complete" && paymentStatus === "paid") {
    return (
      <ReturnShell
        title="Order received."
        subtitle={`Thank you${email ? `, ${email}` : ""}. We'll start hand-finishing your grvty.`}
      >
        <div
          className="w-full max-w-[420px] rounded-[2rem] p-6 flex flex-col gap-4"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(150,150,150,0.1)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="font-sans font-black text-[9px] uppercase tracking-[0.2em] opacity-30">
              Total Paid
            </span>
            <span className="font-sans text-2xl font-black tracking-tighter">
              {formatAmount(amount, currency)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-sans text-[11px] font-bold opacity-45 uppercase tracking-wider">
              14-day lead time · Tracking sent by email
            </span>
          </div>
        </div>
        <BackHomeLink label="Back to grvty" />
      </ReturnShell>
    );
  }

  return (
    <ReturnShell
      title="Order pending"
      subtitle={`Status: ${status ?? "unknown"} · ${paymentStatus ?? "unknown"}`}
    >
      <BackHomeLink />
    </ReturnShell>
  );
}

function ReturnShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="flex flex-col items-center text-center gap-10 max-w-[560px]">
        <div className="flex flex-col gap-4">
          <h1
            className="font-black font-sans leading-[0.88] lowercase"
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              letterSpacing: "-0.05em",
            }}
          >
            {title}
          </h1>
          <p className="font-sans text-sm font-light opacity-60 max-w-md mx-auto">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}

function BackHomeLink({ label = "Back to grvty" }: { label?: string }) {
  return (
    <Link
      href="/"
      className="px-8 py-3 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.25em] transition-opacity opacity-60 hover:opacity-100"
      style={{
        border: "1px solid rgba(150,150,150,0.2)",
        color: "var(--foreground)",
      }}
    >
      {label}
    </Link>
  );
}
