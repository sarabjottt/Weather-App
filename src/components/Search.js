import React, { useState, useContext } from 'react';
import { GlobalState } from './GlobalState';
import { getLS, setLS, LoadingIcon, SearchIcon, LocationIcon } from './Helper';

export default function Search() {
  const { setWeather } = useContext(GlobalState);

  const [searchQuery, setSearchQuery] = useState(getLS('searchQuery') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ query: false, location: true });

  function fetchWeather(lat, long, query) {
    const api = `/.netlify/functions/weatherGeo?lat=${lat}&long=${long}`;
    const apiSearch = `/.netlify/functions/weatherGeo?search=${query}`;
    setIsLoading(true);
    fetch(!query ? api : apiSearch)
      .then(res => res.json())
      .then(data => {
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
      })
      .catch(() => {
        setIsLoading(false);
        setError({ ...error, query: true });
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.length < 3 || !/^[^-\s][\w\s,]+$/.test(searchQuery)) {
      setError({ ...error, query: true });
    } else {
      fetchWeather(null, null, searchQuery);
    }
  }
  function handleChange(e) {
    setSearchQuery(e.target.value);
    setError({ ...error, query: false });
  }
  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const long = position.coords.longitude;
          const lat = position.coords.latitude;
          console.log(position);
          setError({ ...error, location: false });
          setLS('locationAccess', true);
          fetchWeather(lat, long, null);
        },
        e => {
          console.log(e);
          setError({ ...error, location: true });
          localStorage.removeItem('locationAccess');
        }
      );
    }
  }
  return (
    <div className="search">
      <form className={error.query ? 'error' : ''} onSubmit={handleSearch}>
        <input
          autoComplete="off"
          id="search-query"
          type="search"
          name="place"
          value={searchQuery}
          onChange={handleChange}
        />
        <input
          id="search-submit"
          disabled={isLoading}
          type="submit"
          value=""
          name="search"
        />
        <label className="search-icon" htmlFor="search-submit">
          {isLoading ? <LoadingIcon /> : <SearchIcon />}
        </label>
        {error.query && <span>Please enter minimum 3 characters.</span>}
      </form>
      <button
        id={!error.location ? 'given' : 'denied'}
        className="locate-btn"
        type="button"
        onClick={handleLocation}>
        <LocationIcon />
      </button>
      {error.location && (
        <span className="location-tip">
          Allow location access from your browser.
        </span>
      )}
    </div>
  );
}
