import React from 'react';
import Hero from '../components/Hero';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen py-12">
          <Hero />
          <MessageForm />
        </div>
      </div>
      <MessageList />
    </div>
  );
};

export default HomePage;
