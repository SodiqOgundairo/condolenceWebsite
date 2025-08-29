import React from 'react';

type Props = {
  onOpenBiography?: () => void;
  onGoToGifts?: () => void;
  onOpenBurial?: () => void;
}

const Hero: React.FC<Props> = ({ onOpenBiography, onGoToGifts, onOpenBurial }) => {
  return (
    <header className="relative isolate overflow-hidden" data-aos="fade-in">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="container mx-auto px-6 py-16 md:py-20 relative">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-display leading-tight text-text-primary">
              In Loving Memory of Arc (Dr) Terver Gemade
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              We celebrate a life well lived and cherish the stories that continue
              to warm our hearts. Arc (Dr) Terver Gemade (1957–2025) was a distinguished
              architect and public servant whose work shaped communities across Nigeria.
            </p>
            <div className="mt-6 h-[1px] w-24 bg-border" />
            <p className="mt-4 text-text-secondary">
              Please share a memory or a message of comfort below.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={onOpenBiography}
                className="px-4 py-2 rounded-full border border-border text-text-primary bg-surface hover:bg-secondary transition"
              >
                Read Biography
              </button>
              <button
                type="button"
                onClick={onOpenBurial}
                className="px-4 py-2 rounded-full border border-border text-text-primary bg-surface hover:bg-secondary transition"
              >
                Burial Details
              </button>
              <button
                type="button"
                onClick={onGoToGifts}
                className="px-4 py-2 rounded-full bg-primary text-white hover:brightness-110 transition"
              >
                Send a Condolence Gift
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Replace /hero.jpg with your image in public/hero.jpg */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden ring-1 ring-border shadow-xl">
              <img
                src="/hero.jpg"
                alt="In loving memory"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
