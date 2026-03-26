"use client";

export function ShopCTA() {
  return (
    <div className="relative flex flex-col min-h-screen px-6 md:px-24 pb-24 overflow-hidden">
      
      {/* 
          STRATO 1: Watermark "grvty" 
          Z-index basso per stare davvero sotto tutto
      */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-8 z-0">
        <span className="watermark-text text-center whitespace-nowrap opacity-10">
          grvty
        </span>
      </div>

      {/* 
          STRATO 2: Titolo Massive "bring it to life" 
          Z-index: 0, ma posizionato centralmente dietro l'oggetto 3D (che ha z-10 o superiore nel canvas)
          Usiamo pointer-events-none per non disturbare lo scroll
      */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
         <h1 className="font-sans text-[15vw] md:text-[10rem] lg:text-[14rem] font-bold tracking-tighter text-foreground whitespace-nowrap lowercase italic opacity-10">
            bring it <span className="text-white font-light opacity-30">to life</span>
         </h1>
      </div>

      {/* 
          STRATO 3: Contenuto Testuale e Pulsanti
          Spostato in basso a destra, senza sovrapporsi al titolo centrale
          Z-index: 20 per stare sopra a tutto e permettere l'interazione
      */}
      <div className="relative z-20 mt-auto ml-auto mb-12 max-w-sm text-right pointer-events-auto">
          <div className="flex flex-col gap-6 mb-16">
            <p className="font-display text-base md:text-lg font-light text-foreground/70 leading-relaxed tracking-wide">
              Each piece is custom built and numbered in our studio.
            </p>
            <p className="font-display text-base md:text-lg font-light text-foreground/40 leading-relaxed tracking-wide">
              Designed for those who appreciate the weight of light.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <a
              href="https://ig.me/m/grvty"
              target="_blank"
              rel="noopener noreferrer"
              className="ios-button px-16 py-7 bg-white text-black font-sans font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-[0_40px_80px_-15px_rgba(255,255,255,0.15)] active:scale-95 w-full md:w-auto text-center"
            >
              Order via Instagram
            </a>
          </div>
      </div>
    </div>
  );
}
