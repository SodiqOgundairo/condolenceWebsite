import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-16 border-t border-border">
      <div className="container mx-auto px-4 space-y-2">
        <p className="text-sm text-text-secondary">
          Email tribute letters, or contact children directly at
          {' '}
          <a
            href="mailto:contact@tervergemade.life"
            className="text-primary hover:underline font-medium"
          >
            contact@tervergemade.life
          </a>
        </p>
        <p className="text-xs text-text-secondary">&copy; {new Date().getFullYear()} In loving memory. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
