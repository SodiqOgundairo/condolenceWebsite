import React from 'react';
import CondolenceGifts from './CondolenceGifts';
import InternationalGifts from './InternationalGifts';

const GiftsSection: React.FC = () => {
  return (
    <section id="gifts" className="py-16" data-aos="fade-up">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-display font-bold text-center text-text-primary mb-6">
          Condolence Gifts
        </h2>
        <p className="text-center text-text-secondary max-w-2xl mx-auto mb-10">
          If you would like to send a gift in his memory, you may use the
          options below. Thank you for your kindness and support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CondolenceGifts />
          <InternationalGifts />
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;

