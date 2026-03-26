import { Watermark } from "../ui/Watermark";

export function ShopCTA() {
  return (
    <div className="relative min-h-screen px-6 py-24 md:py-0 flex items-center justify-center overflow-hidden">
      
      <Watermark text="contact us" index={3} targetId="cta" />

      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* Left Column (Lamp Space) */}
        <div className="hidden md:block h-full" />

        {/* Right Column (Contact Menu) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-12 animate-in fade-in slide-in-from-right-12 duration-1000">
          
          <div className="space-y-6">
            <h2 className="font-sans text-5xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] lowercase">
              bring it <br />
              <span className="opacity-40 italic">to life.</span>
            </h2>
            <p className="font-display text-base md:text-xl font-light text-foreground/70 max-w-md leading-relaxed tracking-wide">
              Each piece is custom built and numbered in our studio. Designed for those who appreciate the weight of light.
            </p>
          </div>

          <div className="flex flex-col space-y-8 w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-sans">inquiries</span>
                <p className="text-xl font-sans font-medium text-foreground">studio@grvty.art</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-sans">location</span>
                <p className="text-xl font-sans font-medium text-foreground">Milan, IT — Global Shipping</p>
              </div>
            </div>

            <a
              href="https://ig.me/m/grvty"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-full py-8 md:py-10 bg-white text-black font-sans font-black text-xs md:text-sm uppercase tracking-[0.3em] rounded-full transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_40px_100px_-10px_rgba(255,255,255,0.4)] active:scale-95"
            >
              Order via Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
