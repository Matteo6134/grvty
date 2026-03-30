"use client";

import BlurText from "../ui/BlurText";

interface HeroTextProps {
  readonly opacity: number;
}

export function HeroText({ opacity }: HeroTextProps) {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none select-none"
    >
      {/* Vertical side label */}
      <div
        className="absolute hidden md:flex items-center"
        style={{
          left: "2.75rem",
          top: "50%",
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
        }}
      >
        <span
          className="text-[10px] tracking-[0.4em] uppercase font-medium"
          style={{ color: "var(--foreground)", opacity: 0.35 * opacity }}
        >
          Discover the shape
        </span>
      </div>

      {/* Large central text overlapping the 3D object */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
        <BlurText
          text="grvty"
          delay={150}
          animateBy="letters"
          direction="top"
          inView={opacity > 0}
          className="font-sans font-black tracking-tighter lowercase mix-blend-difference text-center relative z-20 justify-center"
          style={{
            fontSize: "clamp(7rem, 25vw, 28rem)",
            color: `rgba(178, 174, 176, ${opacity})`,
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
            transform: "translateY(-5%)",
          }}
        />
      </div>

      {/* Bottom left: subtitle + heading */}
      <div
        className="absolute flex flex-col gap-2 left-[1.5rem] md:left-[2.5rem] bottom-[6.5rem] md:bottom-[2.5rem] max-w-[200px] md:max-w-[280px]"
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-medium"
          style={{ color: "var(--foreground)", opacity: 0.4 * opacity }}
        >
          Objects with gravity
        </span>
        <h2
          className="font-sans font-black leading-[1.05] lowercase"
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            color: "var(--foreground)",
            opacity: opacity,
            letterSpacing: "-0.04em",
          }}
        >
          bring gravity<br />to your space
        </h2>
      </div>


      {/* Bottom right: description */}
      <p
        className="absolute text-[11px] leading-relaxed text-right hidden md:block"
        style={{
          bottom: "2.5rem",
          right: "2.5rem",
          maxWidth: "190px",
          color: "var(--foreground)",
          opacity: 0.4,
        }}
      >
        Warm ambient illumination or focused brightness for work. Adjust the mood.
      </p>
    </div>
  );
}
