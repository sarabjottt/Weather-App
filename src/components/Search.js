import React, { useState, useContext } from 'react';
import { GlobalState } from './GlobalState';
import { setLS } from './Helper';

export default function Search() {
  const { setWeather } = useContext(GlobalState);

  const [searchQuery, setSearchQuery] = useState('');

  function fetchWeather(lat, long, query) {
    const api = `/.netlify/functions/weatherGeo?lat=${lat}&long=${long}`;
    const apiSearch = `/.netlify/functions/weatherGeo?search=${query}`;
    console.log('function called...');
    fetch(!query ? api : apiSearch)
      .then(res => res.json())
      .then(data => {
        console.log('Data:', data);
        setWeather(data);
        setLS('weatherData', data);
        setLS('lastCached', Date.now());
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.length < 3) {
      console.log('Enter at least 3 charecters');
    } else {
      console.log(searchQuery);
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
          onChange={e => setSearchQuery(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleLocation}>Locate</button>
    </>
  );
}
