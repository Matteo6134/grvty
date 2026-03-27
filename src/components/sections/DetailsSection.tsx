"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0, threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);
  return { ref, visible };
}

const SPECS = [
  { label: "Height", value: "32", unit: "cm" },
  { label: "Base width", value: "22", unit: "cm" },
  { label: "Cord length", value: "2", unit: "m" },
  { label: "Socket", value: "E27", unit: "" },
  { label: "Voltage", value: "110–240", unit: "V" },
];

export function DetailsSection() {
  const claim = useFadeIn(80);
  const statsLeft = useFadeIn(160);
  const statsRight = useFadeIn(240);
  const linesRef = useRef<HTMLDivElement>(null);
  const [linesVisible, setLinesVisible] = useState(false);

  useEffect(() => {
    const el = linesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setLinesVisible(true), 400); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-24">

      {/* Top: claim text */}
      <div
        ref={claim.ref}
        style={{
          opacity: claim.visible ? 1 : 0,
          transform: claim.visible ? "none" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <p
          className="font-sans leading-tight lowercase"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
          }}
        >
          Form follows function.
          <br />
          <span style={{ opacity: 0.3 }}>The pyramid, re-imagined as light.</span>
        </p>
      </div>

      {/* Middle: left stats | lamp center with measurement lines | right stats */}
      <div className="flex items-center justify-between w-full">

        {/* Left: big height number */}
        <div
          ref={statsLeft.ref}
          className="w-[28%]"
          style={{
            opacity: statsLeft.visible ? 1 : 0,
            transform: statsLeft.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          {SPECS.slice(0, 2).map((s) => (
            <div key={s.label} className="mb-8">
              <div
                className="font-black font-sans leading-none lowercase"
                style={{
                  fontSize: s.label === "Height" ? "clamp(3.5rem, 6vw, 5rem)" : "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.05em",
                  color: "var(--foreground)",
                }}
              >
                {s.value}
                <span style={{ fontSize: "0.45em", opacity: 0.4 }}>{s.unit}</span>
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: "var(--foreground)", opacity: 0.28 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Center: measurement lines SVG overlay */}
        <div
          ref={linesRef}
          className="flex-1 flex items-center justify-center relative"
          style={{ height: 320 }}
        >
          <svg
            viewBox="0 0 260 320"
            width="260"
            height="320"
            fill="none"
            className="absolute"
            style={{ overflow: "visible" }}
          >
            {/* ── Height line (vertical, left of lamp) ── */}
            <line
              x1="60" y1="20" x2="60" y2="300"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              style={{
                color: "var(--foreground)",
                opacity: linesVisible ? 0.22 : 0,
                transition: "opacity 1.2s ease",
              }}
            />
            {/* Top tick */}
            <line x1="52" y1="20" x2="68" y2="20"
              stroke="currentColor" strokeWidth="0.75"
              style={{ color: "var(--foreground)", opacity: linesVisible ? 0.3 : 0, transition: "opacity 1.2s ease 0.2s" }}
            />
            {/* Bottom tick */}
            <line x1="52" y1="300" x2="68" y2="300"
              stroke="currentColor" strokeWidth="0.75"
              style={{ color: "var(--foreground)", opacity: linesVisible ? 0.3 : 0, transition: "opacity 1.2s ease 0.2s" }}
            />
            {/* Height label */}
            <text
              x="38" y="165"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              letterSpacing="0.12em"
              transform="rotate(-90, 38, 165)"
              style={{
                fill: "var(--foreground)",
                opacity: linesVisible ? 0.3 : 0,
                transition: "opacity 1.4s ease 0.4s",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase",
              }}
            >
              32cm
            </text>

            {/* ── Width line (horizontal, bottom of lamp) ── */}
            <line
              x1="80" y1="295" x2="220" y2="295"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              style={{
                color: "var(--foreground)",
                opacity: linesVisible ? 0.22 : 0,
                transition: "opacity 1.2s ease 0.3s",
              }}
            />
            {/* Left tick */}
            <line x1="80" y1="287" x2="80" y2="303"
              stroke="currentColor" strokeWidth="0.75"
              style={{ color: "var(--foreground)", opacity: linesVisible ? 0.3 : 0, transition: "opacity 1.2s ease 0.5s" }}
            />
            {/* Right tick */}
            <line x1="220" y1="287" x2="220" y2="303"
              stroke="currentColor" strokeWidth="0.75"
              style={{ color: "var(--foreground)", opacity: linesVisible ? 0.3 : 0, transition: "opacity 1.2s ease 0.5s" }}
            />
            {/* Width label */}
            <text
              x="150" y="315"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              letterSpacing="0.12em"
              style={{
                fill: "var(--foreground)",
                opacity: linesVisible ? 0.3 : 0,
                transition: "opacity 1.4s ease 0.6s",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase",
              }}
            >
              22cm
            </text>

            {/* Corner crosshair dots */}
            {linesVisible && [
              [60, 20], [60, 300], [80, 295], [220, 295],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5"
                fill="var(--foreground)"
                style={{ opacity: 0.25 }}
              />
            ))}
          </svg>
        </div>

        {/* Right: remaining specs */}
        <div
          ref={statsRight.ref}
          className="w-[24%] flex flex-col items-end gap-6"
          style={{
            opacity: statsRight.visible ? 1 : 0,
            transform: statsRight.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          {SPECS.slice(2).map((s) => (
            <div key={s.label} className="text-right">
              <div
                className="font-black font-sans leading-none"
                style={{
                  fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                }}
              >
                {s.value}
                <span style={{ fontSize: "0.42em", opacity: 0.4 }}>{s.unit}</span>
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "var(--foreground)", opacity: 0.28 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: thin border line only */}
      <div
        className="pt-5 border-t"
        style={{ borderColor: "rgba(var(--foreground-rgb,26,26,26),0.06)" }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "var(--foreground)", opacity: 0.18 }}
        >
          Specifications
        </span>
      </div>
    </div>
  );
}
