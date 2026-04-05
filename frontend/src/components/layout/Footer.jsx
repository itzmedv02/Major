import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background py-6 text-center text-sm text-foreground/60 shadow-none">
      <div className="container mx-auto px-4">
        <p>© {year} Rainfall Prediction System. Powered by Machine Learning.</p>
        <p className="mt-1">Designed for robust agricultural planning and water management.</p>
      </div>
    </footer>
  );
};

export default Footer;
