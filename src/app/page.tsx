"use client";

import React, { useEffect, useState } from 'react';
import RootLayout from '@/components/RootLayout';
import { calculateAthData } from '@/utils/athCalculations';
import { MainTag, Spinner } from '@/StyledComponents';
import Head from 'next/head';

interface AthDataType {
  athPrice?: {
    USD?: string;
  };
  price?: {
    USD?: string;
  };
}

const Page = () => {
  const [athData, setAthData] = useState<AthDataType | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const fetchAthData = async () => {
      try {
        const response = await fetch('https://tstapi.cryptorank.io/v0/coins/bitcoin');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAthData(data.data as AthDataType);
      } catch (error) {
        console.error('Failed to fetch ATH data:', error);
      }
    };
    if (isReady) {
      fetchAthData();
    }
  }, [isReady]);

  if (!athData) {
    return (
      <RootLayout>
        <Spinner></Spinner>
      </RootLayout>
    );
  }

  const athPriceUSD = parseFloat(athData?.athPrice?.USD ?? '0');
  const currentPriceUSD = parseFloat(athData?.price?.USD ?? '0');

  const { athPrice, fromATH, toATH } = calculateAthData(athPriceUSD, currentPriceUSD);

  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'FinancialProduct',
    name: 'Bitcoin All-Time High',
    description: 'Bitcoin All-Time High, From and To ATH data',
  };

  return (
    <MainTag data-testid='test-ath-price'>
      <Head>
        <title>Bitcoin All-Time High</title>
        <meta name="description" content="Bitcoin All-Time High, From and To ATH data" />
        <script
          type="application/ld+json"
          // TODO ???
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </Head>
      <RootLayout>
        <div style={{ textAlign: 'center' }}>
          <h1>Bitcoin All-Time High</h1>
          <p>ATH: ${athPrice}</p>
          <p data-testid='from-ath'>From: {fromATH}%</p>
          <p data-testid='to-ath'>To: {toATH}%</p>
        </div>
      </RootLayout>
    </MainTag>
  );
};

export default Page;
