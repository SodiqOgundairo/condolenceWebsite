import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="bg-surface" data-aos="fade-in">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
          In Loving Memory of a Dear Father
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          We gather here to celebrate a life well-lived and to share the memories that will forever be in our hearts. Your words of comfort and shared stories are a precious gift to our family during this time of loss.
        </p>
      </div>
    </header>
  );
};

export default Hero;
