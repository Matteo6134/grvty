"use client";

interface HeroTextProps {
  readonly opacity: number;
}

export function HeroText({ opacity }: HeroTextProps) {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none select-none"
      style={{ opacity }}
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
          style={{ color: "var(--foreground)", opacity: 0.35 }}
        >
          Discover the light
        </span>
      </div>

      {/* Large split text flanking the 3D object */}
      <div className="absolute inset-0 flex items-center justify-between px-14 md:px-20 lg:px-28">
        <h1
          className="font-sans font-black leading-none"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            color: "var(--foreground)",
            opacity: 0.13,
            letterSpacing: "-0.04em",
          }}
        >
          raw
        </h1>
        <h1
          className="font-sans font-black leading-none text-right"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            color: "var(--foreground)",
            opacity: 0.13,
            letterSpacing: "-0.04em",
          }}
        >
          matter
        </h1>
      </div>

      {/* Bottom left: subtitle + heading */}
      <div
        className="absolute flex flex-col gap-2"
        style={{ bottom: "2.5rem", left: "2.5rem", maxWidth: "280px" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-medium"
          style={{ color: "var(--foreground)", opacity: 0.4 }}
        >
          Objects with gravity
        </span>
        <h2
          className="font-sans font-black leading-[1.05] lowercase"
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            color: "var(--foreground)",
            letterSpacing: "-0.04em",
          }}
        >
          bring grvty<br />to your space
        </h2>
      </div>

      {/* Bottom center: stat glass card */}
      <div
        className="glass-info absolute flex flex-col items-start gap-1 px-5 py-4 rounded-2xl"
        style={{
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <span
          className="font-sans font-black leading-none"
          style={{
            fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
            color: "var(--foreground)",
          }}
        >
          16M
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[10px] font-bold"
            style={{ color: "var(--foreground)", opacity: 0.35 }}
          >
            +
          </span>
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--foreground)", opacity: 0.45 }}
          >
            Colors
          </span>
        </div>
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
        Warm ambient illumination or focused brightness for work. Adjust the mood effortlessly.
      </p>
    </div>
  );
}
