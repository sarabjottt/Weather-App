import React, { useState, useContext } from 'react';
import { GlobalState } from './GlobalState';
import { toCelsius } from './Helper';
import Switch from './UI/Switch';
import Search from './Search';
import Chart from './UI/Chart';

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
      <Chart isCelsius={isCelsius} />
      <Switch isOn={isCelsius} handleToggle={() => setIsCelsius(!isCelsius)} />
      <div className={`grid-container ${currently.icon}`}>
        <div className="grid-box">
          <div className="weather-head flex">
            <div className={`weather-icon ${currently.icon}`} />
            <div className="weather-text">
              <div className="weather-text-temp bold">
                {isCelsius
                  ? toCelsius(currently.temperature)
                  : Math.round(currently.temperature)}
                <span className="degree-icon">°</span>
              </div>
              <div className="weather-text-feels">
                Feels like
                <span className="bold">
                  {isCelsius
                    ? toCelsius(currently.apparentTemperature)
                    : Math.round(currently.apparentTemperature)}
                  °
                </span>
              </div>
              {/* temp */}
              <span>
                {weather.locationData.suburb ||
                  weather.locationData.city ||
                  weather.locationData.fullAddress}
                ,
                <span>
                  {weather.locationData.stateCode ||
                    weather.locationData.countryCode}
                </span>
              </span>
              {/* temp */}
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
              isOn={isCelsius}
              handleToggle={() => setIsCelsius(!isCelsius)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
