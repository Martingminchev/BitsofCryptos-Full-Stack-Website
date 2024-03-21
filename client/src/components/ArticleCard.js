import React from 'react';

const ArticleCard = ({ title, imageUrl, newsChannel, isActive, link }) => {
  return (
    <a href={link} target='_blank' className={`article-card ${isActive ? 'active' : ''}`} >
      <div>
      <p className="article-channel">News Channel: {newsChannel}</p>
      {imageUrl ? (
          <img src={imageUrl} alt={title} className="article-image" />
        ) : null}
    
      </div>
      <h3 className="article-title">{title}</h3>
      </a>
   

  );
};

export default ArticleCard;
