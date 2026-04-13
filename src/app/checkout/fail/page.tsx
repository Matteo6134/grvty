"use client";

import Link from "next/link";

export default function CheckoutFailPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[130px] opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #ff3b30 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-md w-full">

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,59,48,0.07)",
            border: "1px solid rgba(255,59,48,0.18)",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff3b30"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-4">
          <div className="hud-label">payment error</div>
          <h1
            className="font-sans font-black lowercase tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}
          >
            payment failed.
          </h1>
          <p className="font-sans text-sm leading-relaxed max-w-sm mx-auto" style={{ opacity: 0.4 }}>
            We couldn't process your transaction. This may be due to a timeout,
            an invalid card, or a bank decline. No funds were captured.
          </p>
        </div>

        {/* Info card */}
        <div
          className="w-full rounded-[1.5rem] p-5 flex flex-col gap-3"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
          }}
        >
          {[
            "Double-check your card number and expiry date.",
            "Make sure your billing address matches your card.",
            "Contact your bank if the issue persists.",
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-2.5">
              <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: "rgba(255,59,48,0.6)" }} />
              <span className="font-sans text-[11px] text-left leading-relaxed" style={{ opacity: 0.4 }}>
                {tip}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/checkout"
            className="flex-1 flex items-center justify-center px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-1 items-center" style={{ opacity: 0.2 }}>
          <span className="hud-label">need help?</span>
          <a
            href="https://ig.me/m/grvty.std"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] font-bold lowercase transition-opacity hover:opacity-80"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: 2 }}
          >
            @grvty.std on instagram
          </a>
        </div>
      </div>
    </main>
  );
}
