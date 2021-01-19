import React, { useState, useEffect } from 'react';
import { GlobalState, themes } from './GlobalState';
import Weather from './Weather';
import './AssetsImport';
import { getLS, setLS } from './Helper';

export default function App() {
  const [isFern, setIsFern] = useState(getLS('isFern') || false);
  const [weather, setWeather] = useState(getLS('weatherData') || null);
  const [theme, setTheme] = useState(themes.light);

  function fetchWeather(lat, long) {
    const api = `/.netlify/functions/weatherGeo?lat=${lat}&long=${long}`;
    const apiRegion = `/.netlify/functions/weatherGeo?region=true`;
    console.log('function called...');
    fetch(!lat ? apiRegion : api)
      .then(res => res.json())
      .then(data => {
        console.log('Data:', data);
        setWeather(data);
        setLS('weatherData', data);
        setLS('lastCached', Date.now());
      });
  }

  useEffect(() => {
    if (!getLS('weatherData')) {
      fetchWeather();
    }
    const timeSinceLastFetch = Date.now() - getLS('lastCached');
    if (timeSinceLastFetch >= 5 * 60000) {
      if (getLS('lastCords')) {
        const { lat, long } = getLS('lastCords');
        fetchWeather(lat, long);
      }
    }
  }, []);

  useEffect(() => {
    const strings = [
      'clear-night',
      'rain',
      'partly-cloudy-night',
      'thunderstrome',
    ];
    if (weather && strings.includes(weather.weatherData.currently.icon)) {
      console.log('its dark time');
      setTheme(themes.dark);
    } else {
      console.log('its light time');
      setTheme(themes.light);
    }
  }, [weather]);

  return weather ? (
    <GlobalState.Provider
      value={{ theme, weather, setWeather, isFern, setIsFern }}>
      <Weather />
    </GlobalState.Provider>
  ) : (
    <div className="loading">
      <div className="card">
        <h1>Weather Forecast</h1>
        <h2>Allow location to access.</h2>
      </div>
    </div>
  );
}
