import React from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
          <MessageForm />
      </div>
      <MessageList />
    </div>
  );
};

export default HomePage;
