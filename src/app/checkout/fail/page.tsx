"use client";

import Link from "next/link";

export default function CheckoutFailPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full blur-[100px] opacity-10"
          style={{ background: 'radial-gradient(circle, #ff3b30 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-md">
        <div className="flex flex-col gap-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-2 border border-red-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          
          <div className="flex flex-col gap-3">
            <h1 className="font-sans font-black text-5xl tracking-tighter lowercase leading-none">
              payment failed.
            </h1>
            <p className="font-sans text-sm font-light opacity-50 leading-relaxed">
              We couldn’t process your transaction. This might be due to a timeout, an invalid card, or a bank decline. No funds were captured.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            href="/checkout"
            className="flex-1 px-8 py-4 rounded-full bg-white text-black font-sans font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="flex-1 px-8 py-4 rounded-full border border-white/10 font-sans font-black text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:bg-white/5 transition-all"
          >
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col gap-2 items-center opacity-20">
          <span className="font-sans text-[8px] font-black uppercase tracking-[0.3em]">Support</span>
          <a href="mailto:support@grvty.std" className="font-sans text-[10px] font-bold lowercase border-b border-white/40 pb-0.5">
            support@grvty.std
          </a>
        </div>
      </div>
    </main>
  );
}
