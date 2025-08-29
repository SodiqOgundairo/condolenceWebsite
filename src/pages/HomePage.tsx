import React, { useCallback, useState } from 'react';
import Hero from '../components/Hero';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Footer from '../components/Footer';
import GiftPagination from '../components/GiftPagination';
import BiographyModal from '../components/BiographyModal';

const HomePage: React.FC = () => {
  const [bioOpen, setBioOpen] = useState(false);

  const handleOpenBiography = useCallback(() => setBioOpen(true), []);
  const handleCloseBiography = useCallback(() => setBioOpen(false), []);
  const handleGoToGifts = useCallback(() => {
    const el = document.getElementById('gifts');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Hero onOpenBiography={handleOpenBiography} onGoToGifts={handleGoToGifts} />
      <div className="container mx-auto px-4">
        <MessageForm />
      </div>
      <MessageList />
      <section id="gifts" className="container mx-auto px-4">
        <GiftPagination />
      </section>
      <Footer />
      <BiographyModal open={bioOpen} onClose={handleCloseBiography} />
    </div>
  );
};

export default HomePage;
