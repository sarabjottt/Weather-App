import React, { useState, useContext } from 'react';
import { GlobalState } from './GlobalState';
import { getLS, setLS, toCelsius } from './Helper';
import Switch from './UI/Switch';
import Search from './Search';
import Chart from './UI/Chart';

export default function Weather() {
  const {
    weather,
    isFern,
    setIsFern,
    weather: {
      weatherData: { currently },
    },
  } = useContext(GlobalState);

  return (
    <div className="section">
      <Search />
      <Chart />
      <Switch
        isOn={!isFern}
        handleToggle={() => (setIsFern(!isFern), setLS('isFern', !isFern))}
      />
      <div className={`grid-container ${currently.icon}`}>
        <div className="grid-box">
          <div className="weather-head flex">
            <div className={`weather-icon ${currently.icon}`} />
            <div className="weather-text">
              <div className="weather-text-temp bold">
                {isFern
                  ? Math.round(currently.temperature)
                  : toCelsius(currently.temperature)}
                <span className="degree-icon">°</span>
              </div>
              <div className="weather-text-feels">
                Feels like
                <span className="bold">
                  {isFern
                    ? Math.round(currently.apparentTemperature)
                    : toCelsius(currently.apparentTemperature)}
                  °
                </span>
              </div>
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
                <li>{Math.round(currently.humidity * 100)}%</li>
                <li>{Math.round(currently.visibility * 1.609)} km</li>
                <li>{Math.round(currently.windSpeed * 1.609)} k/h</li>
                <li>{Math.round(currently.precipProbability * 100)}%</li>
              </div>
            </div>
            <Switch
              isMobile
              isOn={isFern}
              handleToggle={() => setIsFern(!isFern)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
