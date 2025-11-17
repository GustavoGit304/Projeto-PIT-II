import React, { useState, useRef, useEffect } from 'react';

type Language = 'pt' | 'en';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAboutClick: () => void;
  onLogoClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onAboutClick, onLogoClick, language, onLanguageChange, t }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-900/80 backdrop-blur-lg shadow-md sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button onClick={onLogoClick} className="text-2xl font-bold text-purple-500 flex-shrink-0">
              🧁 Cupcake Shop
            </button>
            <div className="hidden md:flex items-baseline space-x-4">
               <button
                  onClick={onAboutClick}
                  className="text-gray-300 hover:bg-gray-700/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('header.about')}
                </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                aria-haspopup="true"
                aria-expanded={isLangMenuOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13l4-4M19 9l-4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2 text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              {isLangMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
                  <div className="py-1" role="none">
                    <button
                      onClick={() => { onLanguageChange('pt'); setIsLangMenuOpen(false); }}
                      className={`w-full text-left ${language === 'pt' ? 'bg-purple-600 text-white' : 'text-gray-300'} block px-4 py-2 text-sm hover:bg-gray-700`}
                      role="menuitem"
                    >
                      Português (PT)
                    </button>
                    <button
                      onClick={() => { onLanguageChange('en'); setIsLangMenuOpen(false); }}
                      className={`w-full text-left ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-300'} block px-4 py-2 text-sm hover:bg-gray-700`}
                      role="menuitem"
                    >
                      English (EN)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              aria-label={t('header.cartAriaLabel')}
              className="relative p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-2 ring-gray-900">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;