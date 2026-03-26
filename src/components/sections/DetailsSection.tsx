"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

interface SpecRowProps {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly delay?: number;
}

function SpecRow({ number, title, description, delay = 0 }: SpecRowProps) {
  const { ref, visible } = useFadeIn(delay);
  return (
    <div
      ref={ref}
      className="flex gap-5 py-5 border-b transition-all duration-700 ease-out"
      style={{
        borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
      }}
    >
      <span
        className="text-[10px] font-black font-sans mt-0.5 shrink-0 w-6"
        style={{ color: "var(--foreground)", opacity: 0.25, letterSpacing: "0.15em" }}
      >
        {number}
      </span>
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-[11px] font-black font-sans uppercase"
          style={{ color: "var(--foreground)", opacity: 0.55, letterSpacing: "0.25em" }}
        >
          {title}
        </h3>
        <p
          className="text-[12px] font-light leading-relaxed"
          style={{ color: "var(--foreground)", opacity: 0.38 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function DetailsSection() {
  const headline = useFadeIn(0);
  const dataCard = useFadeIn(150);
  const statsBar = useFadeIn(200);

  const specs = [
    {
      number: "01",
      title: "Additive Precision",
      description: "Layer by layer geometric integrity. Each surface shaped with additive intent for absolute dimensional clarity.",
    },
    {
      number: "02",
      title: "Balanced Gravity",
      description: "Softened edges meet deliberate mass. A rounded pyramidal form that commands its space without demanding it.",
    },
    {
      number: "03",
      title: "Matter Honesty",
      description: "Raw texture meets refined post-processing. Substantial yet lightweight — tactile gravity in every surface.",
    },
  ];

  const technicalData = [
    { label: "Form", value: "Pyramid" },
    { label: "Colors", value: "16 Million" },
    { label: "Method", value: "FDM 3D Print" },
    { label: "Finish", value: "Sanded + Sealed" },
    { label: "Light Source", value: "RGB LED Strip" },
  ];

  const stats = [
    { label: "Lumens", value: "800" },
    { label: "Height", value: "~32cm" },
    { label: "Colors", value: "16M RGB" },
    { label: "Weight", value: "~1.2kg" },
    { label: "Shipping", value: "Worldwide" },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-20">

      {/* Top: label + headline */}
      <div
        ref={headline.ref}
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: headline.visible ? 1 : 0,
          transform: headline.visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <span
          className="text-[10px] font-black uppercase tracking-[0.45em] mb-5 block"
          style={{ color: "var(--foreground)", opacity: 0.3 }}
        >
          01 — Specifications
        </span>
        <h2
          className="font-sans font-black leading-[1.0] lowercase"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            letterSpacing: "-0.04em",
            color: "var(--foreground)",
          }}
        >
          geometry is the
          <br />
          <span style={{ opacity: 0.3 }}>language of light</span>
        </h2>
      </div>

      {/* Middle: left specs | center lamp | right data card */}
      <div className="flex items-end gap-0 w-full my-12">

        {/* Left: numbered spec rows */}
        <div className="w-[32%]">
          {specs.map((spec, i) => (
            <SpecRow
              key={spec.number}
              number={spec.number}
              title={spec.title}
              description={spec.description}
              delay={i * 120}
            />
          ))}
        </div>

        {/* Center: empty lamp space */}
        <div className="flex-1" />

        {/* Right: technical data card */}
        <div
          ref={dataCard.ref}
          className="w-[28%] flex flex-col gap-5 items-end transition-all duration-1000 ease-out"
          style={{
            opacity: dataCard.visible ? 1 : 0,
            transform: dataCard.visible ? "translateX(0)" : "translateX(20px)",
          }}
        >
          <div className="glass-info w-full rounded-[1.75rem] overflow-hidden">
            {technicalData.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-5 py-3.5 border-b last:border-b-0"
                style={{ borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)" }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.28em] font-medium"
                  style={{ color: "var(--foreground)", opacity: 0.35 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[13px] font-black font-sans"
                  style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <p
            className="text-[11px] leading-relaxed text-right pr-1"
            style={{ color: "var(--foreground)", opacity: 0.3, maxWidth: "200px" }}
          >
            Considered form is inevitability. A structure that simply belongs.
          </p>
        </div>
      </div>

      {/* Bottom: horizontal stats bar */}
      <div
        ref={statsBar.ref}
        className="mt-auto flex items-end justify-between pt-6 border-t transition-all duration-1000 ease-out"
        style={{
          borderColor: "rgba(var(--foreground-rgb,26,26,26),0.1)",
          opacity: statsBar.visible ? 1 : 0,
          transform: statsBar.visible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <span
              className="text-[9px] uppercase tracking-[0.35em] font-medium"
              style={{ color: "var(--foreground)", opacity: 0.28 }}
            >
              {stat.label}
            </span>
            <span
              className="font-black font-sans"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                color: "var(--foreground)",
                letterSpacing: "-0.03em",
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
