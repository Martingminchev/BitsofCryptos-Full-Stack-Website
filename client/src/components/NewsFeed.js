import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard'; 

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    axios
      .get('https://newsdata.io/api/1/news?apikey=pub_400872170549c020d3e17913a06b3d43938e2&q=crypto&country=ca,gb,us&language=en')
      .then((response) => {
        setArticles(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching news articles:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]);

  return (
    <div className="news-feed">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.article_id}
          title={article.title}
          imageUrl={article.image_url}
          newsChannel={article.source_id}
          isActive={index === currentArticleIndex}
          link={article.link}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
