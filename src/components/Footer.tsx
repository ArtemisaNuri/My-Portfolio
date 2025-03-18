
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative py-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-gradient-violet mb-2">
              Artemisa's Portofolio
            </div>
            <p className="text-gray-400 text-sm">
              Creating beautiful digital experiences.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-full bg-violet-900/50 text-violet-400 hover:bg-violet-700/50 hover:text-white transition-colors mb-4"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Artemisa Nuri. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
