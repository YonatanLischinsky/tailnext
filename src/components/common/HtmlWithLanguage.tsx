'use client';

import { useContext } from 'react';
import { LanguageContext } from '~/context/LanguageContext';
import { Inter as CustomFont } from 'next/font/google';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export default function HtmlWithLanguage({ children }: { children: React.ReactNode }) {
  const { language } = useContext(LanguageContext);

  return (
    <html lang={language} dir={language === 'he' ? 'rtl' : 'ltr'} className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      {children}
    </html>
  );
}
