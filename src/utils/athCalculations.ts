import Big from 'big.js';

export const calculateAthData = (athPrice: number | null, currentPrice: number | null) => {
  if (athPrice === null || currentPrice === null || isNaN(athPrice) || isNaN(currentPrice) || athPrice <= 0 || currentPrice < 0) {
    return {
      athPrice: 'N/A',
      fromATH: 'N/A',
      toATH: 'N/A'
    };
  }

  const athPriceBig = new Big(athPrice);
  const currentPriceBig = new Big(currentPrice);

  const fromATH = athPriceBig.minus(currentPriceBig).div(athPriceBig).times(100);
  const toATH = currentPriceBig.eq(0) ? new Big(0) : athPriceBig.minus(currentPriceBig).div(currentPriceBig).times(100);

  return {
    athPrice: athPriceBig.toFixed(2),
    fromATH: fromATH.toFixed(2),
    toATH: toATH.toFixed(2)
  };
};
