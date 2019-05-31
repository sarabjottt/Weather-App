import React, { Component } from "react";
import { toCelsius } from "./Helper";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCelsius: true
    };
  }
  render() {
    const { props } = this.props;

    return (
      <div className='section'>
        <label className='switch-toggle'>
          <input
            onClick={() => this.setState({ isCelsius: !this.state.isCelsius })}
            type='checkbox'
          />
          <span className='slider'>
            <span className='slider-round'>
              <span className='slider-text'>
                {this.state.isCelsius ? "C" : "F"}
              </span>
            </span>
          </span>
        </label>

        <div className={"grid-container " + props.icon}>
          <div className='grid-box'>
            <div className='weather-head flex'>
              <div className={"weather-icon " + props.icon} />
              <div className='weather-text'>
                <div className='weather-text-temp bold'>
                  {this.state.isCelsius
                    ? toCelsius(props.temperature)
                    : Math.floor(props.temperature)}
                  <span className='degree-icon'>°</span>
                </div>
                <div className='weather-text-feels'>
                  Feels like
                  <span className='bold'>
                    {this.state.isCelsius
                      ? toCelsius(props.apparentTemperature)
                      : Math.floor(props.apparentTemperature)}
                    °
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='grid-box'>
            <div className='detail-head'>
              <div className='detail-head-text'>{props.summary}</div>
              <div className='detail-content flex'>
                <div className='weather-label-misc'>
                  <li>Humidity</li>
                  <li>Visibility</li>
                  <li>Wind</li>
                  <li>Rain</li>
                </div>
                <div className='weather-value-misc bold'>
                  <li>{props.humidity * 100}%</li>
                  <li>{Math.floor(props.visibility * 1.609)} km</li>
                  <li>{Math.floor(props.windSpeed * 1.609)} k/h</li>
                  <li>{Math.floor(props.precipProbability * 100)}%</li>
                </div>
              </div>
              <label className='switch-toggle-mobile'>
                <input
                  onClick={() =>
                    this.setState({ isCelsius: !this.state.isCelsius })
                  }
                  type='checkbox'
                />
                <span className='slider'>
                  <span className='slider-round'>
                    <span className='slider-text'>
                      {this.state.isCelsius ? "C" : "F"}
                    </span>
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* -----Temp----- */}
        {/* <p>
          {this.state.isCelsius
            ? toCelsius(props.temperature)
            : Math.floor(props.temperature)}
          <span>{this.state.isCelsius ? "C" : "F"}</span>
        </p>
        <p>
          Feel like
          {this.state.isCelsius
            ? toCelsius(props.apparentTemperature)
            : Math.floor(props.apparentTemperature)}
          <span>{this.state.isCelsius ? "C" : "F"}</span>
        </p>
        <p>{props.summary}</p>
        <p>{props.icon}</p>
        <p>Humidity {props.humidity * 100}%</p>
        <p>Rain {Math.floor(props.precipProbability * 100)}%</p>
        <p>{props.precipType}</p>
        <p>{Math.floor(props.visibility * 1.609)} km</p>
        <p>{Math.floor(props.windSpeed * 1.609)} k/h</p> */}
      </div>
    );
  }
}
