'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="text-2xl font-bold text-white">
              Quote<span className="text-[#a47b67]">vate</span>
            </Link>
            <p className="text-gray-200 text-base">
              {language === 'fr' ? 'Description du pied de page' : 'footer.description'}
            </p>
            <div className="flex space-x-6">
              <a
                href="https://twitter.com/quotevate"
                className="text-gray-200 hover:text-[#a47b67]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/quotevate"
                className="text-gray-200 hover:text-[#a47b67]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[#a47b67] tracking-wider uppercase">
                  {language === 'fr' ? 'PRODUIT' : 'PRODUCT'}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#features" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Fonctionnalités' : 'Features'}
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Tarifs' : 'Pricing'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/integrations" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Intégrations' : 'Integrations'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Études de cas' : 'Case Studies'}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#a47b67] tracking-wider uppercase">
                  {language === 'fr' ? 'ENTREPRISE' : 'COMPANY'}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'À propos' : 'About'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Blog' : 'Blog'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Carrières' : 'Careers'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-200 hover:text-[#a47b67]">
                      {language === 'fr' ? 'Contact' : 'Contact'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-200 text-center">
            &copy; {currentYear} Quotevate, Inc. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
} 