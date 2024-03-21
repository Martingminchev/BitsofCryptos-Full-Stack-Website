import React from 'react';

const InvestmentAdvice = ({ historicalData }) => {
  const latestPrice = historicalData[historicalData.length - 1]?.priceUsd;
  const oldPrice = historicalData[historicalData.length - 8]?.priceUsd; 

  if (latestPrice > oldPrice) {
    return <p style={{ color: 'green' }}>Now can be a good time to invest!*</p>;
  } 
  else if (latestPrice < oldPrice) {
    return <p style={{ color: 'red' }}>Now can be a bad time to invest!*</p>;
  } 
  else {
    return <p>No clear trend</p>;
  }
};

export default InvestmentAdvice;