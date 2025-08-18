import React from 'react';

const Footer: React.FC<{ onAdminClick: () => void }> = ({ onAdminClick }) => {
  return (
    <footer className="bg-white text-center py-6 mt-16">
      <div className="container mx-auto px-4">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} In loving memory. All rights reserved.</p>
        <button
          onClick={onAdminClick}
          className="text-sm text-gray-500 hover:underline mt-2 focus:outline-none"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
};

export default Footer;
