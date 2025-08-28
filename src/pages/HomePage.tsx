import React from 'react';
import Hero from '../components/Hero';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Footer from '../components/Footer';
import GiftPagination from '../components/GiftPagination';

const HomePage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <div className="container mx-auto px-4">
        <MessageForm />
      </div>
      <MessageList />
      <GiftPagination />
      <Footer />
    </div>
    
  );
};

export default HomePage;
