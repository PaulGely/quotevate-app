'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'fr');
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-white/80 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Quote<span className="text-[#a47b67]">vate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-700 hover:text-[#a47b67] transition-colors text-base font-medium"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#pricing"
              className="text-gray-700 hover:text-[#a47b67] transition-colors text-base font-medium"
            >
              Tarifs
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-700 hover:text-[#a47b67] transition-colors text-base font-medium"
            >
              Témoignages
            </Link>
            <Link
              href="#faq"
              className="text-gray-700 hover:text-[#a47b67] transition-colors text-base font-medium"
            >
              FAQ
            </Link>

            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent text-gray-700 font-medium border-none focus:ring-0 cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  {user?.username}
                </span>
                {user?.username === 'Admin' && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-[#a47b67] text-white px-6 py-2 rounded-full hover:bg-[#8f6a58] transition-colors font-medium"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signin"
                  className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#a47b67] text-white px-6 py-2 rounded-full hover:bg-[#8f6a58] transition-colors font-medium"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white">
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link
                href="#pricing"
                className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifs
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </Link>
              <Link
                href="#faq"
                className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-gray-700 font-medium border-none focus:ring-0 cursor-pointer w-fit"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>

              {isAuthenticated ? (
                <div className="flex flex-col space-y-4">
                  <span className="text-gray-700 font-medium">
                    {user?.username}
                  </span>
                  {user?.username === 'Admin' && (
                    <Link
                      href="/admin"
                      className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-[#a47b67] text-white px-6 py-2 rounded-full hover:bg-[#8f6a58] transition-colors font-medium w-fit"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/signin"
                    className="text-gray-700 hover:text-[#a47b67] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#a47b67] text-white px-6 py-2 rounded-full hover:bg-[#8f6a58] transition-colors font-medium w-fit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 