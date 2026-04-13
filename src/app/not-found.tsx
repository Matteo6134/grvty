import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden" style={{ background: "var(--background)" }}>
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[150px] opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg">
                <div className="flex flex-col items-center gap-2">
                    <span
                        className="font-black tracking-tighter leading-none select-none"
                        style={{
                            fontFamily: "var(--font-syne), sans-serif",
                            fontSize: "clamp(7rem, 20vw, 14rem)",
                            color: "var(--foreground)",
                            opacity: 0.06,
                        }}
                    >
                        404
                    </span>
                    <div className="-mt-8 md:-mt-14 flex flex-col items-center gap-4">
                        <div className="hud-label mb-2">navigation error</div>
                        <h1
                            className="font-sans font-black tracking-tighter lowercase leading-[0.9]"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
                        >
                            lost in space.
                        </h1>
                        <p className="font-sans text-sm leading-relaxed max-w-sm" style={{ opacity: 0.4 }}>
                            This page doesn't exist — or was moved. The lamp is still here though.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                            background: "var(--foreground)",
                            color: "var(--background)",
                        }}
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/checkout"
                        className="flex-1 flex items-center justify-center px-8 py-4 rounded-full font-sans font-black text-[10px] uppercase tracking-[0.25em] transition-all hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        Shop
                    </Link>
                </div>

                <div className="hud-label mt-4">grvty · objects with gravity</div>
            </div>
        </main>
    );
}
