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
  { label: "Height", value: "220", unit: "mm" },
  { label: "Base width", value: "220", unit: "mm" },
  { label: "Cord length", value: "2", unit: "m" },
  { label: "Socket", value: "E27", unit: "" },
  { label: "Voltage", value: "110–240", unit: "V" },
];

const RIGHT_SPECS = [
  { label: "Material", value: "ASA", unit: "White" },
  { label: "Manufacture", value: "3D", unit: "Printed" },
  { label: "Origin", value: "Italy", unit: "" },
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
    let timeout: NodeJS.Timeout;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Increased delay to 600ms to allow the 3D model to reach its rightward position before lines draw
          timeout = setTimeout(() => setLinesVisible(true), 600);
        } else {
          clearTimeout(timeout);
          setLinesVisible(false);
        }
      },
      { threshold: 0.6 } // Increased threshold for a later trigger
    );
    obs.observe(el);
    return () => {
      clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-24 pt-24 md:pt-40 pb-12 md:pb-24 overflow-hidden">
      
      {/* Container: Left-aligned text, Right-aligned space for the 3D model */}
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        
        {/* Left Content Column */}
        <div 
          id="details-specs"
          ref={claim.ref}
          className="flex flex-col gap-12 text-left z-20 order-2 md:order-1"
          style={{
            opacity: claim.visible ? 1 : 0,
            transform: claim.visible ? "none" : "translateY(30px)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-px bg-[var(--foreground)] opacity-10 mb-8" />
            <h2 className="font-sans font-black text-[13px] md:text-[10px] tracking-[0.4em] uppercase opacity-40">
              Product Information.
            </h2>
          </div>

          {/* Group 1: Dimensions */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-extrabold text-[15px] tracking-tight opacity-90">Dimensions</h3>
            <div className="flex flex-col gap-1 font-sans text-[13px] leading-relaxed opacity-60">
              <p>Height: 220 mm / 8.6 in</p>
              <p>Base Width: 220 mm / 8.6 in</p>
            </div>
          </div>

          {/* Group 2: Technical Details */}
          <div className="flex flex-col gap-5">
            <h3 className="font-sans font-extrabold text-[15px] tracking-tight opacity-90">Technical Details</h3>
            
            <div className="flex flex-col gap-6">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 opacity-40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" />
                    <path d="M2 10h20" />
                    <path d="M10 4V2" />
                    <path d="M14 4V2" />
                    <path d="M10 10v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2" />
                  </svg>
                </div>
                <div className="flex flex-col font-sans text-[13px] leading-[1.6] opacity-65">
                  <p className="font-bold opacity-100">E27 Socket</p>
                  <p>Voltage (input): 110–240V</p>
                  <p>Max Watt: 40W</p>
                  <p>Cord Length: 2m / 78 in</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 opacity-40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                </div>
                <div className="flex flex-col font-sans text-[13px] leading-[1.6] opacity-65">
                  <p className="font-bold opacity-100">Smart Bulb Compatible</p>
                  <p>E27 LED Bulb recommended (max 470lm)</p>
                  <p>Bulb not included.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Group 3: Materials */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-extrabold text-[15px] tracking-tight opacity-90">Materials</h3>
            <p className="font-sans text-[13px] leading-relaxed opacity-60 max-w-[340px]">
              Plant-based, 3D printed biodegradable polymer made from renewable resources like sugarcane and cornstarch.
            </p>
          </div>
        </div>

        {/* Right Column: HUD Overlay Space (occupied by the fixed 3D Scene) */}
        <div className="relative flex items-center justify-center min-h-[40vh] md:min-h-[500px] order-1 md:order-2">
          <div
            ref={linesRef}
            className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform duration-1000 ease-out"
          >
            <div 
              className="relative"
              style={{ 
                width: "clamp(240px, 60vw, 420px)",
                height: "clamp(240px, 60vw, 420px)",
              }}
            >
              {/* ── Height Glass Pill (vertical, left side) ── */}
              <div className="absolute left-[-10%] md:left-[-15%] bottom-[5%] w-[5px] md:w-[6px] h-[90%] pointer-events-none flex flex-col justify-end z-20">
                <div
                  className="w-full relative overflow-hidden rounded-full backdrop-blur-3xl"
                  style={{
                    height: linesVisible ? "100%" : "0%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: linesVisible ? "height 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s" : "height 0.5s ease 0s",
                    boxShadow: linesVisible ? "0 0 30px rgba(201, 168, 76, 0.2)" : "none",
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 w-full h-full"
                    style={{
                      background: "linear-gradient(to top, rgba(201, 168, 76, 0) 0%, rgba(201, 168, 76, 0.4) 50%, var(--accent) 100%)",
                    }}
                  />
                </div>

                {/* Anchored Height Label */}
                <div
                  className="absolute top-1/2 md:right-[100%] right-auto left-[-1.5rem] md:left-auto mr-0 md:mr-8 -translate-y-1/2 whitespace-nowrap z-30 pointer-events-auto vertical-mobile"
                  style={{
                    opacity: linesVisible ? 1 : 0,
                    transition: linesVisible ? "opacity 1s ease 1s" : "opacity 0.3s ease",
                  }}
                >
                  <div
                    className="font-black font-sans leading-none shadow-xl rounded-full bg-black/60 backdrop-blur-2xl px-1.5 py-3 md:py-2 md:px-4 border border-white/10"
                    style={{
                      fontSize: "clamp(0.9rem, 4vw, 1.8rem)",
                      letterSpacing: "-0.05em",
                      color: "var(--foreground)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex md:flex-row items-center md:items-baseline gap-0.5 md:gap-1">
                      22
                      <span style={{ fontSize: "0.45em", opacity: 0.6 }}>cm</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-[4px] -bottom-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ opacity: linesVisible ? 1 : 0, transition: "opacity 0.4s 0s" }}>
                  <div className="w-[4px] h-[4px] rounded-full bg-[var(--accent)]" />
                </div>
                <div className="absolute -left-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ bottom: linesVisible ? "100%" : "0%", opacity: linesVisible ? 1 : 0, transition: "bottom 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.4s 0.8s", transform: "translateY(50%)" }}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
                </div>
              </div>

              {/* ── Width Glass Pill (horizontal) ── */}
              <div className="absolute bottom-[-10%] md:bottom-[-15%] left-[5%] w-[90%] h-[5px] md:h-[6px] pointer-events-none flex items-center z-20">
                <div
                  className="h-full relative overflow-hidden rounded-full backdrop-blur-3xl"
                  style={{
                    width: linesVisible ? "100%" : "0%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: linesVisible ? "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s" : "width 0.5s ease 0s",
                    boxShadow: linesVisible ? "0 0 30px rgba(201, 168, 76, 0.2)" : "none",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      background: "linear-gradient(to right, rgba(201, 168, 76, 0) 0%, rgba(201, 168, 76, 0.4) 50%, var(--accent) 100%)",
                    }}
                  />
                </div>

                {/* Anchored Width Label */}
                <div
                  className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-4 md:mt-8 whitespace-nowrap z-30 pointer-events-auto"
                  style={{
                    opacity: linesVisible ? 1 : 0,
                    transition: linesVisible ? "opacity 1s ease 1.4s" : "opacity 0.3s ease",
                  }}
                >
                  <div
                    className="font-black font-sans leading-none shadow-xl rounded-full bg-black/60 backdrop-blur-2xl px-3 py-1.5 md:py-2 md:px-4 border border-white/10"
                    style={{
                      fontSize: "clamp(1rem, 4.5vw, 1.8rem)",
                      letterSpacing: "-0.05em",
                      color: "var(--foreground)",
                    }}
                  >
                    22
                    <span style={{ fontSize: "0.45em", opacity: 0.6, paddingLeft: "4px" }}>cm</span>
                  </div>
                </div>

                {/* Start/End Dots */}
                <div className="absolute -left-[4px] -bottom-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ opacity: linesVisible ? 1 : 0, transition: "opacity 0.4s 0.3s" }}>
                  <div className="w-[4px] h-[4px] rounded-full bg-[var(--accent)]" />
                </div>
                <div className="absolute -bottom-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ left: linesVisible ? "100%" : "0%", opacity: linesVisible ? 1 : 0, transition: "left 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, opacity 0.4s 1.2s", transform: "translateX(-50%)" }}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
