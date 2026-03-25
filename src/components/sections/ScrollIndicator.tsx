"use client";

interface ScrollIndicatorProps {
  readonly opacity: number;
}

export function ScrollIndicator({ opacity }: ScrollIndicatorProps) {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      style={{ opacity }}
    >
      <span className="font-mono text-xs text-foreground/40 uppercase tracking-widest">
        Scroll
      </span>
      <svg
        className="w-5 h-5 text-foreground/40 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
