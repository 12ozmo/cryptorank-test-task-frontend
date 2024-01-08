import React, { useState, useEffect, useCallback } from 'react';
import RootLayout from '@/components/RootLayout';
import { calculateAthData } from '@/utils/athCalculations';
import Head from 'next/head';
import { MainTag, 
  RatesTable, 
  PaginationContainer, 
  Spinner, 
  StyledPageButton 
} from '@/StyledComponents';

type ApiResponse = {
  data: Array<{
    id: number;
    name: string;
    slug: string;
    category: string;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    values: {
      USD: {
        price: number;
        marketCap: number;
      };
    };
  }>;
};

type CurrencyData = {
  id: number;
  name: string;
  slug: string;
  category: string;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  values: {
    USD: {
      price: number;
      marketCap: number;
    };
  };
  athPrice?: string | null;
  fromATH?: string | null;
  toATH?: string | null;
};

type PageButtonProps = {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Rates = () => {
  const [allData, setAllData] = useState<CurrencyData[]>([]);
  const [displayData, setDisplayData] = useState<CurrencyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDataForPage = useCallback(async (page: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = allData.slice(start, end);

    const processedData = await Promise.all(currentData.map(async (currency) => {
      try {
        const athResponse = await fetch(`https://tstapi.cryptorank.io/v0/coins/${currency.slug}`);
        let athPriceUSD = null;
        if (athResponse.ok) {
          const athData = await athResponse.json();
          athPriceUSD = athData.data.athPrice.USD;
        }
        const currentPriceUSD = currency.values.USD.price;

        const athCalculation = calculateAthData(athPriceUSD, currentPriceUSD);
        return {
          ...currency,
          athPrice: athCalculation.athPrice ?? null,
          fromATH: athCalculation.fromATH ?? null,
          toATH: athCalculation.toATH ?? null
        };
      } catch (error) {
        console.error(`Error fetching ATH data for ${currency.name}:`, error);
        return { ...currency, athPrice: null, fromATH: null, toATH: null };
      }
    }));

    return processedData;
  }, [allData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.cryptorank.io/v1/currencies?api_key=${process.env.NEXT_PUBLIC_CRYPTORANK_API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result: ApiResponse = await response.json();
        setAllData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching currency data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const processData = async () => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const currentData = allData.slice(start, end);

      const processedData = await fetchDataForPage(currentPage);
      setDisplayData(processedData);
    };

    processData();
  }, [currentPage, allData, fetchDataForPage]);

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const PageButton: React.FC<PageButtonProps> = ({ isActive, children, ...props }) => {
    return <StyledPageButton isActive={isActive} {...props}>{children}</StyledPageButton>;
  };

  if (isLoading) {
    return <RootLayout><Spinner></Spinner></RootLayout>;
  }

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "FinancialProduct",
    "name": "Cryptocurrency Rates tablet",
    "description": "Live cryptocurrency rates and conversions, ATH and capitalization",
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(num);
  };

  return (
    <MainTag>
      <Head>
        <title>Cryptocurrency Rates tablet</title>
        <meta name="description" content="Live cryptocurrency rates and conversions, ATH and capitalization" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </Head>
      <RootLayout>
        <RatesTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price USD</th>
              <th>Circulating Supply</th>
              <th>Market Cap</th>
              <th>Category</th>
              <th>ATH Price</th>
              <th>From ATH (%)</th>
              <th>To ATH (%)</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((currency) => (
              <tr key={currency.id}>
                <td>{currency.name}</td>
                <td>${formatNumber(currency.values.USD.price)}</td>
                <td>{formatNumber(currency.circulatingSupply)}</td>
                <td>${formatNumber(currency.values.USD.marketCap)}</td>
                <td>{currency.category}</td>
                <td>${currency.athPrice ? formatNumber(parseFloat(currency.athPrice)) : 'N/A'}</td>
                <td>{currency.fromATH ?? 'N/A'}%</td>
                <td>{currency.toATH ?? 'N/A'}%</td>
              </tr>
            ))}
          </tbody>
        </RatesTable>
        <PaginationContainer>
          <PageButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            isActive={false}
          >
            Previous
          </PageButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            isActive={false}
          >
            Next
          </PageButton>
        </PaginationContainer>
      </RootLayout>
    </MainTag>
  );
};

export default Rates;
