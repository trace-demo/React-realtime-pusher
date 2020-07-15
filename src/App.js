import React from 'react';
import Today from './Today/today';
import './App.css';


class App extends React.Component {

  render() {
    return (
      <div>
        <div className="topheader">
          <header className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <span className="navbar-items">PusherCoins</span>
              </div>
              <div className="navbar-end">
                <a className="navbar-item" href="https://pusher.com" target="_blank" rel="noopener noreferrer">Pusher.com</a>
              </div>
            </nav>
          </header>
        </div>

        <section className="results--section">
          <div className="container">
            <h1>PusherCoins is a realtime price information about<br></br> BTC, LTC and ETH.</h1>
          </div>
          <div className="result--section__inner">
            <Today />
          </div>
        </section>       
      </div> 
    )
  }
}

export default App;
