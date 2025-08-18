import React from 'react';

const Footer: React.FC<{ onAdminClick: () => void }> = ({ onAdminClick }) => {
  return (
    <footer className="text-center py-6 mt-16">
      <div className="container mx-auto px-4">
        <p className="text-muted-text">&copy; {new Date().getFullYear()} In loving memory. All rights reserved.</p>
        <button
          onClick={onAdminClick}
          className="text-sm text-muted-text hover:text-primary mt-2 focus:outline-none"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
};

export default Footer;
