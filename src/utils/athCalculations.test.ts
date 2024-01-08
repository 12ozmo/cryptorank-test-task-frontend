import { calculateAthData } from './athCalculations';

describe('calculateAthData', () => {
    it('calculates ATH data correctly for valid inputs', () => {
        const result = calculateAthData(200, 100);
        expect(result).toEqual({
            athPrice: '200.00',
            fromATH: '50.00',
            toATH: '100.00'
        });
    });

    it('returns N/A for null inputs', () => {
        const result = calculateAthData(null, null);
        expect(result).toEqual({
            athPrice: 'N/A',
            fromATH: 'N/A',
            toATH: 'N/A'
        });
    });

    it('returns N/A for NaN inputs', () => {
        const result = calculateAthData(NaN, NaN);
        expect(result).toEqual({
            athPrice: 'N/A',
            fromATH: 'N/A',
            toATH: 'N/A'
        });
    });

    it('handles zero current price', () => {
        const result = calculateAthData(200, 0);
        expect(result.toATH).toBe('0.00');
    });

    it('handles zero ATH price', () => {
        const result = calculateAthData(0, 100);
        expect(result.fromATH).toBe('N/A');
        expect(result.toATH).toBe('N/A');
    });

    it('calculates correctly when current price equals ATH price', () => {
        const result = calculateAthData(100, 100);
        expect(result.fromATH).toBe('0.00');
        expect(result.toATH).toBe('0.00');
    });

    it('handles negative values', () => {
        const result = calculateAthData(-200, -100);
        expect(result).toEqual({
            athPrice: 'N/A',
            fromATH: 'N/A',
            toATH: 'N/A'
        });
    });

    it('calculates with very large numbers', () => {
        const result = calculateAthData(1e12, 1e11);
        expect(result.fromATH).toBe('90.00');
        expect(result.toATH).toBe('900.00');
    });

    it('calculates with very small decimal numbers', () => {
        const result = calculateAthData(0.0002, 0.0001);
        expect(result.fromATH).toBe('50.00');
        expect(result.toATH).toBe('100.00');
    });
});
