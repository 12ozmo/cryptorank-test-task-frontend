import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import Rates from '@/pages/rates';
import fetchMock from 'jest-fetch-mock';

describe('Rates Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(JSON.stringify({
            data: [
                {
                  id: 1,
                  name: "Bitcoin",
                  slug: "bitcoin",
                  category: "Currency",
                  circulatingSupply: 18500000,
                  totalSupply: 21000000,
                  maxSupply: 21000000,
                  values: {
                    USD: {
                      price: 45000,
                      marketCap: 832500000000
                    }
                  }
                },
            ]
        }));
    });

    it('fetches data and displays a table on render', async () => {
        const mockApiResponse = {
            data: Array(20).fill({}).map((_, idx) => ({
                id: idx,
                name: `Currency ${idx}`,
                slug: `currency-${idx}`,
                category: 'Test Category',
                circulatingSupply: 1000 * idx,
                totalSupply: 2000 * idx,
                maxSupply: 3000 * idx,
                values: {
                    USD: {
                        price: 100 * idx,
                        marketCap: 500 * idx,
                    },
                },
            })),
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

        render(<Rates />);

        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });

    it('renders pagination buttons', async () => {
        const mockApiResponse = {
            data: Array(20).fill({}).map((_, idx) => ({
                id: idx,
                name: `Currency ${idx}`,
                slug: `currency-${idx}`,
                category: 'Test Category',
                circulatingSupply: 1000 * idx,
                totalSupply: 2000 * idx,
                maxSupply: 3000 * idx,
                values: {
                    USD: {
                        price: 100 * idx,
                        marketCap: 500 * idx,
                    },
                },
            })),
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

        render(<Rates />);

        await waitFor(() => {
            expect(screen.getByText('Next')).toBeInTheDocument();
            expect(screen.getByText('Previous')).toBeInTheDocument();
        });
    });

    it('handles pagination correctly', async () => {
        const mockApiResponse = {
            data: Array(20).fill({}).map((_, idx) => ({
                id: idx,
                name: `Currency ${idx}`,
                slug: `currency-${idx}`,
                category: 'Test Category',
                circulatingSupply: 1000 * idx,
                totalSupply: 2000 * idx,
                maxSupply: 3000 * idx,
                values: {
                    USD: {
                        price: 100 * idx,
                        marketCap: 500 * idx,
                    },
                },
            })),
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

        render(<Rates />);

        await waitFor(() => {
            fireEvent.click(screen.getByText('Next'));
            expect(screen.getByRole('table')).toBeInTheDocument();
            fireEvent.click(screen.getByText('Previous'));
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });
});
