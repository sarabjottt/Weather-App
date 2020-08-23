import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalState } from './GlobalState';
import { toCelsius } from './Helper';
import Switch from './UI/Switch';
import Search from './Search';

export default function Weather() {
  const [isCelsius, setIsCelsius] = useState(true);
  const {
    weather,
    weather: {
      weatherData: { currently },
    },
  } = useContext(GlobalState);

  return (
    <div className="section">
      <Search />
      <Switch isOn={isCelsius} handleToggle={() => setIsCelsius(!isCelsius)} />
      <div className={`grid-container ${currently.icon}`}>
        <div className="grid-box">
          <div className="weather-head flex">
            <div className={`weather-icon ${currently.icon}`} />
            <div className="weather-text">
              <div className="weather-text-temp bold">
                {isCelsius
                  ? toCelsius(currently.temperature)
                  : Math.floor(currently.temperature)}
                <span className="degree-icon">°</span>
              </div>
              <div className="weather-text-feels">
                Feels like
                <span className="bold">
                  {isCelsius
                    ? toCelsius(currently.apparentTemperature)
                    : Math.floor(currently.apparentTemperature)}
                  °
                </span>
              </div>
              <span>
                {weather.locationData.suburb ||
                  weather.locationData.city ||
                  weather.locationData.fullAddress}
              </span>
            </div>
          </div>
        </div>
        <div className="grid-box">
          <div className="detail-head">
            <div className="detail-head-text">{currently.summary}</div>
            <div className="detail-content flex">
              <div className="weather-label-misc">
                <li>Humidity</li>
                <li>Visibility</li>
                <li>Wind</li>
                <li>Rain</li>
              </div>
              <div className="weather-value-misc bold">
                <li>{Math.floor(currently.humidity * 100)}%</li>
                <li>{Math.floor(currently.visibility * 1.609)} km</li>
                <li>{Math.floor(currently.windSpeed * 1.609)} k/h</li>
                <li>{Math.floor(currently.precipProbability * 100)}%</li>
              </div>
            </div>
            <Switch
              isMobile
              isOn={isCelsius}
              handleToggle={() => setIsCelsius(!isCelsius)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
