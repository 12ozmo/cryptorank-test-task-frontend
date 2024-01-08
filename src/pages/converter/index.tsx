import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RootLayout from '@/components/RootLayout';
import Head from 'next/head';
import {
  MainTag, 
  Spinner, 
  StyledButton, 
  StyledSelect, 
  StyledInput, 
  ConverterControls, 
  ConverterWrapper
} from '@/StyledComponents';


const ConvertedAmount = styled.div<ConvertedAmountProps>`
  color: ${props => props.$converted ? 'black' : 'red'};
`;

type ConvertedAmountProps = {
  $converted: boolean;
};

type Currency = {
  id: number;
  name: string;
  symbol: string;
  values: {
    USD: {
      price: number;
    };
  };
};

const ConverterClient = () => {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('BTC');
  const [toCurrency, setToCurrency] = useState<string>('ETH');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchCurrencies = async () => {
        try {
          const response = await fetch(`https://api.cryptorank.io/v1/currencies?api_key=${process.env.NEXT_PUBLIC_CRYPTORANK_API_KEY}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setCurrencies(data.data);
        } catch (error) {
          console.error('Failed to fetch currencies:', error);
        }
      };
      fetchCurrencies();
    }
  }, []);

  useEffect(() => {
    setConvertedAmount(0);
    setConverted(false);
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
    if (inputAmount < 0) {
      setAmount(0);
    } else {
      setAmount(inputAmount);
    }
  };

  const handleConvert = () => {
    const fromRate = currencies?.find(currency => currency.symbol === fromCurrency)?.values.USD.price || 0;
    const toRate = currencies?.find(currency => currency.symbol === toCurrency)?.values.USD.price || 0;

    if (fromRate && toRate) {
      const amountInUSD = amount * fromRate;
      setConvertedAmount(amountInUSD / toRate);
      setConverted(true);
    } else {
      setConverted(true);
    }
  };

  if (!currencies) {
    return <RootLayout><Spinner /></RootLayout>;
  }

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "FinancialProduct",
    "name": "Cryptocurrency converter",
    "description": "Cryptocurrency conversions with a variety of currencies",
  };

  return (
    <MainTag>
      <Head>
        <title>Cryptocurrency converter</title>
        <meta name="description" content="Cryptocurrency conversions with a variety of currencies" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </Head>
      <RootLayout>
        <ConverterWrapper>
          <ConverterControls>
            <StyledInput
              data-testid="test-amount-input"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <StyledSelect
              data-testid="test-select-from"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies?.map(currency => (
                <option key={currency.id} value={currency.symbol}>{currency.name}</option>
              ))}
            </StyledSelect>
            <span>to</span>
            <StyledSelect
              data-testid="test-select-to"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies?.map(currency => (
                <option key={currency.id} value={currency.symbol}>{currency.name}</option>
              ))}
            </StyledSelect>
            <StyledButton onClick={handleConvert}>Convert</StyledButton>
          </ConverterControls>
          <ConvertedAmount data-testid='test-amount' $converted={converted}>
            Converted Amount: {convertedAmount ? convertedAmount.toFixed(2) : 0} {toCurrency}
          </ConvertedAmount>
        </ConverterWrapper>
      </RootLayout>
    </MainTag>
  );
};

export default ConverterClient;
