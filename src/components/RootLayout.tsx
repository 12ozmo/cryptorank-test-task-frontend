"use client";

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { MainTag, NavLink, StyledNav } from '@/StyledComponents';
import Link from 'next/link';

export const ClientContext = createContext(false);

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ClientContext.Provider value={isClient}>
      <MainTag>
        <StyledNav>
          {isClient && (
            <>
              <Link href="/" passHref><NavLink>ATH</NavLink></Link>
              <Link href="/converter" passHref><NavLink>Converter</NavLink></Link>
              <Link href="/rates" passHref><NavLink>Rates</NavLink></Link>
            </>
          )}
        </StyledNav>
        {children}
      </MainTag>
    </ClientContext.Provider>
  );
}