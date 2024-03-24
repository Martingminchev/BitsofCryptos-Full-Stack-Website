import React from 'react';

const PriceDisplay = ({ coinPrice, initialPrice }) => {
  const formatter = new Intl.NumberFormat('en-US');

  const renderPrice = () => {
    if (initialPrice < 0.01) {
      return coinPrice ? coinPrice : initialPrice;
    } else {
      return coinPrice ? formatter.format(coinPrice) : formatter.format(initialPrice);
    }
  };

  return  renderPrice()
};

export default PriceDisplay;