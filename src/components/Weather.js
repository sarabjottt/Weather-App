import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toCelsius } from './Helper';

export default function Weather(props) {
  const [isCelsius, setIsCelsius] = useState(true);
  const {
    weather: { currently },
  } = props;
  return (
    <div className="section">
      <label htmlFor="checkbox" className="switch-toggle">
        <input onClick={() => setIsCelsius(!isCelsius)} type="checkbox" />
        <span className="slider">
          <span className="slider-round">
            <span className="slider-text">{isCelsius ? 'C' : 'F'}</span>
          </span>
        </span>
      </label>

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
              <span>{props.location.suburb || props.location.city}</span>
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
            <label className="switch-toggle-mobile">
              <input
                onClick={() => setIsCelsius({ isCelsius: !isCelsius })}
                type="checkbox"
              />
              <span className="slider">
                <span className="slider-round">
                  <span className="slider-text">{isCelsius ? 'C' : 'F'}</span>
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
Weather.propTypes = {
  weather: PropTypes.object.isRequired,
};
