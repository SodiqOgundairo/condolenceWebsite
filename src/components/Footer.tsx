import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-16">
      <div className="container mx-auto px-4">
        <p className="text-text-secondary">&copy; {new Date().getFullYear()} In loving memory. All rights reserved.</p>
        <Link to="/admin" className="text-sm text-text-secondary hover:text-primary mt-2 focus:outline-none">
          Admin Login
        </Link>

      </div>
    </footer>
  );
};

export default Footer;
