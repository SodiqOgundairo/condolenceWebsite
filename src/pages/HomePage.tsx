import React, { useCallback, useState } from 'react';
import Hero from '../components/Hero';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Footer from '../components/Footer';
import GiftPagination from '../components/GiftPagination';
import BiographyModal from '../components/BiographyModal';
import BurialDetailsModal from '../components/BurialDetailsModal';

const HomePage: React.FC = () => {
  const [bioOpen, setBioOpen] = useState(false);
  const [burialOpen, setBurialOpen] = useState(false);

  const handleOpenBiography = useCallback(() => setBioOpen(true), []);
  const handleCloseBiography = useCallback(() => setBioOpen(false), []);
  const handleGoToGifts = useCallback(() => {
    const el = document.getElementById('gifts');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  const handleOpenBurial = useCallback(() => setBurialOpen(true), []);
  const handleCloseBurial = useCallback(() => setBurialOpen(false), []);

  return (
    <div className="bg-background min-h-screen">
      <Hero onOpenBiography={handleOpenBiography} onOpenBurial={handleOpenBurial} onGoToGifts={handleGoToGifts} />
      <div className="container mx-auto px-4">
        <MessageForm />
      </div>
      <MessageList />
      <section id="gifts" className="container mx-auto px-4">
        <GiftPagination />
      </section>
      <Footer />
      <BiographyModal open={bioOpen} onClose={handleCloseBiography} />
      <BurialDetailsModal open={burialOpen} onClose={handleCloseBurial} />
    </div>
  );
};

export default HomePage;
