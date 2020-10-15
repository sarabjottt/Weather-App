import React, { useState, useContext, useEffect } from 'react';
import { GlobalState } from './GlobalState';
import { setLS } from './Helper';

export default function Search() {
  const { setWeather } = useContext(GlobalState);

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function fetchWeather(lat, long, query) {
    const api = `/.netlify/functions/weatherGeo?lat=${lat}&long=${long}`;
    const apiSearch = `/.netlify/functions/weatherGeo?search=${query}`;
    console.log('function called...');
    setIsLoading(true);
    fetch(!query ? api : apiSearch)
      .then(res => res.json())
      .then(data => {
        console.log('Data:', data);
        setWeather(data);
        setSearchQuery(
          `${data.locationData.fullAddress}, ${data.locationData.countryCode}`
        );
        setLS('weatherData', data);
        setLS('lastCached', Date.now());
        setIsLoading(false);
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.length < 3) {
      fetchWeather(null, null, searchQuery);
    } else {
      console.log('Enter at least 3 charecters');
    }
  }

  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const long = position.coords.longitude;
          const lat = position.coords.latitude;
          console.log(position);
          setLS('locationAccess', true);
          fetchWeather(lat, long, null);
        },
        error => {
          console.log(error);
          localStorage.removeItem('locationAccess');
        }
      );
    }
  }
  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          name="place"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <input disabled={isLoading} type="submit" value="Submit" />
      </form>
      <button onClick={handleLocation}>Locate</button>
    </>
  );
}
