import React, { useState } from 'react';

const BlogPosts = () => {
  
  const articles = [
    {
      title: 'Understanding Market Trends: Analyzing Cryptocurrency Price Movements',
      content: (
        <div>
          <p>Cryptocurrencies have captivated the financial world with their volatile price movements and potential for high returns. Understanding the factors that influence these prices is crucial for any investor looking to navigate the crypto market. Here, we dive into the key elements that drive cryptocurrency valuations and provide insights on how to interpret charts to predict future trends.</p>
          
          <h2>Factors Influencing Cryptocurrency Prices</h2>
          <ol>
            <li><strong>Market Sentiment:</strong> The overall attitude of investors towards a particular cryptocurrency can significantly impact its price. Positive news, such as technological advancements or endorsements by influential figures, can lead to increased buying pressure, while negative news can result in selling.</li>
            <li><strong>Technological Advancements:</strong> Innovations and improvements in blockchain technology can enhance the functionality and efficiency of a cryptocurrency, making it more attractive to users and investors.</li>
            <li><strong>Regulatory News:</strong> Government regulations can either legitimize a cryptocurrency by providing clarity and security to investors or cause uncertainty if the regulations are restrictive or punitive.</li>
            <li><strong>Node Count:</strong> The number of active wallets in a network can indicate the strength and decentralization of a cryptocurrency, potentially affecting its value.</li>
            <li><strong>Production Cost:</strong> The cost of mining cryptocurrencies can influence their price, as miners need to cover their expenses and make a profit.</li>
            <li><strong>Crypto Exchanges:</strong> The availability of a token on multiple exchanges increases its accessibility, potentially raising its demand and price.</li>
            <li><strong>Competition:</strong> The ever-increasing number of cryptocurrencies can affect the price of existing ones, as new tokens may offer better features or solutions.</li>
          </ol>
          
          <h2>Reading Cryptocurrency Charts</h2>
          <p>To make informed decisions, investors must be adept at reading cryptocurrency charts. Here's a brief guide:</p>
          <ul>
            <li><strong>Candlesticks:</strong> These are the most crucial elements of a crypto chart, representing the opening, closing, high, and low prices within a specific timeframe.</li>
            <li><strong>Volume:</strong> This indicates the number of coins traded during a given period and can signal the strength of a price movement.</li>
            <li><strong>Trend Lines:</strong> By drawing lines along chart highs and lows, investors can identify the direction of the market movement.</li>
            <li><strong>Patterns:</strong> Recognizing patterns like 'head and shoulders' or 'double tops and bottoms' can help predict future price actions.</li>
            <li><strong>Indicators:</strong> Tools like Moving Averages, RSI, and MACD can provide additional insights into market trends.</li>
          </ul>
          
          <p>By understanding these factors and learning to read charts, investors can better anticipate price movements and make more strategic investment decisions. Remember, while technical analysis can be a powerful tool, it's also essential to stay updated with the latest market news and trends for a comprehensive approach to cryptocurrency trading.</p>
        </div>
      ),
    },
    {
      
        title: 'Cryptocurrency Investment Strategies for Beginners',
        content: (
          <div>
            <p>Investing in cryptocurrencies can be a lucrative venture, but it also comes with its risks due to the market's volatility. This article provides a beginner-friendly guide to investing in cryptocurrencies, discussing different investment strategies, the importance of diversification, and tips for managing risk.</p>
      
            <h2>Investment Strategies</h2>
            <ol>
              <li><strong>Buy and Hold:</strong> This strategy involves buying cryptocurrency and holding onto it for a long period, regardless of market fluctuations. It's based on the belief that the price will increase significantly over time.</li>
              <li><strong>Day Trading:</strong> This involves buying and selling cryptocurrencies within a single trading day. Day traders take advantage of short-term price fluctuations.</li>
              <li><strong>Swing Trading:</strong> Swing traders hold onto their cryptocurrencies for days or weeks, aiming to profit from price swings.</li>
              <li><strong>Dollar-Cost Averaging (DCA):</strong> This strategy involves investing a fixed amount in a particular cryptocurrency at regular intervals, regardless of its price. This approach can mitigate the impact of volatility.</li>
            </ol>
      
            <h2>The Importance of Diversification</h2>
            <p>Diversification involves spreading your investments across various cryptocurrencies to reduce risk. Investing all your money in a single cryptocurrency can be risky as its price could plummet, leading to significant losses. By diversifying, you spread the risk across multiple assets, which can potentially lead to more stable returns.</p>
      
            <h2>Managing Risk in the Volatile Crypto Market</h2>
            <p>The crypto market is known for its volatility, with prices capable of making drastic moves in short periods. Here are some tips for managing risk:</p>
            <ul>
              <li><strong>Invest Only What You Can Afford to Lose:</strong> Due to the market's volatility, there's always a risk of losing your investment. It's crucial to invest only what you can afford to lose.</li>
              <li><strong>Stay Informed:</strong> Keep up-to-date with market trends and news. Understanding the market can help you make informed investment decisions.</li>
              <li><strong>Use Stop Losses:</strong> Stop losses can limit potential losses by automatically selling your cryptocurrency when its price falls to a certain level.</li>
              <li><strong>Don't Give in to Fear or Greed:</strong> Emotional decisions can lead to poor investment choices. Try to stay objective and stick to your investment plan.</li>
            </ul>
      
            <p>Investing in cryptocurrencies can be rewarding, but it's essential to have a clear strategy and be aware of the risks. Remember, it's your hard-earned money on the line, so invest wisely.</p>
          </div>
        ),
      
      
    },
  ];
  
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleClick = (index) => {
    setSelectedArticle(index === selectedArticle ? null : index);
  };
  
  return (
    <div className='blog'>
      {articles.map((article, index) => (
        <div key={index} onClick={() => handleClick(index)} className='blog-post'>
          <h1 >{article.title} </h1>
           {selectedArticle !== index?<p style={{ textAlign: 'center' }}>Click to read full article.</p>: <p style={{ textAlign: 'center' }}>Click to hide article.</p> } 
          {selectedArticle === index && article.content}
          {selectedArticle == index && <p style={{ textAlign: 'center' }}>Click to hide article.</p>}
        </div>
      ))}
      <h4 style={{ textAlign: 'center' }}>Seems like you reached the end of this feed. </h4>
      <h3 style={{ textAlign: 'center' }}>Stay tuned for future blog posts!</h3>
    </div>
  );
};

export default BlogPosts;