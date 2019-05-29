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
        <p>
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
        <p>{Math.floor(props.windSpeed * 1.609)} k/h</p>
      </div>
    );
  }
}
