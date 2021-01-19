import React, { useState, useContext, useEffect } from 'react';
import { GlobalState } from './GlobalState';
import { getLS, setLS } from './Helper';

export default function Search() {
  const { setWeather } = useContext(GlobalState);

  const [searchQuery, setSearchQuery] = useState(getLS('searchQuery') || '');
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
        const formatQuery = `${data.locationData.suburb ||
          data.locationData.fullAddress}, ${data.locationData.stateCode ||
          data.locationData.countryCode}`;
        setWeather(data);
        setSearchQuery(formatQuery);
        setLS('weatherData', data);
        setLS('searchQuery', formatQuery);
        setLS('lastCords', {
          lat: data.weatherData.latitude,
          long: data.weatherData.longitude,
        });
        setLS('lastCached', Date.now());
        setIsLoading(false);
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.length < 3) {
      console.log('Enter at least 3 charecters');
    } else {
      fetchWeather(null, null, searchQuery);
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
      <button onClick={handleLocation}>📍</button>
    </>
  );
}
