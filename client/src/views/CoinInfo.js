import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PriceDisplay from '../components/PriceDisplay';
import InvestmentAdvice from '../components/InvestmentAdvice';
import CoinChart from '../components/CoinChart';

const CoinInfo = ({cryptos}) => {
  const { coin } = useParams();
  const [coinPrice, setCoinPrice] = useState();
  const [initialPrice, setInitialPrice] = useState(
    Number(cryptos.find((singleCoin) => singleCoin.id === coin)?.priceUsd)
  );
  const [historicalData, setHistoricalData] = useState([]);
  const [currentCoin, setCurrentCoin] = useState(cryptos.find((singleCoin) => singleCoin.id === coin));
console.log (currentCoin)

useEffect(() => {
  if (!initialPrice &&!currentCoin) {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${coin.toLowerCase()}`
        );
        if (response.data) {
          setCurrentCoin(response.data.data)
          setInitialPrice(response.data.data.priceUsd);
        } else {
          alert("No data !");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }
}, []);
useEffect(() => {
  const fetchData = async () => {
    try {
        const historicalResponse = await axios.get(
          `https://api.coincap.io/v2/assets/${coin.toLowerCase()}/history?interval=d1`
        );
        if (historicalResponse.data) {
          const formattedData = historicalResponse.data.data.map(item => ({
            ...item,
            date: new Date(item.date).toLocaleDateString(),
          }));
          setHistoricalData(formattedData);
        } else {
          alert("No historical data !");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // Fetch live price
  useEffect(() => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coin.toLowerCase()}`);

    pricesWs.onmessage = function (event) {
      try {
        const data = JSON.parse(event.data);
        const price = data[coin]; 
        setCoinPrice(price);
      }
      catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      pricesWs.close();
    };
  }, [coin]);

  return (
    <div>
      <div className='coin-data'>
      <div className='vertical-coin-data'>
      <h2> {currentCoin?.name ? currentCoin.name : coin}</h2>
      <h1>$<PriceDisplay  coinPrice={coinPrice} initialPrice={initialPrice} /></h1>
      <button>Add to watchlist</button>

      </div>
      <div className='chart'>
      <CoinChart historicalData={historicalData} />
      </div>
      </div>
      <InvestmentAdvice historicalData={historicalData} />
      
    </div>
  );
};

export default CoinInfo;
