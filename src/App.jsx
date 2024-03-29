// App.js
import React, { useState, useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import IPOCard from "./components/IPOCard";
import ExchangeRatesTable from "./components/ExchangeRateTable";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import { Spinner, Alert } from "react-bootstrap";

const App = () => {
  const [user, setUser] = useState(null);
  const [ipoData, setIpoData] = useState([]);
  const [forexRates, setForexRates] = useState([]);
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(true);
  const [loadingIPO, setLoadingIPO] = useState(false);
  const [loadingForexRates, setLoadingForexRates] = useState(false);
  const [errorIPO, setErrorIPO] = useState(null);
  const [errorForexRates, setErrorForexRates] = useState(null);

  useEffect(() => {
    // Fetch IPO and forex rate data on component mount
    fetchIPOData();
    fetchForexRates();
  }, []);

  const handleLogin = (username, password) => {
    // Implement your authentication logic here
    // For simplicity, let's assume any non-empty username/password is valid
    if (username && password) {
      const newUser = { username };
      setUser(newUser);
      // Clear login inputs
      setLoginUsername("");
      setLoginPassword("");
      // Hide login and register forms after successful login
      setShowLogin(false);
      setShowRegister(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic and reset user state
    setUser(null);
    // Show login and register forms after logout
    setShowLogin(true);
    setShowRegister(true);
  };

  const handleRegistration = (newUser) => {
    // Implement user registration logic here
    setUser(newUser);
    // Optionally, you can clear the form fields after registration
    setLoginUsername("");
    setLoginPassword("");
    // Hide login and register forms after successful registration
    setShowLogin(false);
    setShowRegister(false);
  };

  const fetchIPOData = async () => {
    try {
      setLoadingIPO(true);
      setErrorIPO(null);
      // Replace with your actual API endpoint and token
      const response = await fetch(
        "https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_783dcc2169924a7a9f17a4b0b13bca6c"
      );
      const data = await response.json();
      setIpoData(data);
    } catch (error) {
      console.error("Error fetching IPO data:", error);
      setErrorIPO("Error fetching IPO data. Please try again.");
    } finally {
      setLoadingIPO(false);
    }
  };

  const fetchForexRates = async () => {
    try {
      setLoadingForexRates(true);
      setErrorForexRates(null);
      // Replace with your actual API endpoint and token
      const response = await fetch(
        "https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_783dcc2169924a7a9f17a4b0b13bca6c"
      );
      const data = await response.json();
      setForexRates(data);
    } catch (error) {
      console.error("Error fetching forex rates:", error);
      setErrorForexRates("Error fetching forex rates. Please try again.");
    } finally {
      setLoadingForexRates(false);
    }
  };

  const handleCardClick = (ipo) => {
    setSelectedIPO(ipo);
  };

  return (
    <div className="app">
      <div id="head-tetx" className="text-center">
        IPO DASHBOARD
      </div>
      {user && (
        <Header
          setUser={setUser}
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          user={user}
        ></Header>
      )}
      <main>
        {user ? (
          <div className="dashboard">
            <div className="column"></div>
            <div className="ipo-list">
              <h2>Upcoming IPOs</h2>
              {loadingIPO && (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading IPOs...</span>
                </Spinner>
              )}
              {errorIPO && <Alert variant="danger">{errorIPO}</Alert>}
              <div className="ipo-cards-container">
                {ipoData.map((ipo) => (
                  <IPOCard
                    key={ipo.symbol}
                    ipo={ipo}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            </div>
            <div className="forex-rates">
              <ExchangeRatesTable rates={forexRates} />
            </div>
          </div>
        ) : (
          <div className="landing-page-container">
            <Login onLogin={handleLogin} />
            <div className="registration-container">
              <h2>Register</h2>
              {showRegister && <Register onRegistration={handleRegistration} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
