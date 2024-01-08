import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ATH from '@/app/page';
import fetchMock from 'jest-fetch-mock';

describe('ATH Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('displays N/A for invalid data from API', () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            data: {
                athPrice: null,
                currentPrice: null
            }
        }));

        render(<ATH />);
        waitFor(() => {
            expect(screen.getByTestId('from-ath')).toHaveTextContent('N/A');
            expect(screen.getByTestId('to-ath')).toHaveTextContent('N/A');
        });
    });

    it('updates displayed data when new data is fetched', () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            data: {
                athPrice: 300,
                currentPrice: 250
            }
        }));
        render(<ATH />);

        waitFor(() => {
            expect(screen.getByTestId('from-ath')).toHaveTextContent('16.67');
            expect(screen.getByTestId('to-ath')).toHaveTextContent('20.00');
        });
    });
});
