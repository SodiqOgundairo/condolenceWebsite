import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-16">
      <div className="container mx-auto px-4">
        <p className="text-text-secondary">&copy; {new Date().getFullYear()} In loving memory. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
