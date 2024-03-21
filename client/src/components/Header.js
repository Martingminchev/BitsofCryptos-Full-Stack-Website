import React, {useState } from 'react'
import NewsFeed from './NewsFeed'
import {Link} from 'react-router-dom'

const Header=(params)=>{
  const [hidden,setHidden]= useState("global-market-cap-container-visible")
  const[hide,setHide]= useState("hide ↑")

  const handleOnclick=()=>{
    if( hidden=="global-market-cap-container-visible"){
      setHidden("global-market-cap-container-hidden")
      setHide('expand ↓')
    }
    else{
      setHidden("global-market-cap-container-visible")
      setHide('hide ↑')
    }
  }
  return <header>
      <menu>
        
        <div className='menu'>
          <Link to={`/`} className='menu-logo'  >
          <div className='menu-logo'>
          <img src="/logo-bits-removebg.png" alt="image" className='logo'/>
            </div>
            </Link>
            <div className='global-market-cap-text'>
        <div className='global-market-cap'><p>The global crypto market cap is <span className='bold'> ${(+params.totalMarketCap/1000000000000).toFixed(2)}T</span></p></div>
        <div className='global-market-cap'><p>BTC Dominance: {(+params.bitcoinDominance).toFixed(2)}%</p></div>
        </div>
            <div className="toggle-container">
            
          <span className={`toggle-label ${params.mode}`}>Light</span>
        <label className="switch">
          <input type="checkbox" onChange={params.toggleMode} />
          <span className="slider round"></span>
        </label>
        <span className={`toggle-label ${params.mode === 'dark' ? 'active' : ''}`}>Dark</span>
      </div>
      
          <div className='menu-item'><Link to={`/blog`}  >
          Blog
            </Link></div>
          <div className='menu-item'><Link to={`/register`}  >
          register
            </Link></div>
          <div className='menu-item'><Link to={`/login`}  >
          login
            </Link></div>
          
        </div>
        </menu>
        
        <hr></hr>
        <h1>Today's top 100 Cryptocurrency Prices by Market Cap</h1>
        
        <div className={hidden}>
        
        <NewsFeed/>
        
        </div>
        
        <hr></hr>
        <button className='hide-expand-button' onClick={handleOnclick}>{hide}</button>
        <hr></hr>
      </header>
}

export default Header;