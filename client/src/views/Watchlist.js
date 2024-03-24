import React, { useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import * as jose from "jose";

const URL = 'http://localhost:4040';

const Watchlist = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [token, setToken] = useState(() => JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const response = await axios.post(`${URL}/users/get_watchlist`, {
          email: user.email
        });
        if (response.data.ok) {
          setUserWatchlist(response.data.watchlist);
        } else {
          alert('Failed to fetch watchlist: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    if (user && user.email) {
      getWatchlist();
    }
  }, [user]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/verify_token`);
          if (response.data.ok) {
            login(token);
          } 
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verifyToken();
  }, [token]);

  const removeItem = async (item) => {
    try {
      const response = await axios.post(`${URL}/users/remove_from_watchlist`, {
        email: user.email,
        item: item
      });
      if (response.data.ok) {
        setUserWatchlist(userWatchlist.filter(i => i !== item));
        alert (`${item} has been removed from your watchlist`)
      } else {
        alert('Failed to remove item from watchlist: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error removing item from watchlist:', error);
    }
  }

  const login = (newToken) => {
    const decodedToken = jose.decodeJwt(newToken);
    const user = {
      email: decodedToken.userEmail,
    };
    localStorage.setItem("token", JSON.stringify(newToken));
    setUser(user);
  };


const renderWatchlist = () => {
  return userWatchlist.length > 0 ? (
    
    <div className="watchlist">
      {userWatchlist.map((item, idx) => (
        <div key={idx} className="watchlist-item">
          <Link to={`/CoinInfo/${item}`}>
            <h1><span className="watchlist-item-index">{idx+1}.</span> {item}</h1>
            <p>Go to {item} page.</p>
          </Link>
          <button className="remove-from-watchlist-button" onClick={() => removeItem(item)}>Remove</button>
        </div>
      ))}
    </div>
  ) : (
    <h1 className="watchlist-header">Start building your watchlist today and take the first step towards a more organized and informed browsing experience!</h1>
  );
};


  return (
    <>
      {renderWatchlist()}
    </>
  );
};

export default Watchlist;

