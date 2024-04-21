import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PriceDisplay from '../components/PriceDisplay';
import CoinChart from '../components/CoinChart';

const CoinInfo = ({cryptos, user}) => {
  const { coin } = useParams();
  const [coinPrice, setCoinPrice] = useState();
  const [initialPrice, setInitialPrice] = useState(
    Number(cryptos.find((singleCoin) => singleCoin.id === coin)?.priceUsd)
  );
  const [historicalData, setHistoricalData] = useState([]);
  const [currentCoin, setCurrentCoin] = useState(cryptos.find((singleCoin) => singleCoin.id === coin));

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


  const addToWatchlist = async () => {
    
    try {
      const response = await axios.post('http://localhost:4040/users/add_to_watchlist', {
        email: user.email, 
        item: currentCoin?.id ? currentCoin.id : coin,
      });
      if (response.data.ok) {
        alert(response.data.message);
      } else {
        alert('Failed to add to watchlist: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };
  return (
    <div>
      <div className='coin-data'>
      <div className='vertical-coin-data'>
      <h2> {currentCoin?.name ? currentCoin.name : coin}</h2>
      <h1>$<PriceDisplay  coinPrice={coinPrice} initialPrice={initialPrice} /></h1>
      <button onClick={addToWatchlist}>Add to watchlist</button>

      </div>
      <div className='chart'>
      <CoinChart historicalData={historicalData} />
      </div>
      </div>
      {currentCoin && (
  <>
    <h1>{currentCoin.name} Price Live Data</h1>
    <p className='current-coin-info'>The current price of {currentCoin.name} is ${Number(initialPrice).toFixed(2)} with a 24-hour trading volume of ${Number(currentCoin.volumeUsd24Hr).toFixed(0)}$.
    We update our {currentCoin.symbol} to USD price in real-time. {currentCoin.name}'s price is {currentCoin.changePercent24Hr>0?'up':'down'}  {Number(currentCoin.changePercent24Hr).toFixed(0)}% in the last 24 hours.
    The current ranking for {currentCoin.name} is #{currentCoin.rank}, with a live market cap of ${Number(currentCoin.marketCapUsd).toFixed(0)} USD. 
    It has a circulating supply of {Number(currentCoin.supply).toFixed(0)} BTC coins and a max. supply of {Number(currentCoin.maxSupply).toFixed(0)==0?'unknown':Number(currentCoin.maxSupply).toFixed(0)} {currentCoin.symbol} coins.
 </p>
  </>
)}
      
    </div>
  );
};

export default CoinInfo;
