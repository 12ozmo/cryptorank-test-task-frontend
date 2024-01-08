import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import Converter from "@/pages/converter";
jest.mock('node-fetch');


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            data: [
                { id: 1, name: 'Bitcoin', symbol: 'BTC', values: { USD: { price: 50000 } } },
                { id: 2, name: 'Ethereum', symbol: 'ETH', values: { USD: { price: 4000 } } }
            ]
        }),
        ok: true
    })
) as jest.Mock;


describe('Converter Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('renders without crashing and fetches data', async () => {
        render(<Converter/>);
        await waitFor(() => {
            expect(screen.getByText('Convert')).toBeInTheDocument();
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });

    it('allows only positive numbers in input', async () => {
        render(<Converter/>);
        await waitFor(() => {
            const amountInput = screen.getByTestId('test-amount-input') as HTMLInputElement;
            fireEvent.change(amountInput, {target: {value: '-100'}});
            expect(amountInput.value).not.toBe('-100');
            expect(amountInput.value).toBe('0');
        });

    });

    it('converts currency correctly', async () => {
        render(<Converter/>);

        const amountInput = screen.getByTestId('test-amount-input');
        fireEvent.change(amountInput, {target: {value: '100'}});


        await waitFor(() => {
            fireEvent.click(screen.getByText('Convert'));
            expect(screen.getByTestId('test-amount')).toHaveTextContent('1250.00'); // Assuming 100 BTC to ETH
        });
    });

    it('handles zero input by resetting the converted amount', async () => {
        render(<Converter/>);

        const amountInput = screen.getByTestId('test-amount-input');
        fireEvent.change(amountInput, {target: {value: '0'}});

        fireEvent.click(screen.getByText('Convert'));

        await waitFor(() => {
            expect(screen.getByTestId('test-amount')).toHaveTextContent('0');
        });
    });

    it('updates converted amount when currency selection changes', async () => {
        render(<Converter/>);

        const amountInput = screen.getByTestId('test-amount-input');
        fireEvent.change(amountInput, {target: {value: '100'}});


        await waitFor(() => {
            fireEvent.click(screen.getByText('Convert'));

            expect(screen.getByTestId('test-amount')).toHaveTextContent('1250.00'); // Assuming 100 BTC to ETH
        });


        await waitFor(() => {
            fireEvent.click(screen.getByText('Convert'));

            expect(screen.getByTestId('test-amount')).toHaveTextContent('25'); // New conversion result
        });
    });

    it('renders all available currencies', async () => {
        render(<Converter/>);

        await waitFor(() => {
            expect(screen.getByTestId('test-select-from')).toHaveTextContent('Bitcoin'); // New conversion result
            expect(screen.getByTestId('test-select-to')).toHaveTextContent('Ethereum'); // New conversion result
        });
    });
});
