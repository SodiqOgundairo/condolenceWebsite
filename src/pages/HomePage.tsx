import React from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import GiftPagination from '../components/GiftPagination';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
          <MessageForm />
      </div>
      <MessageList />
      <div>
        <GiftPagination />
      </div>
    </div>
    
  );
};

export default HomePage;
