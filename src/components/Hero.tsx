import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-display text-text-primary mb-4" data-aos="fade-down">
        In Loving Memory
      </h1>
      <p className="text-lg text-text-secondary" data-aos="fade-up" data-aos-delay="200">
        We cherish the time we had and the memories we made. Thank you for being a part of his story. Please feel free to share a message or a memory.
      </p>
    </div>

  );
};

export default Hero;
