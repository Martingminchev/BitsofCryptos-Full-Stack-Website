import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Header from './components/Header'
import Home from './views/Home.js'
import CoinInfo from './views/CoinInfo.js'
import Education from './views/Education.js'
import LogIn from './views/LogIn.js'
import Register from './views/Register.js'
import Footer from './components/Footer.js'
import { URL } from "./config.js";
import * as jose from "jose";

function App() {
  const [cryptos, setCryptos] = useState([]);
  const[totalMarketCap,setTotalMarketCap] = useState(0)
  const [bitcoinDominance, setBitcoinDominance] = useState(0);
  const[mode,setMode] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/verify_token`);
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    console.log(decodedToken);
    // composing a user object based on what data we included in our token (login controller - jwt.sign() first argument)
    let user = {
      email: decodedToken.userEmail,
    };
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
    setUser(user)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null)
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
         if(response.data.data && response.data.data.length) {
           setCryptos(response.data.data)
            }
          else {
            alert('No data !')
          }

        const { data } = response.data;

        const marketCap = data.reduce((total, crypto) => total + parseFloat(crypto.marketCapUsd), 0);
        setTotalMarketCap(marketCap);

        const bitcoinData = data.find(crypto => crypto.symbol === 'BTC');
        if (!bitcoinData) {
          throw new Error('Bitcoin data not found.');
        }

        const bitcoinMarketCap = parseFloat(bitcoinData.marketCapUsd);

        const dominance = (bitcoinMarketCap / marketCap) * 100;
        setBitcoinDominance(dominance);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);



  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App-${mode}`}>
       <Router>
      <Header totalMarketCap={totalMarketCap} bitcoinDominance={bitcoinDominance}
      mode={mode} toggleMode={toggleMode} logout={logout} user={user}   />
        <Routes>
          <Route path="/" element={<Home cryptos={cryptos} />} />
          
          <Route
            path="/CoinInfo/:coin"
            element={<CoinInfo cryptos={cryptos} />}
            />
            <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/blog" /> : <Register />}
        />
            
            <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/blog" />
            ) : (
              <LogIn login={login} />
            )
          }
        />
        <Route
          path="/blog"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <Education />
            )
          }
        />
        </Routes>
    <Footer/>
    </Router>

      
      </div>
    
  );
}


export default App

