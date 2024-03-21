import {Link} from 'react-router-dom'
import React from 'react';

const Home = ({cryptos}) => {

  const formatter = new Intl.NumberFormat('en-US');

  let mapCryptos=()=>(cryptos.map((ele) => (
      <Link to={`/CoinInfo/${ele.id}`} className="crypto" >
      
      <p className="crypto-rank">{ele.rank}</p>
      <p className="crypto-name">{ele.name} <span className='crypto-symbol'>{ele.symbol}</span></p>
      <p className="crypto-price">${formatter.format(ele.priceUsd)}</p>
      {ele.changePercent24Hr>0?<p className="crypto-percent-24hours-green">{(+ele.changePercent24Hr).toFixed(2)}%</p>
      :<p className="crypto-percent-24hours-red">{(+ele.changePercent24Hr).toFixed(2)}%</p>}
      <p className="crypto-supply">{formatter.format(Math.floor(ele.supply))}</p>
      <p className="crypto-market-cap">{formatter.format(Math.floor(ele.marketCapUsd))}$</p>
      </Link>
  )))

  return 	<div className="crypto-list">
    <div className="crypto">
      <p className="crypto-rank">#</p>
      <p className="crypto-name">Name:</p>
      <p className="crypto-price">Price:</p>
      <p className="crypto-percent-24hours">24h%</p>
      <p className="crypto-supply">Total market cap:</p>
      <p className="crypto-market-cap">Market Cap:</p>
    </div>
  {mapCryptos()}
  </div>
	
		
  }

  export default Home